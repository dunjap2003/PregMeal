import { useState } from 'react';
import UserNavbar from './UserNavbar';
import RecipeList from './RecipeList';

const RecipeSearch = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("Search by");
    const [message, setMessage] = useState('');
    const [searchWords, setSearchWords] = useState('');
    const [recipes, setRecipes] = useState('');

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    const handleSearch = async (e) => {
        e.preventDefault();

        if (selectedOption === "Search by") {
            setMessage("Please choose an option to search by.")
            return;
        }

        if (!searchWords) {
            setMessage("Please enter search keywords.")
            return;
        }

        try {
            let post = await fetch("http://localhost:8080/search", {
                method: "POST",
                body: JSON.stringify({
                    searchBy: selectedOption,
                    searchWords: searchWords
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if(post.status === 500){
                setMessage("No recipes found. Please try with different keywords or try searching by another option.")
                return;
            }

            if (post.ok) {
                let json = await post.json();
                setMessage('');
                console.log(json);
                setRecipes(json);
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
            <div className="flex justify-center">
                {message && <p className="text-center w-1/4 text-l font-bold bg-red-400 text-red-600 pl-2 pr-2">{message}</p>}
            </div>
            <div className="relative">
                <div className="flex items-center justify-center p-6 space-x-6 bg-white">
                    <div className="flex bg-gray-100 p-4 w-72 space-x-4 rounded-2xl">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input className="bg-gray-100 outline-none rounded-xl" type="text" placeholder="Search" onChange={(e) => setSearchWords(e.target.value)} />
                    </div>
                    <div className="relative inline-block text-left">
                        <button onClick={toggleDropdown} className="inline-flex font-bold text-darkpink justify-center w-full px-4 py-2 text-sm bg-white focus:outline-none">
                            {selectedOption}
                            <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 ml-1 ${isOpen ? 'transform rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                        {isOpen && (
                            <div className="absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                                <div className="py-2 p-2" role="menu" aria-orientation="vertical" aria-labelledby="dropdown-button">
                                    <a onClick={() => handleOptionClick("Recipe name")} className="flex block rounded-md px-4 py-2 text-sm text-darkpink hover:bg-babypink active:bg-blue-100 cursor-pointer" role="menuitem">
                                        Recipe name
                                    </a>
                                    <a onClick={() => handleOptionClick("Recipe tag")} className="flex block rounded-md px-4 py-2 text-sm text-darkpink hover:bg-babypink active:bg-blue-100 cursor-pointer" role="menuitem">
                                        Recipe tag
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                    <button onClick={handleSearch} className="bg-pink py-3 px-5 text-white font-semibold rounded-lg hover:shadow-lg hover:bg-darkpink transition duration-3000 cursor-pointer">
                        Search
                    </button>
                </div>
                {recipes && (
                    <div className="w-full">
                        <RecipeList recipes={recipes} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecipeSearch;
