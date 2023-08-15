import React from "react";

const About = () => {
    return (
        <div className="About-Page">
            <h2>About Us</h2>
            <div className="About-Container">
                <div className="About-Content">
                    <p>
                        We are dedicated to helping pets find their forever homes by connecting
                        them with loving families like yours. Our mission is to make the adoption process easier and more enjoyable,
                        both for you and for the animals. Our website provides a search to a vast database of adoptable pets from various shelters and rescues across the country.
                    </p>
                    <p>
                        By choosing to adopt, you're not just bringing joy to your life but also giving a deserving pet a second
                        chance at happiness. Your decision to adopt will make a positive impact on the lives of these animals and
                        helps in reducing pet overpopulation.
                        Thank you for considering adoption and supporting our cause. Together, we can make the world a better place
                        for pets and their future families. If you have any questions or need assistance, please don't hesitate to
                        contact us.
                    </p>
                </div>
                <h3 className="About-Links">
                    Want to learn more about adoption? Check out these links:
                    <ul>
                        <a href="https://indyschild.com/is-your-family-ready-to-adopt-a-pet-quiz/" target="_blank" rel="noreferrer">Are you ready to adopt?</a>
                    </ul>
                    <ul>
                        <a href="https://www.wikihow.com/What-Pet-Should-I-Get-Quiz" target="_blank" rel="noreferrer">What type of pet is best for you?</a>
                    </ul>
                </h3>
            </div>
        </div>
    );
};

export default About