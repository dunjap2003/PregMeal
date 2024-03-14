import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import fruitbowl from '../assets/fruitbowl.png'

const Register = () => {
    let navigate = useNavigate();

    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState('');
    const [imageAdded, setImageAdded] = useState('');

    const goToLogin = () => {
        navigate("/login")
    }

    const handleImageChange = async (e) => {
        e.preventDefault();
        setImage(URL.createObjectURL(e.target.files[0]));
        console.log(e.target.files);
        setImageAdded(true);
    }

    const removeImage = async (e) => {
        e.preventDefault();
        setImage(null);
        setImageAdded(false);
    }

    let handleRegister = async (e) => {
        e.preventDefault();

        try {
            let post = await fetch("http://localhost:8000/register", {
                method: "POST",
                body: JSON.stringify({
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    username: username,
                    password: password,
                    birthdate: birthdate
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (post.ok) {
                setFirstName("");
                setLastName("");
                setUsername("");
                setEmail("");
                setPassword("");
                setBirthdate("");

                setMessage(["Form submitted successfully"]);
                console.log(post.status);
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
        <div>
            <Navbar />

            <div className="flex justify-center items-center">
                <img src={fruitbowl} className="w-[500px] h-[500px]"></img>
                <div className=" max-w-md px-6 py-6 bg-lightpink border-0 shadow-lg sm:rounded-3xl">
                    <h1 className="text-2xl font-bold mb-8 text-darkpink">Register to Pregmeal!</h1>
                    <form id="form">
                        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                            <div className="relative z-0 w-full mb-5">
                                <label htmlFor="name" className="text-darkpink">First name</label>
                                <input
                                    type="text"
                                    name="firstname"
                                    placeholder=""
                                    required
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="block w-full px-4 py-2 mt-2 text-darkpink bg-white rounded-md focus:border-pink focus:outline-none focus:ring"
                                />
                                <span className="text-sm text-red-600 hidden" id="error">First name is required</span>
                            </div>

                            <div className="relative z-0 w-full mb-5">
                                <label htmlFor="name" className="text-darkpink">Last name</label>
                                <input
                                    type="text"
                                    name="lastname"
                                    placeholder=""
                                    required
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="block w-full px-4 py-2 mt-2 text-darkpink bg-white rounded-md focus:border-pink focus:outline-none focus:ring"
                                />
                                <span className="text-sm text-red-600 hidden" id="error">Last name is required</span>
                            </div>
                        </div>

                        <div className="relative z-0 w-full mb-5">
                            <label htmlFor="name" className="text-darkpink">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder=""
                                required
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full px-4 py-2 mt-2 text-darkpink bg-white rounded-md focus:border-pink focus:outline-none focus:ring"
                            />
                            <span className="text-sm text-red-600 hidden" id="error">Email is required</span>
                        </div>

                        <div className="relative z-0 w-1/2 mb-5">
                            <label htmlFor="username" className="text-darkpink">Username</label>
                            <input
                                type="text"
                                name="username"
                                placeholder=""
                                required
                                onChange={(e) => setUsername(e.target.value)}
                                className="block w-full px-4 py-2 mt-2 text-darkpink bg-white rounded-md focus:border-pink focus:outline-none focus:ring"
                            />
                            <span className="text-sm text-red-600 hidden" id="error">Username is required</span>
                        </div>

                        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                            <div className="relative z-0 w-full mb-5">
                                <label htmlFor="name" className="text-darkpink">Password</label>
                                <input
                                    type="password"
                                    name="password1"
                                    placeholder=""
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full px-4 py-2 mt-2 text-darkpink bg-white rounded-md focus:border-pink focus:outline-none focus:ring"
                                />
                                <span className="text-sm text-red-600 hidden" id="error">Password is required</span>
                            </div>

                            <div className="relative z-0 w-full mb-5">
                                <label htmlFor="name" className="text-darkpink">Password confirmation</label>
                                <input
                                    type="password"
                                    name="password2"
                                    placeholder=""
                                    required
                                    className="block w-full px-4 py-2 mt-2 text-darkpink bg-white rounded-md focus:border-pink focus:outline-none focus:ring"
                                />
                                <span className="text-sm text-red-600 hidden" id="error">Password confirmation is required</span>
                            </div>

                            <div>
                                <label htmlFor="name" className="text-darkpink">Date of birth</label>
                                <input
                                    type="date"
                                    name="birthdate"
                                    placeholder=""
                                    required
                                    onChange={(e) => setBirthdate(e.target.value)}
                                    className="block w-full px-4 py-2 mt-2 text-darkpink bg-white rounded-md focus:border-pink focus:outline-none focus:ring"
                                />
                                <span className="text-sm text-red-600 hidden" id="error">Date of birth is required</span>
                            </div>

                            <div>
                                <label htmlFor="image" className="text-darkpink">Image</label>
                                <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-pink border-dashed rounded-md">
                                    <div className="space-y-1 text-center">
                                        <svg className="mx-auto h-12 w-12 text-pink" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <div className="flex flex-col gap-y-3 text-sm text-darkpink px-4 py-2">
                                            <label htmlFor="image-upload" className="relative cursor-pointer rounded-md font-medium text-pink hover:text-darkpink focus-within:ring-2 focus-within:ring-darkpink">
                                                <span>Upload an image</span>
                                                <input id="image-upload" name="image-upload" type="file" onChange={handleImageChange} className="sr-only"></input>
                                            </label>
                                            <img src={image}/>
                                            {
                                                imageAdded &&
                                                <button onClick={removeImage} className="bg-none text-pink hover:text-darkpink">Remove</button>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center gap-10">
                            <button onClick={goToLogin} id="already" type="button" className="bg-none text-pink hover:text-darkpink">Already have an account?</button>

                            <button
                                id="button"
                                type="button"
                                onClick={handleRegister}
                                className="w-1/3 px-6 py-3 mt-3 text-lg text-lightpink transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-pink hover:bg-darkpink hover:shadow-lg focus:outline-none"
                            >
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Register