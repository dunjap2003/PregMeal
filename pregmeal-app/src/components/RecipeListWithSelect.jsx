import React, { useState, useEffect } from 'react';
import Pagination from './Pagination';
import { useNavigate, useParams } from 'react-router-dom';

function RecipeListWithSelect({ recipes }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [snackTag, setSnackTag] = useState('');
    const recipesPerPage = 10;
    const totalPages = Math.ceil(recipes.length / recipesPerPage);

    const params = useParams();
    console.log(params);
    const { tag } = params;
    const { id } = params;
    const { day } = params;

    useEffect(() => {
        if (tag === 'morningsnack' || tag === 'afternoonsnack') {
            setSnackTag('snack');
        } else {
            setSnackTag(tag);
        }
    }, [tag]);

    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    let navigate = useNavigate();

    const goToMealPlanDays = () => {
        navigate(`/mealplandays/${id}`);
    }

    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const displayRecipe = (recipe_id) => {
        navigate(`/recipe/${recipe_id}`);
    };

    const handleDone = async(e) => {
        e.preventDefault();
        console.log(selectedRecipe);
        console.log(id);
        console.log(day);
        try {
            let post = await fetch("http://localhost:8080/addRecipeToMealPlan", {
                method: "POST",
                body: JSON.stringify({
                    meal_plan_id: id,
                    recipe_id: selectedRecipe,
                    tag: tag,
                    day: day
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (post.status === 500) {
                return;
            }

            if (post.ok) {
                goToMealPlanDays();
            } else {
                let errorMessages = await post.json();
                console.log("Error response:", errorMessages);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const selectRecipe = (recipe_id) => {
        setSelectedRecipe(recipe_id);
    };

    return (
        <div className="flex flex-col">
            <h1 className="text-center text-4xl font-bold my-4 text-lightpink">Recipes tagged "{snackTag}"</h1>
            {currentRecipes.map((recipe, index) => (
                <Recipe 
                    key={index} 
                    recipe={recipe} 
                    displayRecipe={displayRecipe} 
                    isSelected={selectedRecipe === recipe.id} 
                    selectRecipe={() => selectRecipe(recipe.id)} 
                    deselectRecipe={() => setSelectedRecipe(null)}
                />
            ))}
            <Pagination currentPage={currentPage} totalPages={totalPages} goToPage={goToPage} />
            <div className="flex justify-center mt-4">
                <button
                    onClick={handleDone}
                    className="w-1/12 h-10 px-4 text-sm text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-pink hover:bg-darkpink hover:shadow-lg focus:outline-none"
                >
                    Done
                </button>
            </div>
        </div>
    );
}

function Recipe({ recipe, displayRecipe, isSelected, selectRecipe, deselectRecipe }) {
    const handleToggleSelect = () => {
        if (isSelected) {
            deselectRecipe();
        } else {
            selectRecipe();
        }
    };

    return (
        <div className="flex flex-col">
            <div className="flex items-center">
                <button className="w-11/12 rounded-sm mt-1 mb-1 bg-babypink shadow p-3 gap-2 hover:shadow-lg transition delay-150 duration-300 ease-in-out hover:scale-105 transform"
                    onClick={() => displayRecipe(recipe.id)}>
                    <div>
                        <p className="text-darkpink font-semibold"> {recipe.name} </p>
                    </div>

                    <div className="flex justify-center">
                        {recipe.tags.split(", ").map((tag, index) => (
                            <div key={index} className="bg-pink rounded-full px-2 py-1 m-1">
                                <p className="text-sm text-white font-light">{tag}</p>
                            </div>
                        ))}
                    </div>
                </button>

                <button 
                    onClick={handleToggleSelect} 
                    className={`w-1/12 h-10 px-2 mt-3 ml-1 text-sm text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none ${isSelected ? 'bg-darkpink' : 'bg-pink'} hover:shadow-lg focus:outline-none`}
                >
                    {isSelected ? 'Unselect' : 'Select'}
                </button>
            </div>
        </div>
    );
}

export default RecipeListWithSelect;
