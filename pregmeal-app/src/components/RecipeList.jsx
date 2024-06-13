import React, { useState } from 'react';
import Pagination from './Pagination';
import { useNavigate } from 'react-router-dom';

function RecipeList({ recipes }) {
    const [currentPage, setCurrentPage] = useState(1);
    const recipesPerPage = 10;
    const totalPages = Math.ceil(recipes.length / recipesPerPage);

    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    let navigate = useNavigate();

    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const displayRecipe = (recipe_id) => {
        navigate(`/recipe/${recipe_id}`);
    };

    return (
        <div className="flex flex-col">
            {currentRecipes.map((recipe, index) => (
                <Recipe key={index} recipe={recipe} displayRecipe={displayRecipe} />
            ))}
            {(recipes.length > 10) && <Pagination currentPage={currentPage} totalPages={totalPages} goToPage={goToPage} />}
        </div>
    );
}

function Recipe({ recipe, displayRecipe }) {
    return (
        <div className="flex flex-col">
            <button className="rounded-sm mt-1 mb-1 bg-babypink shadow p-3 gap-2 hover:shadow-lg transition 
                               delay-150 duration-300 ease-in-out hover:scale-105 transform"
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
        </div>
    );
}

export default RecipeList;
