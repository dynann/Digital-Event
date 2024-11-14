"use client"

import Image from "next/image";
import {FaFacebookSquare} from "react-icons/fa";
import Link from "@node_modules/next/link";
import { useRouter } from "@node_modules/next/navigation";
import styles from "@styles/login.module.css";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function Login() {

    const router = useRouter();


    const [email, setEmail] = useState('')
    const [error , setError] = useState('')
    const [password, setPassword] = useState('')
    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const res = await signIn("credentials", {email, password, redirect:false})
            if(res?.error){
                setError(res.error)
                return
            }
            router.replace('/')
        } catch (error){
            console.log(error)
        }
    }


    return (
        <div className={styles.loginForm}>
            {/* Login content, full width on small screens */}
            <div className={`${styles.loginContent} h-screen w-full lg:w-6/12`}>
                <Link href="/" className="p-4">
                    <Image
                        src="/assets/logo/eventifyLogo.png"  // Path relative to the public folder
                        alt="Website Logo"
                        width={150}                   
                        height={50}                   
                    />
                </Link>
                <div className="flex flex-col justify-center items-center h-full">
                    <h1 className="text-black font-bold text-center text-2xl md:text-3xl lg:text-4xl">
                        Log in
                    </h1>

                    <p className="text-center">
                        Welcome back! Please enter your details.
                    </p>

                    <div className="mt-10 flex flex-col justify-center w-9/12">
                    <form onSubmit={handleSignIn}>
                        <form action="" className="flex flex-col">
                            <label htmlFor="email" className="mb-2 font-bold">Email</label>
                            <input className="border-2 p-2 rounded-xl border-black mb-6" type="email" required placeholder="Enter your email..." value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </form>

                        <form action="">
                            <label htmlFor="password" className="mb-2 font-bold">Password</label>
                            <div className="border-2 p-2 rounded-xl border-black mb-2">
                                <input className="border-none outline-none" type="password" required placeholder="Enter your Password..." value={password} onChange={(e) => setPassword(e.target.value)}/>
                                {/* icon */}
                            </div>
                        </form>

                        <div className="flex justify-between mb-8">
                            <Link href="/login/forgotpassword"><u>Forgot Password?</u></Link>
                            <span>Do not have an account? <strong><Link href="/signup">Create</Link></strong></span>
                        </div>

                        <button className="p-3 bg-customPurple-default rounded-xl text-white border-none mb-4 hover:bg-customPurple-hover">Login</button>
                        <div className={`${styles.orLine} w-full mb-4`}>
                            or
                        </div>
                        <button className="p-3 bg-customPurple-default rounded-xl text-white border-none mb-4 hover:bg-customPurple-hover">
                            {/* icon */}
                            Phone Number
                        </button>
                    </form>
                        <span>Other login method</span>
                        <Link href="/">
                            <FaFacebookSquare 
                                className= "text-4xl"
                            />
                        </Link>
                    </div>
                </div>
            </div>
            {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

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