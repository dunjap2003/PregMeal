import UserNavbar from './UserNavbar'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import RecipeListWithSelect from './RecipeListWithSelect';

const RecipeSelect = () => {
    const [recipes, setRecipes] = useState('');

    const params = useParams();
    const { tag } = params;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tagValue = (tag === 'morningsnack' || tag === 'afternoonsnack' || tag === 'dinner') ? 'snack' : tag;
                const response = await fetch(`http://localhost:8080/select?tag=${tagValue}`);
                if (response.ok) {
                    let json = await response.json();
                    setRecipes(json);
                    console.log(json);
                } else {
                    console.error('Error:', response.statusText);
                }
            } catch (error) {
                console.error('Error:', error.message);
            }
        };
    
        fetchData();
    }, []);

    return (
        <div className="flex flex-col">
            <UserNavbar />
            {recipes && (
                    <div className="w-full">
                        <RecipeListWithSelect recipes={recipes} />
                    </div>
                )}
        </div>
    );
};

export default RecipeSelect; 