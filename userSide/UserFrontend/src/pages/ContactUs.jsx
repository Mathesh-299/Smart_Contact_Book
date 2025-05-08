import React, { useRef } from 'react';
import { FaGlobe, FaInstagram, FaXTwitter } from 'react-icons/fa6';

const ContactUs = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();


    };

    return (
        <div className="min-h-[calc(100vh-5rem)] bg-gradient-to-r from-blue-200 to-indigo-400 flex flex-col items-center justify-center px-4 py-10 shadow-lg shadow-purple-500">
            <div className="w-full max-w-xl bg-white p-8 rounded-xl shadow-lg">
                <div className='bg-purple-400 py-3 px-3 text-center gap-3 rounded-lg'>
                    <h2 className="text-3xl font-bold text-center text-blue-800">Contact Us</h2>
                </div>
                <form ref={form} onSubmit={sendEmail} className="space-y-5 pt-4">
                    <input name="user_name" type="text" placeholder="Your Name" className="w-full border px-4 py-2 rounded-md" required />
                    <input name="user_email" type="email" placeholder="Your Email" className="w-full border px-4 py-2 rounded-md" required />
                    <input name="subject" type="text" placeholder="Subject" className="w-full border px-4 py-2 rounded-md" />
                    <textarea name="message" rows="4" placeholder="Your Message" className="w-full border px-4 py-2 rounded-md" required></textarea>
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">Send Message</button>
                </form>

                {/* Social Icons */}
                <div className="flex justify-center space-x-6 mt-6 text-blue-700 text-2xl">
                    <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                        <FaInstagram className="hover:text-pink-500" />
                    </a>
                    <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                        <FaXTwitter className="hover:text-black" />
                    </a>
                    <a href="https://google.com" target="_blank" rel="noopener noreferrer">
                        <FaGlobe className="hover:text-green-600" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
