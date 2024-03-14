import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
import fruit from '../assets/login.jpg'

const Login = () => {
    const navigate = useNavigate()

    const goToRegister = () => {
        navigate("/register")
    }

    const goToHomepage = () => {
        navigate("/home")
    }

    return (
        <div>
            <Navbar />
            <div className="flex justify-center mt-10">
                <img src={fruit} className="w-[450px]"></img>
                <div className="flex flex-col">
                    <h1 className="mx-10 text-2xl font-bold mb-4 text-darkpink">Welcome back!</h1>
                    <div className="mx-10 max-w-sm px-6 py-6 bg-lightpink border-0 shadow-lg sm:rounded-3xl">
                        <form id="form">
                            <div className="relative z-0 w-full mb-5">
                                <label htmlFor="username" className="text-darkpink">Username/email</label>
                                <input
                                    type="text"
                                    name="firstname"
                                    placeholder=""
                                    required
                                    className="block w-full px-4 py-2 mt-2 text-darkpink bg-white rounded-md focus:border-pink focus:outline-none focus:ring"
                                />
                                <span className="text-sm text-red-600 hidden" id="error">Username or email is required</span>
                            </div>

                            <div className="relative z-0 w-full mb-5">
                                <label htmlFor="password" className="text-darkpink">Password</label>
                                <input
                                    type="password"
                                    name=""
                                    placeholder=""
                                    required
                                    className="block w-full px-4 py-2 mt-2 text-darkpink bg-white rounded-md focus:border-pink focus:outline-none focus:ring"
                                />
                                <span className="text-sm text-red-600 hidden" id="error">Password is required</span>
                            </div>

                            <div className="flex space-between gap-5">
                                <button onClick={goToRegister} id="already" type="button" className="bg-none text-pink hover:text-darkpink">Don't have an account?</button>

                                <button
                                    id="button"
                                    type="button"
                                    onClick={goToHomepage}
                                    className="w-1/3 px-6 py-3 mt-3 text-lg text-lightpink transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-pink hover:bg-darkpink hover:shadow-lg focus:outline-none"
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