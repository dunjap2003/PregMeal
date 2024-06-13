import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const ExploreMealPlans = ({ fetchUrl }) => {
    const [mealPlans, setMealPlans] = useState([]);
    const navigate = useNavigate();

    const fetchData = async (url) => {
        try {
            const response = await fetch(url);
            if (response.ok) {
                const json = await response.json();
                setMealPlans(json);
                console.log(json);
            } else {
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    useEffect(() => {
        fetchData(fetchUrl);
    }, [fetchUrl]);

    const goToMealPlan = (id) => {
        navigate(`/mealplans/${id}`);
    };

    return (
        <div className="flex flex-col">
            <div className="flex flex-wrap justify-center">
                {mealPlans.map((mealPlan, index) => (
                    <div
                        key={index}
                        className="max-w-xs mx-4 my-4 bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105 cursor-pointer"
                        onClick={() => goToMealPlan(mealPlan.id)}
                    >
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2 text-darkpink">{mealPlan.name}</div>
                            <p className="text-pink text-base">Duration: {mealPlan.duration} days</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExploreMealPlans;