import Image from "next/image";
import {FaFacebookSquare} from "react-icons/fa";

import styles from "@styles/login.module.css";

export default function Login() {
    return (
        <div className={styles.loginForm}>
            {/* Login content, full width on small screens */}
            <div className={`${styles.loginContent} h-screen w-full lg:w-6/12`}>
                <a href="/" className="p-4">
                    <Image
                        src="/assets/logo/eventifyLogo.png"  // Path relative to the public folder
                        alt="Website Logo"
                        width={150}                   // Adjust width as needed
                        height={50}                   // Adjust height as needed
                    />
                </a>
                <div className="flex flex-col justify-center items-center h-full">
                    <h1 className="text-black font-bold text-center text-2xl md:text-3xl lg:text-4xl">
                        Log in
                    </h1>

                    <p className="text-center">
                        Welcome back! Please enter your details.
                    </p>

                    <div className="mt-10 flex flex-col justify-center w-9/12">
                        <form action="" className="flex flex-col">
                            <label htmlFor="email" className="mb-2 font-bold">Email</label>
                            <input className="border border-2 p-2 rounded-xl border-black mb-6" type="email" required placeholder="Enter your email..." />
                        </form>

                        <form action="">
                            <label htmlFor="password" className="mb-2 font-bold">Password</label>
                            <div className="border border-2 p-2 rounded-xl border-black mb-2">
                                <input type="password" required placeholder="Enter your Password..." />
                                {/* icon */}
                            </div>
                        </form>

                        <div className="flex justify-between mb-8">
                            <a href="/">Forgot Password?</a>
                            <span>Don't have an account? <strong><a href="/">Create</a></strong></span>
                        </div>

                        <button className="p-3 bg-customPurple-default rounded-xl text-white border-none mb-4 hover:bg-customPurple-hover">Login</button>
                        <div className={`${styles.orLine} w-full mb-4`}>
                            or
                        </div>
                        <button className="p-3 bg-customPurple-default rounded-xl text-white border-none mb-4 hover:bg-customPurple-hover">
                            {/* icon */}
                            Phone Number
                        </button>

                        <span>Other login method</span>
                        <a href="/">
                            <FaFacebookSquare 
                                className= "text-4xl"
                            />
                        </a>
                    </div>
                </div>
            </div>

            {/* Image div, hidden on small screens and shown on large screens */}
            <div className="hidden lg:flex w-full lg:w-6/12 bg-customPurple-default justify-center items-center">
                <Image
                    src="/assets/loginim/loginamico.png"  // Ensure the path is correct
                    alt="login image"
                    width={500}  // Provide the image's dimensions for optimization
                    height={300}
                />
            </div>
        </div>
    );
}