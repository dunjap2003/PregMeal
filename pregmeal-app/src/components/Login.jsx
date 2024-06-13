import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import fruit from '../assets/login.jpg'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const navigate = useNavigate()

    const goToRegister = () => {
        navigate("/register")
    }

    const goToHomepage = () => {
        navigate("/home")
    }

    let handleLogin = async (e) => {
        e.preventDefault();

        if (!username) {
            setMessage('Please enter your username.');
            return;
        }

        else if (!password) {
            setMessage('Please enter your password.')
            return;
        }

        try {
            let post = await fetch("http://localhost:8080/login", {
                method: "POST",
                body: JSON.stringify({
                    username: username,
                    password: password
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (post.status === 500) {
                setMessage('Invalid username or password.');
                return;
            }

            if (post.ok) {
                let json = await post.json();
                console.log(json);
                setUsername('');
                setPassword('');
                setMessage('');
                sessionStorage.setItem("id", json.id);
                sessionStorage.setItem("username", json.username);
                goToHomepage();
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
            <div className="flex justify-center mt-10">
                <img src={fruit} className="w-[450px]"></img>
                <div className="flex flex-col">
                    <h1 className="mx-10 text-2xl font-bold mb-4 text-darkpink">Welcome back!</h1>
                    <div className="mx-10 max-w-sm px-6 py-6 bg-babypink border-0 shadow-lg sm:rounded-3xl">
                        <div className="flex justify-center items-center">
                            {message && <p className="text-l font-bold mb-8 bg-red-400 text-red-600 pl-2 pr-2">{message}</p>}
                        </div>
                        <form id="form">
                            <div className="relative z-0 w-full mb-5">
                                <label htmlFor="username" className="text-darkpink">Username</label>
                                <input
                                    type="text"
                                    name="firstname"
                                    placeholder=""
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="block w-full px-4 py-2 mt-2 text-darkpink bg-white rounded-md focus:border-pink focus:outline-none focus:ring"
                                />
                            </div>

                            <div className="relative z-0 w-full mb-5">
                                <label htmlFor="password" className="text-darkpink">Password</label>
                                <input
                                    type="password"
                                    name=""
                                    placeholder=""
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full px-4 py-2 mt-2 text-darkpink bg-white rounded-md focus:border-pink focus:outline-none focus:ring"
                                />
                                <span className="text-sm text-red-600 hidden" id="error">Password is required</span>
                            </div>

                            <div className="flex space-between gap-5">
                                <button onClick={goToRegister} id="already" type="button" className="bg-none text-pink hover:text-darkpink">Don't have an account?</button>

                                <button
                                    id="button"
                                    type="button"
                                    onClick={handleLogin}
                                    className="w-1/3 px-6 py-3 mt-3 text-lg text-babypink transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-pink hover:bg-darkpink hover:shadow-lg focus:outline-none"
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login