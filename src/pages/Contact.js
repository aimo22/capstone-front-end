import React, { useState } from "react";

const REACT_APP_FORM_ENDPOINT = process.env.REACT_APP_FORM_ENDPOINT;

const ContactForm = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = {};

        formData.forEach((value, name) => {
            data[name] = value;
        });

        fetch(REACT_APP_FORM_ENDPOINT, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error('Form response was not ok');
            }
            console.log(res);
            setSubmitted(true);
        })
        .catch((err) => {
            console.log(err);
        });

    };

    return (
        <div className="Contact-Page">
            <h2>Contact Form</h2>
            {submitted ? (
                <div className='Contact-Submit'>
                    <p>Thank you!</p>
                    <p>We'll be in touch soon.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="Contact-Form">
                    <div>
                        <p> Name:</p>
                        <input
                            type="text"
                            placeholder="Your name"
                            name="name"
                            required
                        />
                    </div>
                    <div>
                        <p> Email:</p>
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            required
                        />
                    </div>
                    <div>
                        <p> Message:</p>
                        <textarea
                            placeholder="Your message"
                            name="message"
                            required
                        />
                    </div>
                    <div>
                        <button className="Contact-Button" type="submit">Submit message</button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default ContactForm;


