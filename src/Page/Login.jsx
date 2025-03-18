import React, { useEffect, useState } from 'react';
import RegisterForm from '../components/RegisterForm';
import CartAsolute from '../components/CartAsolute';
import LoginForm from '../components/LoginForm';

const Login = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % 4);
        }, 5000);

        return () => clearInterval(interval); // Clean up interval on component unmount
    }, []);

    return (
        <div className="container-fluid" style={{ marginTop: 20 }}>
            <div className="row">
                <div className="col-md-4 col-12" id="aside">
                    <div className="image-container">
                        <img
                            src="https://i.ebayimg.com/images/g/Rs8AAOSwustkMCLH/s-l1600.webp"
                            className={`img-fluid ${currentIndex === 0 ? 'active' : ''}`}
                            alt="carousel-1"
                        />
                        <img
                            src="https://www.itaf.eu/wp-content/uploads/2021/01/Best-laptops-in-2021-7-things-to-consider-when-buying-a-laptop.jpg"
                            className={`img-fluid ${currentIndex === 1 ? 'active' : ''}`}
                            alt="carousel-2"
                        />
                        <img
                            src="https://i.ebayimg.com/images/g/rToAAOSw2IVl3hOk/s-l1600.webp"
                            className={`img-fluid ${currentIndex === 2 ? 'active' : ''}`}
                            alt="carousel-3"
                        />
                        <img
                            src="https://th.bing.com/th/id/OIF.k0Jf3jPWcHVcyfPZWC5vWQ?rs=1&pid=ImgDetMain"
                            className={`img-fluid ${currentIndex === 3 ? 'active' : ''}`}
                            alt="carousel-4"
                        />
                    </div>
                </div>
                <div className="col-md-8 col-12" id="section">
                    <LoginForm />
                </div>
            </div>
            <CartAsolute />
        </div>
    );
};

export default Login;
