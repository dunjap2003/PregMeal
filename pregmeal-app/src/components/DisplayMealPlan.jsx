import UserNavbar from "./UserNavbar";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';

const DisplayMealPlan = () => {
    const [mealPlan, setMealPlan] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const [user, setUser] = useState("");
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/mealplans?id=${id}`);
                if (response.ok) {
                    const json = await response.json();
                    setMealPlan(json);
                    console.log(json);
                    const isUserFollowing = await checkIfUserIsFollowing(json.id);
                    setIsFollowing(isUserFollowing);
                } else {
                    console.error('Error:', response.statusText);
                }
            } catch (error) {
                console.error('Error:', error.message);
            }
        };

        fetchData();
    }, [id]);

    const currID = sessionStorage.getItem("id");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/profile?user=${currID}`);
                if (response.ok) {
                    let json = await response.json();
                    console.log(json);
                    setUser(json);
                } else {
                    console.error('Error:', response.statusText);
                }
            } catch (error) {
                console.error('Error:', error.message);
            }
        };

        fetchData();
    }, [currID]);

    const handleRecipeClick = (recipeId) => {
        navigate(`/recipe/${recipeId}`);
    };

    const checkIfUserIsFollowing = async (mealPlanId) => {
        try {
            const userId = sessionStorage.getItem("id");
            const response = await fetch(`http://localhost:8080/isFollowing?userId=${userId}&mealPlanId=${mealPlanId}`);
            if (response.ok) {
                const isFollowing = await response.json();
                return isFollowing;
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
        return false;
    };

    const subscribeToMealPlan = async (e) => {
        e.preventDefault();

        try {
            const userId = sessionStorage.getItem("id");
            const response = await fetch(`http://localhost:8080/follow?mealPlanId=${mealPlan.id}`, {
                method: "POST",
                body: JSON.stringify({ user_id: userId }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.status === 500) {
                setMessage("An error occurred, please try again later.");
            } else if (response.ok) {
                setIsFollowing(!isFollowing);
            } else {
                const errorMessages = await response.json();
                console.log("Error response:", errorMessages);
                setMessage(errorMessages);
            }
        } catch (err) {
            console.log(err);
            setMessage("An error occurred while processing your request");
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <UserNavbar />
            <div className="flex flex-col">
                <div className="flex justify-between items-center mx-2 px-3">
                    <h1 className="text-5xl text-darkpink font-bold">{mealPlan?.name}</h1>
                    <button 
                        onClick={subscribeToMealPlan} 
                        className="bg-pink py-3 px-5 text-white font-semibold rounded-lg hover:shadow-lg hover:bg-darkpink transition duration-300 cursor-pointer"
                    >
                        {isFollowing ? "Unfollow" : "Follow"}
                    </button>
                </div>
                <p className="text-3xl font-bold text-lightpink mx-2 px-3 mt-2">Duration: {mealPlan?.duration} days</p>
                <p className="text-2xl font-bold text-lightpink mx-2 px-3 mt-2">Your suggested daily calorie intake: {user.dailyCalorieIntake}</p>
            </div>
            <div className="flex flex-wrap justify-center">
                {mealPlan?.mealPlanDays.map((day) => (
                    <div key={day.id} className="max-w-md w-full bg-babypink shadow-lg rounded-lg m-4 p-4">
                        <h3 className="text-xl font-bold text-darkpink mb-4">Day {day.day}</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-darkpink">Breakfast:</span>
                                <button
                                    className="text-pink hover:underline text-right"
                                    onClick={() => handleRecipeClick(day.breakfast.id)}
                                >
                                    {day.breakfast.name}
                                </button>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-darkpink">Morning Snack:</span>
                                <button
                                    className="text-pink hover:underline text-right"
                                    onClick={() => handleRecipeClick(day.morningSnack.id)}
                                >
                                    {day.morningSnack.name}
                                </button>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-darkpink">Lunch:</span>
                                <button
                                    className="text-pink hover:underline text-right"
                                    onClick={() => handleRecipeClick(day.lunch.id)}
                                >
                                    {day.lunch.name}
                                </button>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-darkpink">Afternoon Snack:</span>
                                <button
                                    className="text-pink hover:underline text-right"
                                    onClick={() => handleRecipeClick(day.afternoonSnack.id)}
                                >
                                    {day.afternoonSnack.name}
                                </button>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-darkpink">Dinner:</span>
                                <button
                                    className="text-pink hover:underline text-right"
                                    onClick={() => handleRecipeClick(day.dinner.id)}
                                >
                                    {day.dinner.name}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DisplayMealPlan;
