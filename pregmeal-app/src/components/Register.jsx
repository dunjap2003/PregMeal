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
    const [password2, setPassword2] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState('');
    const [imageAdded, setImageAdded] = useState('');
    const [success, setSuccess] = useState(true);
    const [samePasswords, setSamePasswords] = useState(true);
    const [passwordCheckResult, setPasswordCheckResult] = useState(true)
    const [emailCheckResult, setEmailCheckResult] = useState(true)
    const [usernameTaken, setUsernameTaken] = useState(false)

    const goToLogin = () => {
        navigate("/login")
    }

    const goToConfirmation = () => {
        navigate("/confirmation")
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

        const allFieldsFilled = !!(firstname && lastname && email && username && password && password2 && birthdate);
        setSuccess(allFieldsFilled);
        if (!allFieldsFilled) return;

        const emailCheck = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
        setEmailCheckResult(emailCheck)
        if (!emailCheck) {
            return;
        }

        const passwordCheck = /^(?=.*[A-Z]).{8,}$/.test(password);
        setPasswordCheckResult(passwordCheck)
        if (!passwordCheck) {
            return;
        }

        const same = !!(password === password2);
        setSamePasswords(same)
        if (!same) {
            return;
        }

        try {
            let post = await fetch("http://localhost:8080/register", {
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

            if (post.status == 500) {
                setUsernameTaken(true);
                return;
            }

            if (post.ok) {
                setFirstName("");
                setLastName("");
                setUsername("");
                setEmail("");
                setPassword("");
                setBirthdate("");

                setMessage(["Form submitted successfully"]);
                console.log(post.status);
                setSuccess(true);
                goToConfirmation();
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
                <div className="max-w-md px-6 py-6 bg-babypink border-0 shadow-lg sm:rounded-3xl">
                    <h1 className="text-2xl font-bold mb-8 text-darkpink">Register to Pregmeal!</h1>
                    <div className="flex justify-center items-center">
                        {!success && <p className="text-l font-bold mb-8 bg-red-400 text-red-600 pl-2 pr-2">Please fill out all required fields.</p>}
                        {!emailCheckResult && success && <p className="text-l font-bold mb-8 bg-red-400 text-red-600 pl-2 pr-2">Invalid e-mail provided.</p>}
                        {usernameTaken && emailCheckResult && success && <p className="text-m font-bold mb-8 bg-red-400 text-red-600 pl-2 pr-3">Username or email already exists.</p>}
                        {!passwordCheckResult && emailCheckResult && success && <p className="text-m font-bold mb-8 bg-red-400 text-red-600 pl-2 pr-3">Passwords must contain at least 8 characters, one uppercase letter, one lowercase letter, one special character and one number.</p>}
                        {!samePasswords && passwordCheckResult && success && <p className="text-l font-bold mb-8 bg-red-400 text-red-600 pl-2 pr-2">Passwords must match.</p>}
                    </div>
                    <form id="form">
                        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                            <div className="relative z-0 w-full mb-5">
                                <label htmlFor="name" className="text-darkpink flex"><p className="text-red-600 font-bold">*</p>First name</label>
                                <input
                                    type="text"
                                    name="firstname"
                                    placeholder=""
                                    required
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="block w-full px-4 py-2 mt-2 text-darkpink bg-white rounded-md focus:border-pink focus:outline-none focus:ring"
                                />
                            </div>

                            <div className="relative z-0 w-full mb-5">
                                <label htmlFor="name" className="text-darkpink flex"><p className="text-red-600 font-bold">*</p>Last name</label>
                                <input
                                    type="text"
                                    name="lastname"
                                    placeholder=""
                                    required
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="block w-full px-4 py-2 mt-2 text-darkpink bg-white rounded-md focus:border-pink focus:outline-none focus:ring"
                                />
                            </div>
                        </div>

                        <div className="relative z-0 w-full mb-5">
                            <label htmlFor="name" className="text-darkpink flex"><p className="text-red-600 font-bold">*</p>Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder=""
                                required
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full px-4 py-2 mt-2 text-darkpink bg-white rounded-md focus:border-pink focus:outline-none focus:ring"
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                            <div className="relative z-0 w-full mb-5">
                                <label htmlFor="username" className="text-darkpink flex"><p className="text-red-600 font-bold">*</p>Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder=""
                                    required
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="block w-full px-4 py-2 mt-2 text-darkpink bg-white rounded-md focus:border-pink focus:outline-none focus:ring"
                                />
                            </div>

                            <div>
                                <label htmlFor="name" className="text-darkpink flex"><p className="text-red-600 font-bold">*</p>Date of birth</label>
                                <input
                                    type="date"
                                    name="birthdate"
                                    placeholder=""
                                    required
                                    onChange={(e) => setBirthdate(e.target.value)}
                                    className="block w-full px-4 py-2 mt-2 text-darkpink bg-white rounded-md focus:border-pink focus:outline-none focus:ring"
                                />
                            </div>

                            <div className="relative z-0 w-full mb-5">
                                <label htmlFor="name" className="text-darkpink flex"><p className="text-red-600 font-bold">*</p>Password</label>
                                <input
                                    type="password"
                                    name="password1"
                                    placeholder=""
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full px-4 py-2 mt-2 text-darkpink bg-white rounded-md focus:border-pink focus:outline-none focus:ring"
                                />
                            </div>

                            <div className="relative z-0 w-full mb-5">
                                <label htmlFor="name" className="text-darkpink flex"><p className="text-red-600 font-bold">*</p>Password confirmation</label>
                                <input
                                    type="password"
                                    name="password2"
                                    placeholder=""
                                    required
                                    onChange={(e) => setPassword2(e.target.value)}
                                    className="block w-full px-4 py-2 mt-2 text-darkpink bg-white rounded-md focus:border-pink focus:outline-none focus:ring"
                                />
                            </div>
                        </div>

                        <div className="flex justify-center gap-10">
                            <button onClick={goToLogin} id="already" type="button" className="bg-none text-pink hover:text-darkpink">Already have an account?</button>

                            <button
                                id="button"
                                type="button"
                                onClick={handleRegister}
                                className="w-1/3 px-6 py-3 mt-3 text-lg text-babypink transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-pink hover:bg-darkpink hover:shadow-lg focus:outline-none"
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