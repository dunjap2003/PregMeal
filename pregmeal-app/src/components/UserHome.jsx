import UserNavbar from './UserNavbar';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import RecipeList from './RecipeList';
import ExploreMealPlans from './ExploreMealPlans';

const UserHome = () => {
    const [mealPlan, setMealPlan] = useState(null);
    const [todaysRecipes, setTodaysRecipes] = useState([]);
    const [userInfo, setUserInfo] = useState('');
    const navigate = useNavigate();

    function findTodaysRecipes(mealPlanDays, startingDate) {
        let startingDateJs = new Date(startingDate);
        let currentDate = new Date();
        let differenceInMillis = currentDate - startingDateJs;
        let differenceInDays = Math.floor(differenceInMillis / (1000 * 60 * 60 * 24));

        if (differenceInDays >= 0 && differenceInDays < mealPlanDays.length) {
            let todayMealPlan = mealPlanDays[differenceInDays];

            let todaysRecipesArray = Object.keys(todayMealPlan).filter(key => key !== 'day' && key !== 'id').map(key => todayMealPlan[key]);

            setTodaysRecipes(todaysRecipesArray);
        } else {
            setTodaysRecipes([]);
        }
    }

    const currID = sessionStorage.getItem("id");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/?user=${currID}`);
                if (response.ok) {
                    let json = await response.json();
                    setMealPlan(json);
                    console.log(json);
                    findTodaysRecipes(json.mealPlanDays, json.startingDate);
                } else {
                    console.error('Error:', response.statusText);
                }
            } catch (error) {
                console.error('Error:', error.message);
            }
        };

        fetchData();
    }, [currID]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/profile?user=${currID}`);
                if (response.ok) {
                    let json = await response.json();
                    setUserInfo(json);
                    console.log(json);
                } else {
                    console.error('Error:', response.statusText);
                }
            } catch (error) {
                console.error('Error:', error.message);
            }
        }

        fetchData();
    }, [currID]);

    const handleMealPlanClick = (id) => {
        navigate(`/mealplans/${id}`);
    };

    return (
        <div className="flex flex-col">
            <UserNavbar />
            {(!userInfo.conceptionDate || !userInfo.height || !userInfo.weight) && <p className="text-l font-bold mb-8 bg-red-400 text-red-600 pl-2 pr-2">Before following a meal, it's mandatory to fill out additional profile data to help us meet your needs better. We kindly ask you to do so.</p>}
            {!mealPlan &&
                <div className="flex flex-col">
                    <h1 className="text-4xl text-darkpink font-bold pl-4">You currently aren't following any meal plans.</h1>
                    <a href="/mealplans" className="underline text-3xl text-pink font-bold pt-6 pl-4">Pick a premade meal plan</a>
                    <a href="/create" className="underline pl-2 text-3xl text-pink font-bold pt-6 pl-4">Create your own meal plan</a>
                    <a href="/generate" className="underline text-3xl text-pink font-bold pt-6 pl-4">Have a meal plan generated for you</a>
                </div>
            }
            {mealPlan &&
                <div className="flex flex-col">
                    <h1 className="pl-4 flex text-4xl text-lightpink font-bold">
                        Your current meal plan:
                        <span
                            className="text-4xl pl-2 text-darkpink font-bold hover:underline cursor-pointer"
                            onClick={() => handleMealPlanClick(mealPlan.id)}
                        >
                            {mealPlan.name}
                        </span>
                    </h1>

                    <h1 className="pl-4 pt-2 flex flex-col text-3xl text-lightpink font-bold">On today's menu:</h1>
                    {todaysRecipes && (
                        <div className="w-full">
                            <RecipeList recipes={todaysRecipes} />
                        </div>
                    )}
                </div>
            }
            <br></br>
            <div className="flex flex-col">
                <h1 className="pl-4 pt-2 flex flex-col text-3xl text-lightpink font-bold">Your previous meal plans:</h1>
                <ExploreMealPlans fetchUrl={`http://localhost:8080/previous?user=${currID}`} />
            </div>

        </div>
    );
}

export default UserHome;
