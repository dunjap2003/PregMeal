import homepage from '../assets/homepage3.jpg'
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

function Home() {
    let navigate = useNavigate();

    const goToRegister = () => {
        navigate("/register")
    }

    const goToLogin = () => {
        navigate("/login")
    }
    return (
        <div>
            <Navbar />
            <div className="md:px-12 p-4 max-w-screen-2xl mx-auto">
                <div>
                    <div className="flex flex-col md:flex-row justify-between items-center gap-10">
                        <div className="md:w-3/5">
                            <h2 className="md:text-4xl text-3xl font-bold text-pink mb-6">
                                Empowering Moms-to-Be with nutritious meal plans:</h2>
                            <h1 className="md:text-6xl text-5xl font-bold text-darkpink mb-6">
                                Welcome to PregMeal!
                            </h1>
                            <p className="text-lightpink text-2xl mb-8">Comprehensive solution for personalized meal plans, recipe exploration, and craving-based recommendations during pregnancy.</p>
                            <div className="space-x-5">
                                <button onClick={() => goToRegister()} className="py-2 px-8 bg-pink font-semibold text-white rounded hover:bg-darkpink transition-all duration-300">Sign up</button>
                                <button onClick={() => goToLogin()} className="py-2 px-8 font-semibold text-lightpink rounded hover:bg-lightpink hover:text-pink transition-all duration-300">Sign in</button>
                            </div>
                        </div>

                        <div>
                            <img src={homepage} alt="" className="h-[520px] mr-28" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )

}

export default Home