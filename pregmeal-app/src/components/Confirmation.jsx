import Navbar from './Navbar'

const Confirmation = () => {
    return(
        <div>
            <Navbar />
            <div className="flex flex-col justify-center items-center mt-20">
                <h1 className="font-bold text-2xl text-darkpink">You have successfully registered! Please check your email in order to verify your account.</h1>
            </div>
        </div>
       );
};

export default Confirmation; 