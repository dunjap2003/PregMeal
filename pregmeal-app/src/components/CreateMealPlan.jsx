import React, { useState } from 'react';
import UserNavbar from './UserNavbar';
import { useNavigate } from 'react-router-dom';

const CreateMealPlan = () => {
    const [name, setName] = useState('');
    const [duration, setDuration] = useState('');
    const navigate = useNavigate();

    let goToMealPlanDays = (json) => {
        navigate(`/mealplandays/${json}`);
    }

    let setBasicInfo = async (e) => {
        e.preventDefault();

        if (!name) {
            setMessage('Please enter a name for your meal plan.');
            return;
        }

        else if (!duration) {
            setMessage('Please enter a duration for your meal plan.')
            return;
        }

        try {
            let post = await fetch("http://localhost:8080/createMealPlan", {
                method: "POST",
                body: JSON.stringify({
                    name: name,
                    duration: duration,
                    user_id: sessionStorage.getItem("id")
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (post.status === 500) {
                return;
            }

            if (post.ok) {
                let json = await post.json();
                console.log(json);
                setName('');
                setDuration('');
                goToMealPlanDays(json);
            } else {
                let errorMessages = await post.json();
                console.log("Error response:", errorMessages);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="flex flex-col h-screen">
            <UserNavbar />
            <h1 className="text-4xl text-darkpink font-bold pl-4">Create your own meal plan!</h1>
            <div className="flex flex-grow justify-center items-center">
                <div className="relative z-0 w-full mb-5">
                    <form id="form" className="flex flex-col items-center">
                        <label htmlFor="name" className="text-darkpink flex">
                            <p className="text-red-600 font-bold"></p>Name of your meal plan
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder=""
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="block w-1/5 px-4 py-2 mb-4 border-2 border-solid border-pink text-darkpink bg-white rounded-md focus:border-pink focus:outline-none focus:ring"
                        />

                        <label htmlFor="duration" className="text-darkpink flex">
                            <p className="text-red-600 font-bold"></p>Duration in days
                        </label>
                        <input
                            type="number"
                            name="duration"
                            placeholder=""
                            required
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            className="block w-1/12 px-4 py-2 mb-4 border-2 border-solid border-pink text-darkpink bg-white rounded-md focus:border-pink focus:outline-none focus:ring"
                        />

                        <button
                            id="button"
                            type="button"
                            onClick={setBasicInfo}
                            className="w-1/12 px-6 py-3 mt-3 text-lg text-babypink transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-pink hover:bg-darkpink hover:shadow-lg focus:outline-none"
                        >
                            Next
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateMealPlan;
