import UserNavbar from './UserNavbar'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const GenerateMealPlanInfo = () => {
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const [duration, setDuration] = useState('');
    const [isVegetarian, setIsVegetarian] = useState(false);

    const navigate = useNavigate();

    const currID = sessionStorage.getItem("id");

    const goToMealPlanDisplay = (id) => {
        navigate(`/mealplans/${id}`)
    }

    const generate = async (e) => {
        e.preventDefault();
        try {
            let post = await fetch("http://localhost:8080/generate", {
                method: "POST",
                body: JSON.stringify({
                    name: name,
                    duration: duration,
                    vegetarian: isVegetarian,
                    user_id: currID
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (post.status === 500) {
                console.log("bad");
                return;
            }

            if (post.ok) {
                console.log("tu sam")
                let json = await post.json();
                console.log(json);
                goToMealPlanDisplay(json.id);
            } else {
                let errorMessages = await post.json();
                console.log("Error response:", errorMessages);
                setMessage(errorMessages);
            }
        } catch (err) {
            console.log(err);
            setMessage("An error occurred while processing your request");
        }
    }

    return (
        <div className="flex flex-col">
            <UserNavbar />
            <div className="flex flex-col items-center">
                <div className="flex flex-col items-center mt-8">
                    <div className="max-w-md px-6 py-6 bg-babypink border-0 shadow-lg rounded-lg">
                        <div className="flex justify-center items-center">
                            {message && <p className="text-lg font-bold mb-4 text-red-600">{message}</p>}
                        </div>
                        <form id="form" onSubmit={generate}>
                            <div className="mb-5">
                                <label htmlFor="duration" className="text-darkpink">Duration</label>
                                <input
                                    type="number"
                                    name="duration"
                                    placeholder=""
                                    value={duration}
                                    onChange={(e) => setDuration(e.target.value)}
                                    className="block w-full px-4 py-2 mt-2 text-darkpink bg-white rounded-md focus:border-pink focus:outline-none focus:ring"
                                />
                            </div>

                            <div className="mb-5">
                                <label htmlFor="name" className="text-darkpink">Meal plan name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder=""
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="block w-full px-4 py-2 mt-2 text-darkpink bg-white rounded-md focus:border-pink focus:outline-none focus:ring"
                                />
                            </div>

                            <div className="mb-5 flex items-center">
                                <input
                                    type="checkbox"
                                    id="isVegetarian"
                                    checked={isVegetarian}
                                    onChange={() => setIsVegetarian(!isVegetarian)}
                                    className="mr-2"
                                />
                                <label htmlFor="isVegetarian" className="text-darkpink">Vegan</label>
                            </div>

                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    onClick={generate}
                                    className="w-full px-6 py-3 mt-3 text-lg text-babypink transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-pink hover:bg-darkpink hover:shadow-lg focus:outline-none"
                                >
                                    Generate meal plan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GenerateMealPlanInfo;
