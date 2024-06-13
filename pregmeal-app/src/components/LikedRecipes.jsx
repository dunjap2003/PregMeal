import { useEffect, useState } from "react";
import UserNavbar from "./UserNavbar";
import RecipeList from "./RecipeList";

const LikedRecipes = () => {
    const [recipes, setRecipes] = useState('');

    const currID = sessionStorage.getItem("id");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/likedrecipes?user=${currID}`);
                if (response.ok) {
                    let json = await response.json();
                    setRecipes(json);

                } else {
                    console.error('Error:', response.statusText);
                }
            } catch (error) {
                console.error('Error:', error.message);
            }
        };

        fetchData();
    }, [currID]);

    return (
        <div className="flex flex-col">
           <UserNavbar />
           {recipes && (
                    <div className="w-full">
                        <RecipeList recipes={recipes} />
                    </div>
                )}
        </div>
    );
};

export default LikedRecipes; 