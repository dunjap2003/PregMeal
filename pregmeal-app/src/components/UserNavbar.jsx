import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'

const UserNavbar = () => {
    let navigate = useNavigate();

    const logout = () => {
        sessionStorage.clear()
        navigate("/")
    }

    return (
        <nav>
            <div className="flex justify-between items-center px-4 py-4">
                <div>
                    <a href="/home">
                        <img src={logo} alt="" className='w-20 inline-block items-center' />
                    </a>
                </div>

                <div className="flex items-center gap-10">
                    <div>
                        <a href="/search">
                            <span className="text-pink text-lg font-bold hover:text-darkpink">Search recipes</span>
                        </a>
                    </div>

                    <div>
                        <a href="/mealplans">
                            <span className="text-pink text-lg font-bold hover:text-darkpink">Explore meal plans</span>
                        </a>
                    </div>

                    <div>
                        <a href="/likedrecipes">
                            <span className="text-pink text-lg font-bold hover:text-darkpink">Liked recipes</span>
                        </a>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div>
                        <a href={`/profile/${sessionStorage.getItem("id")}`}>
                            <span className="text-pink text-lg hover:text-darkpink">{sessionStorage.getItem("username")}</span>
                        </a>
                    </div>

                    <div>
                        <button onClick={() => logout()} className="py-2 px-8 bg-pink font-semibold text-white rounded hover:bg-darkpink transition-all duration-300">Logout</button>
                    </div>
                </div>

            </div>
        </nav>
    );
};

export default UserNavbar; 