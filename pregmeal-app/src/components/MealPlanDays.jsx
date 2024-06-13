import UserNavbar from './UserNavbar';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const MealPlanDays = () => {
    const [mealPlan, setMealPlan] = useState('');
    const [user, setUser] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const currID = sessionStorage.getItem("id");

    const params = useParams();
    const { id } = params;

    let goToRecipeSelect = (tag, day) => {
        navigate(`/select/${id}/${day}/${tag}`);
    }

    const goToHomepage = () => {
        navigate("/home")
    }

    const saveMealPlan = async (e) => {
        e.preventDefault();

        const isCalorieWithinRange = mealPlan.mealPlanDays.every(day => {
            const totalCalories = calculateCalorieSum(day);
            return totalCalories >= user.dailyCalorieIntake - 100 && totalCalories <= user.dailyCalorieIntake + 100;
        });

        if (!isCalorieWithinRange) {
            setMessage('Each day\'s total calories must be within ±100 calories of your daily intake.');
            return;
        }

        try {
            let post = await fetch("http://localhost:8080/saveMealPlan", {
                method: "POST",
                body: JSON.stringify({
                    user_id: sessionStorage.getItem("id"),
                    meal_plan_id: mealPlan.id
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (post.status === 500) {
                return;
            }

            if (post.ok) {
                goToHomepage();
            } else {
                let errorMessages = await post.json();
                console.log("Error response:", errorMessages);
            }
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/mealplandays?id=${id}`);
                if (response.ok) {
                    let json = await response.json();
                    json.mealPlanDays.sort((a, b) => a.id - b.id);
                    setMealPlan(json);
                    console.log(json);
                } else {
                    console.error('Error:', response.statusText);
                }
            } catch (error) {
                console.error('Error:', error.message);
            }
        };

        fetchData();
    }, [id]);

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



    const calculateCalorieSum = (day) => {
        let sum = 0;
        if (day.breakfast) sum += day.breakfast.calories;
        if (day.morningSnack) sum += day.morningSnack.calories;
        if (day.lunch) sum += day.lunch.calories;
        if (day.afternoonSnack) sum += day.afternoonSnack.calories;
        if (day.dinner) sum += day.dinner.calories;
        return Math.round(sum * 100) / 100;
    }

    const renderMealForms = () => {
        if (!mealPlan) {
            return null;
        }

        return mealPlan.mealPlanDays.map((day, index) => (
            <div key={index} className="day-meal-form mx-2 my-3 bg-babypink px-2 rounded-lg">
                <h3 className="text-lg font-bold mt-2 text-darkpink">Day {index + 1}</h3>
                <div className="meal-options text-pink">
                    {renderMealOption(day.breakfast, "breakfast", "Breakfast", index)}
                </div>
                <div className="meal-options text-pink">
                    {renderMealOption(day.morningSnack, "morningsnack", "Morning snack", index)}
                </div>
                <div className="meal-options text-pink">
                    {renderMealOption(day.lunch, "lunch", "Lunch", index)}
                </div>
                <div className="meal-options text-pink">
                    {renderMealOption(day.afternoonSnack, "afternoonsnack", "Afternoon snack", index)}
                </div>
                <div className="meal-options text-pink">
                    {renderMealOption(day.dinner, "dinner", "Dinner", index)}
                </div>
                <div className="calorie-sum text-darkpink mt-2">Total Calories: {calculateCalorieSum(day)}</div>
            </div>
        ));
    }

    const renderMealOption = (recipe, tag, writtenTag, index) => {
        if (recipe) {
            return <label className="cursor-pointer font-bold" onClick={() => goToRecipeSelect(tag, index + 1)}>{recipe.name}</label>;
        } else {
            return <label className="cursor-pointer" onClick={() => goToRecipeSelect(tag, index + 1)}>{writtenTag}</label>;
        }
    }

    return (
        <div className="flex flex-col">
            <UserNavbar />
            <h2 className="text-4xl font-bold mb-2 text-darkpink pl-4">{mealPlan.name}</h2>
            <h2 className="text-3xl font-bold mb-2 text-lightpink pl-4">Duration: {mealPlan.duration} days</h2>
            <h3 className="text-2xl font-bold mb-2 text-lightpink pl-4">Your suggested daily calorie intake: { Math.round(user.dailyCalorieIntake * 100) / 100 }</h3>
            {message && <p className="text-l font-bold mb-8 bg-red-400 text-red-600 pl-2 pr-2">{message}</p>}
            <div className="flex flex-col items-center">
                <div className="flex flex-wrap justify-center">
                    {renderMealForms()}
                </div>
                <button className={`w-1/12 h-10 px-2 mt-3 ml-1 text-sm text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-pink hover:shadow-lg focus:outline-none`}
                    onClick={saveMealPlan}
                >
                    Done
                </button>
            </div>
        </div>
    );
};

export default MealPlanDays;
