import UserNavbar from './UserNavbar';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const RecipeDisplay = () => {
    const [calories, setCalories] = useState('');
    const [carbohydrates, setCarbohydrates] = useState('');
    const [cholesterol, setCholesterol] = useState('');
    const [cookTime, setCookTime] = useState('');
    const [fat, setFat] = useState('');
    const [fiber, setFiber] = useState('');
    const [name, setName] = useState('');
    const [prepTime, setPrepTime] = useState('');
    const [protein, setProtein] = useState('');
    const [published, setPublished] = useState('');
    const [saturatedFat, setSaturatedFat] = useState('');
    const [servings, setServings] = useState('');
    const [sodium, setSodium] = useState('');
    const [sugar, setSugar] = useState('');
    const [tags, setTags] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [stepsOfMaking, setStepsOfMaking] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [review, setReview] = useState('');
    const [users, setUsers] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [rating, setRating] = useState("Rating");
    const [message, setMessage] = useState('');
    const [userHasLiked, setUserHasLiked] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        setRating(option);
        setIsOpen(false);
    };

    const handleLeavingReview = async (e) => {
        e.preventDefault();

        if (!review && !rating) {
            setMessage("You can't leave a blank review.");
            return;
        }

        if (!rating) {
            setMessage("You can't leave a review without a rating.");
            return;
        }

        try {
            let post = await fetch(`http://localhost:8080/review?recipe=${id}`, {
                method: "POST",
                body: JSON.stringify({
                    user_id: sessionStorage.getItem("id"),
                    rating: rating,
                    review: review
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (post.status === 500) {
                setMessage("An error occurred, please try again later.")
            }

            if (post.ok) {
                setReview('');
                setRating('Rating');
                setMessage('');
                console.log(post.status);
                window.location.reload(false);
            } else {
                let errorMessages = await post.json();
                console.log("Error response:", errorMessages);
                setMessage(errorMessages);
            }
        } catch (err) {
            console.log(err);
            setMessage("An error occurred while processing your request");
        }
    };

    const handleLike = async (e) => {
        e.preventDefault();

        try {
            let post = await fetch(`http://localhost:8080/like?recipe=${id}`, {
                method: "POST",
                body: JSON.stringify({
                    user_id: sessionStorage.getItem("id")
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (post.status === 500) {
                setMessage("An error occurred, please try again later.")
            }

            if (post.ok) {
                console.log(post.status);
                setUserHasLiked(!userHasLiked);
            } else {
                let errorMessages = await post.json();
                console.log("Error response:", errorMessages);
                setMessage(errorMessages);
            }
        } catch (err) {
            console.log(err);
            setMessage("An error occurred while processing your request");
        }
    };

    const handleDeleteReview = async (reviewId) => {
        try {
            let response = await fetch(`http://localhost:8080/review?recipe=${id}&review=${reviewId}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.status === 500) {
                setMessage("An error occurred, please try again later.");
                return;
            }

            if (response.ok) {
                console.log('Review deleted successfully');
                window.location.reload(false);
            } else {
                let errorMessages = await response.json();
                console.log("Error response:", errorMessages);
                setMessage(errorMessages);
            }
        } catch (err) {
            console.log(err);
            setMessage("An error occurred while processing your request");
        }
    };

    const params = useParams();
    const { id } = params;

    useEffect(() => {
        const fetchRecipeData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/recipe?id=${id}`);
                console.log(response);
                if (response.ok) {
                    let json = await response.json();
                    console.log(json);
                    console.log(json.cholesterol);
                    setCalories(json.calories);
                    setCarbohydrates(json.carbohydrates);
                    setCholesterol(json.cholesterol);
                    setCookTime(json.cook_time);
                    setFat(json.fat);
                    setFiber(json.fiber);
                    setName(json.name);
                    setPrepTime(json.prep_time);
                    setProtein(json.protein);
                    setPublished(new Date(json.published));
                    setSaturatedFat(json.saturated_fat);
                    setServings(json.servings);
                    setSodium(json.sodium);
                    setSugar(json.sugar);
                    setTags(json.tags);
                    setIngredients(json.ingredients);
                    setStepsOfMaking(json.stepsOfMaking);
                    setReviews(json.reviews);
                    setUsers(json.users);
                    setUserHasLiked(json.users.some(user => user.id == sessionStorage.getItem("id")));
                } else {
                    console.error('Error:', response.statusText);
                }
            } catch (error) {
                console.error('Error:', error.message);
            }
        };

        fetchRecipeData();
    }, [id]);

    return (
        <div className="flex flex-col">
            <UserNavbar />
            <div className="flex justify-between">
                <h1 className="mx-2 px-3 text-5xl text-darkpink font-bold">{name}</h1>
                <button onClick={handleLike}>
                    <svg
                        className={`h-10 w-10 ${userHasLiked ? 'fill-darkpink' : 'fill-babypink'} hover:fill-darkpink mx-12`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512">
                        <path
                            d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                    </svg>
                </button>
            </div>
            <div className="text-md text-lightpink mx-2 px-3 mt-2">
                <p>Preparation time: {prepTime}</p>
                <p>Cook time: {cookTime}</p>
                <p>Published on: {published.toString()}</p>
                <p>Tags: {tags}</p>
            </div>
            <div className="flex flex-col">
                <div className="flex flex-col px-2 py-3 text-3xl text-darkpink">
                    <div className="flex">
                        <div className="w-1/3 flex text-pink text-2xl">
                            <div className="w-1/2 flex flex-col mx-2">
                                {servings && <div className="mb-2 px-1 border border-dashed border-babypink">
                                    {servings && <p className="font-bold">Servings</p>}
                                    {servings && <p className="text-xl text-lightpink">{servings}</p>}
                                </div>}
                                <div className="px-1 border border-dashed border-babypink">
                                    <p className="font-bold">Nutritional values</p>
                                    <div className="flex">
                                        {calories !== null && calories !== undefined && <p className="text-lg text-lightpink">Calories: {calories}</p>}
                                    </div>
                                    <div className="flex">
                                        {carbohydrates !== null && carbohydrates !== undefined && <p className="text-lg text-lightpink">Carbohydrates: {carbohydrates}</p>}
                                    </div>
                                    <div className="flex">
                                        {cholesterol !== null && cholesterol !== undefined && <p className="text-lg text-lightpink">Cholesterol: {cholesterol}</p>}
                                    </div>
                                    <div className="flex">
                                        {fat !== null && fat !== undefined && <p className="text-lg text-lightpink">Fat: {fat}</p>}
                                    </div>
                                    <div className="flex">
                                        {fiber !== null && fat !== undefined && <p className="text-lg text-lightpink">Fiber: {fiber}</p>}
                                    </div>
                                    <div className="flex">
                                        {protein !== null && protein !== undefined && <p className="text-lg text-lightpink">Protein: {protein}</p>}
                                    </div>
                                    <div className="flex">
                                        {saturatedFat !== null && protein !== undefined && <p className="text-lg text-lightpink">Saturated fat: {saturatedFat}</p>}
                                    </div>
                                    <div className="flex">
                                        {sodium !== null && sodium !== undefined && <p className="text-lg text-lightpink">Sodium: {sodium}</p>}
                                    </div>
                                    <div className="flex">
                                        {sugar !== null && sugar !== undefined && <p className="text-lg text-lightpink">Sugar: {sugar}</p>}
                                    </div>
                                </div>
                            </div>
                            <div className="w-1/2 flex flex-col border border-dashed border-babypink mx-2 px-1">
                                <p className="font-bold">Ingredients</p>
                                {ingredients &&
                                    <ul className="text-lg text-lightpink">
                                        {ingredients.map((ingredient, index) => (
                                            <li key={index}>
                                                {ingredient.quantity !== 'NULL' ? `${ingredient.name}: ${ingredient.quantity}` : ingredient.name}
                                            </li>
                                        ))}
                                    </ul>
                                }
                            </div>
                        </div>
                        <div className="w-2/3 flex flex-col border border-dashed border-babypink mx-2 px-1">
                            <p className="text-pink text-2xl font-bold">Steps of making</p>
                            {stepsOfMaking &&
                                <ul className="text-lg text-lightpink" style={{ height: '100%' }}>
                                    {stepsOfMaking.map((stepOfMaking, index) => (
                                        <li key={index} className="mb-3">
                                            {index + 1}. {stepOfMaking.text}
                                        </li>
                                    ))}
                                </ul>
                            }
                        </div>
                    </div>
                </div>
                <div className="flex flex-col border border-dashed border-babypink px-1 mx-4 my-3">
                    <p className="text-pink text-2xl font-bold">Reviews</p>
                    {message && <p className="text-l font-bold mb-8 bg-red-400 text-red-600 pl-2 pr-2">{message}</p>}
                    {reviews &&
                        <ul className="text-md text-lightpink flex-grow">
                            {reviews.map((review, index) => (
                                <li key={index} className="pl-1 flex flex-col mb-3 border border-dashed border-babypink">
                                    <div className="flex justify-between items-center">
                                        <p className="font-bold text-pink text-sm">{review.user.username} - {review.rating}*</p>
                                        {review.user.username === sessionStorage.getItem("username") && (
                                            <svg
                                                onClick={() => handleDeleteReview(review.id)}
                                                className="h-5 w-5 fill-babypink hover:fill-darkpink cursor-pointer"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M3 6h18v2H3zm3 2h12l-1 12H7zm2-5h6v2H7z" />
                                            </svg>
                                        )}
                                    </div>
                                    {review.review && <p>{review.review}</p>}
                                </li>
                            ))}
                        </ul>
                    }

                    <div>
                        <div className="flex">
                            <input
                                type="text"
                                name="review"
                                placeholder="Enter your review..."
                                required
                                onChange={(e) => setReview(e.target.value)}
                                className="w-10/12 px-4 py-2 my-2 text-darkpink bg-white rounded-md border border-lightpink focus:border-pink focus:outline-none"
                                style={{ marginTop: 'auto' }}
                            />
                            <div className="w-1/12">
                                <button onClick={toggleDropdown} className="inline-flex font-bold text-darkpink justify-center ml-2 px-4 py-2 text-sm bg-white focus:outline-none relative">
                                    {rating}
                                    <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 ml-1 ${isOpen ? 'transform rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" style={{ position: 'absolute', right: '0', top: '50%', transform: 'translateY(-50%)' }}>
                                        <path fillRule="evenodd" d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                {isOpen && (
                                    <div className="absolute mt-2 w-12 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                                        <div className="py-2 p-2" role="menu" aria-orientation="vertical" aria-labelledby="dropdown-button">
                                            <a onClick={() => handleOptionClick("1")} className="flex items-center justify-center block rounded-md px-4 py-2 text-sm text-darkpink hover:bg-babypink active:bg-blue-100 cursor-pointer" role="menuitem">
                                                1
                                            </a>
                                            <a onClick={() => handleOptionClick("2")} className="flex items-center justify-center block rounded-md px-4 py-2 text-sm text-darkpink hover:bg-babypink active:bg-blue-100 cursor-pointer" role="menuitem">
                                                2
                                            </a>
                                            <a onClick={() => handleOptionClick("3")} className="flex items-center justify-center block rounded-md px-4 py-2 text-sm text-darkpink hover:bg-babypink active:bg-blue-100 cursor-pointer" role="menuitem">
                                                3
                                            </a>
                                            <a onClick={() => handleOptionClick("4")} className="flex items-center justify-center block rounded-md px-4 py-2 text-sm text-darkpink hover:bg-babypink active:bg-blue-100 cursor-pointer" role="menuitem">
                                                4
                                            </a>
                                            <a onClick={() => handleOptionClick("5")} className="flex items-center justify-center block rounded-md px-4 py-2 text-sm text-darkpink hover:bg-babypink active:bg-blue-100 cursor-pointer" role="menuitem">
                                                5
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <button
                                id="button"
                                type="button"
                                onClick={handleLeavingReview}
                                className="w-1/12 mb-2 mr-3 text-sm text-lightpink transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-pink hover:bg-darkpink hover:shadow-lg focus:outline-none"
                            >
                                Submit
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeDisplay;
