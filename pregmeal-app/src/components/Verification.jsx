import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Verification = () => {
    let navigate = useNavigate();
    const goToLogin = () => {
        navigate("/login")
    }

    const params = useParams();
    const { code } = params;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/verify?code=${code}`);

                if (response.ok) {
                    console.log(response);
                } else {
                    console.error('Error:', response.statusText);
                }
            } catch (error) {
                console.error('Error:', error.message);
            }
        };

        fetchData();
    }, [code]);

    return (
        <div>
            <Navbar />
            <div className="flex flex-col justify-center items-center mt-20">
                <h1 className="font-bold text-2xl text-darkpink">Congratulations, your account is now verified!</h1>
                <button onClick={goToLogin} id="already" type="button" className="w-1/5 px-4 py-3 mt-3 text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-pink hover:bg-darkpink hover:shadow-lg focus:outline-none">Login</button>
            </div>
        </div>
    );
};

export default Verification;