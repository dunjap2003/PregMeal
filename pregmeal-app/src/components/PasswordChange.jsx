import Navbar from './Navbar'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const PasswordChange = () => {
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [repeatedNewPassword, setRepeatedNewPassword] = useState('')
    const [message, setMessage] = useState('')

    let navigate = useNavigate()

    const goToHomepage = () => {
        navigate("/home")
    }

    const handlePasswordChange = async(e) => {
        e.preventDefault();
        
        if(!oldPassword || !newPassword || !repeatedNewPassword){
            setMessage("Please fill out all the fields.")
            return;
        }

        if(oldPassword === newPassword){
            setMessage("New password can't be the same as the old one.")
            return;
        }

        const passwordCheck = /^(?=.*[A-Z]).{8,}$/.test(newPassword);
        if(!passwordCheck){
            setMessage("Passwords must contain at least 8 characters, one uppercase letter, one lowercase letter, one special character and one number.")
            return;
        }

        if(newPassword !== repeatedNewPassword){
            setMessage("New passwords must match.")
            return;
        }

        try {
            let post = await fetch(`http://localhost:8080/passwordChange?user=${sessionStorage.getItem("id")}`, {
                method: "POST",
                body: JSON.stringify({
                    oldPassword: oldPassword,
                    newPassword: newPassword,
                    repeatedNewPassword: repeatedNewPassword
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (post.status === 500) {
                setMessage('Incorrect password.');
                return;
            }

            if (post.ok) {
                setOldPassword('');
                setNewPassword('');
                setRepeatedNewPassword('');
                setMessage('');
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
            <div className="flex justify-center">
                <div className="max-w-sm mt-10 px-6 py-6 bg-babypink border-0 shadow-lg sm:rounded-3xl">
                    <h1 className="text-2xl font-bold mb-4 text-darkpink">Change your password</h1>
                    {message && <p className="text-l font-bold mb-8 bg-red-400 text-red-600 pl-2 pr-2">{message}</p>}
                    <form id="form" className="space-y-4">
                        <div className="relative z-0">
                            <label htmlFor="oldPassword" className="text-darkpink">Old password</label>
                            <input
                                type="password"
                                name="oldPassword"
                                placeholder=""
                                onChange={(e) => setOldPassword(e.target.value)}
                                className="block w-full px-4 py-2 mt-2 text-darkpink bg-white rounded-md focus:border-pink focus:outline-none focus:ring"
                            />
                        </div>

                        <div className="relative z-0">
                            <label htmlFor="newPassword" className="text-darkpink">New password</label>
                            <input
                                type="password"
                                name="newPassword"
                                placeholder=""
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="block w-full px-4 py-2 mt-2 text-darkpink bg-white rounded-md focus:border-pink focus:outline-none focus:ring"
                            />
                        </div>

                        <div className="relative z-0">
                            <label htmlFor="newPassword" className="text-darkpink">New password confirmation</label>
                            <input
                                type="password"
                                name="repeatedNewPassword"
                                placeholder=""
                                onChange={(e) => setRepeatedNewPassword(e.target.value)}
                                className="block w-full px-4 py-2 mt-2 text-darkpink bg-white rounded-md focus:border-pink focus:outline-none focus:ring"
                            />
                        </div>

                        <button
                            id="button"
                            type="button"
                            onClick={handlePasswordChange}
                            className="w-full px-6 py-3 mt-3 text-lg text-babypink transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-pink hover:bg-darkpink hover:shadow-lg focus:outline-none"
                        >
                            Change Password
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PasswordChange;
