import logo from '../assets/logo.png'

const Navbar = () => {
    return (
        <nav>
            <div>
                <div>
                    <a href="/">
                        <img src={logo} alt="" className='w-20 inline-block items-center ml-5 mt-5' />
                    </a>
                </div>
            </div>
        </nav>

    );
};

export default Navbar; 