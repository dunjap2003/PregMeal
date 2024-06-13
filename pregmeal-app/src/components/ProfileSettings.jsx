import UserNavbar from './UserNavbar'
import { useState, useEffect } from 'react'

const ProfileSettings = () => {
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [birthdate, setBirthDate] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [conception_date, setConceptionDate] = useState('');
    const [diabetes, setDiabetes] = useState(false);

    const handleDiabetesChange = () => {
        setDiabetes(!diabetes);
    };

    const currID = sessionStorage.getItem("id");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/profile?user=${currID}`);
                if (response.ok) {
                    let json = await response.json();
                    console.log(json);
                    setName(json.name);
                    setSurname(json.surname);
                    setEmail(json.email);
                    setPassword(json.password);
                    setUsername(json.username);
                    setBirthDate(json.birthdate);
                    setHeight(json.height);
                    setWeight(json.weight);
                    setConceptionDate(json.conceptionDate);
                    if (json.diabetes === 1) {
                        setDiabetes(true)
                    }
                } else {
                    console.error('Error:', response.statusText);
                }
            } catch (error) {
                console.error('Error:', error.message);
            }
        };

        fetchData();
    }, [currID]);

    let saveChanges = async (e) => {
        e.preventDefault();

        const allFieldsFilled = !!(name && surname && email && username && password && birthdate && conception_date && height && weight);
        if (!allFieldsFilled) {
            setMessage("All the fields are required.")
            return;
        }

        const emailCheck = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
        if (!emailCheck) {
            setMessage("Email format invalid.")
            return;
        }

        const passwordCheck = /^(?=.*[A-Z]).{8,}$/.test(password);
        if (!passwordCheck) {
            setMessage("Password format invalid.");
            return;
        }

        try {
            let diabetesValue;
            console.log(diabetes)
            if (diabetes === true) {
                diabetesValue = 1
            }
            else {
                diabetesValue = 0
            }
            let post = await fetch(`http://localhost:8080/profile?user=${currID}`, {
                method: "POST",
                body: JSON.stringify({
                    id: sessionStorage.getItem("id"),
                    name: name,
                    surname: surname,
                    email: email,
                    username: username,
                    password: password,
                    birthdate: birthdate,
                    height: height,
                    weight: weight,
                    conceptionDate: conception_date,
                    diabetes: diabetesValue
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (post.status == 500) {
                setMessage("Username or email already exists.");
                return;
            }

            if (post.ok) {
                setMessage('');
                console.log(post.status);
                alert("Changes saved successfully");
            } else {
                let errorMessages = await post.json();
                console.log("Error response:", errorMessages);
                setMessage(errorMessages);
                alert("A problem occured, please try again later.")
            }
        } catch (err) {
            console.log(err);
            setMessage("An error occurred while processing your request");
        }
    }

    return (
        <div>
            <UserNavbar />
            <div className="w-full py-1">
                <div>
                    {message && <p className="text-l font-bold mb-8 bg-red-400 text-red-600 pl-2 pr-2">{message}</p>}
                </div>
                <div className="flex p-2 md:p-4">
                    <div className="w-full px-6 pb-8 mt-8 mr-20 sm:max-w-xl sm:rounded-lg">
                        <h2 className="text-2xl font-bold sm:text-2xl text-darkpink">Basic profile info</h2>
                        <div className="grid max-w-2xl">
                            <div className="items-center mt-3 sm:mt-14 text-[#202142]">
                                <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                                    <div className="w-full">
                                        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-darkpink flex">Your first name</label>
                                        <input type="text"
                                            id="first_name"
                                            className="bg-babypink border border-pink text-darkpink text-sm rounded-lg block w-full p-2.5"
                                            placeholder="Your first name"
                                            defaultValue={name}
                                            onChange={(e) => setName(e.target.value)} />
                                    </div>

                                    <div className="w-full">
                                        <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-darkpink flex">Your last name</label>
                                        <input type="text"
                                            id="last_name"
                                            className="bg-babypink border border-pink text-darkpink text-sm rounded-lg block w-full p-2.5"
                                            placeholder="Your last name"
                                            defaultValue={surname}
                                            onChange={(e) => setSurname(e.target.value)} />
                                    </div>
                                </div>

                                <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                                    <div className="w-full">
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-darkpink flex">Your username</label>
                                        <input type="text" id="username"
                                            className="bg-babypink border border-pink text-darkpink text-sm rounded-lg block w-full p-2.5"
                                            placeholder="your.username"
                                            defaultValue={username}
                                            onChange={(e) => setUsername(e.target.value)} />
                                    </div>

                                    <div className="w-full">
                                        <label htmlFor="birthdate"
                                            className="block mb-2 text-sm font-medium text-darkpink flex">Your birthdate</label>
                                        <input
                                            type="date"
                                            name="birthdate"
                                            placeholder=""
                                            className="block w-full px-4 py-2 mt-2 text-darkpink bg-babypink border border-pink rounded-md focus:border-pink focus:outline-none focus:ring"
                                            defaultValue={birthdate}
                                            onChange={(e) => setBirthDate(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                                    <div className="w-full">
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-darkpink flex">Your email</label>
                                        <input type="email" id="email"
                                            className="bg-babypink border border-pink text-darkpink text-sm rounded-lg block w-full p-2.5"
                                            placeholder="your.email@mail.com"
                                            defaultValue={email}
                                            onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                </div>

                                <div>
                                    <a href={`/passwordChange/${sessionStorage.getItem("id")}`}>
                                        <span className="text-pink text-lg hover:text-darkpink">Want to change your password?</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full px-6 pb-8 mt-8 ml-20 sm:max-w-xl sm:rounded-lg">
                        <h2 className="text-2xl font-bold sm:text-2xl text-darkpink">Additional profile info</h2>
                        <div className="grid max-w-2xl">
                            <div className="items-center mt-3 sm:mt-14 text-[#202142]">
                                <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                                    <div className="w-full">
                                        <label htmlFor="conception_date" className="block mb-2 text-sm font-medium text-darkpink">Your conception date</label>
                                        <input type="date"
                                            id="conception_date"
                                            className="block w-full px-4 py-2 mt-2 text-darkpink bg-babypink border border-pink rounded-md focus:border-pink focus:outline-none focus:ring"
                                            placeholder=""
                                            defaultValue={conception_date}
                                            onChange={(e) => setConceptionDate(e.target.value)} />
                                    </div>

                                    <div className="w-full">
                                        <label htmlFor="height" className="block mb-2 text-sm font-medium text-darkpink">Your height (cm)</label>
                                        <input type="number"
                                            id="height"
                                            className="bg-babypink border border-pink text-darkpink text-sm rounded-lg block w-full p-2.5"
                                            placeholder="165"
                                            defaultValue={height}
                                            onChange={(e) => setHeight(e.target.value)} />
                                    </div>
                                </div>

                                <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                                    <div className="w-full">
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-darkpink">Your pre-pregnancy weight (kg)</label>
                                        <input type="number" id="weight"
                                            className="bg-babypink border border-pink text-darkpink text-sm rounded-lg block w-full p-2.5"
                                            placeholder="55"
                                            defaultValue={weight}
                                            onChange={(e) => setWeight(e.target.value)} />
                                    </div>

                                    <div className="w-full">
                                        <label htmlFor="diabetes" className="block mb-2 text-sm font-medium text-darkpink">Developed gestational diabetes?</label>
                                        <input type="checkbox" id="diabetes"
                                            className="bg-babypink border border-pink text-darkpink text-sm rounded-lg block w-full p-2.5"
                                            placeholder="your.username"
                                            checked={diabetes}
                                            onChange={handleDiabetesChange} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center">
                    <button type="submit"
                        className="text-white bg-pink hover:bg-darkpink focus:ring-4 focus:outline-none focus:ring-lightpink font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                        onClick={saveChanges}>Save</button>
                </div>
            </div>
        </div>
    );
};

export default ProfileSettings; 