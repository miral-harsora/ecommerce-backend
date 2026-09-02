import React, { useEffect, useState } from 'react';
import { emailRegex, passwordRegex } from '../helper/Regex';
import { useNavigate } from 'react-router-dom';
const Login = ({navbarHeight}) => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState({ emailError: "", passwordError: "" })
    const [isSubmit, setIsSubmit] = useState(false)
    const [formValid, setFormValid] = useState(false)
    const [message, setMessage] = useState()
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate()
    useEffect(() => {
        if (isSubmit) {
            setShowAlert(true);
            const timer = setTimeout(() => {
                setShowAlert(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [isSubmit]);
    const validate = (e) => {
        if (e.target.id == "email") {
            console.log(e.target.value)
            handleEmail(e.target.value)
        } else if (e.target.id == "password") {
            handlePassword(e.target.value)
        }
    }
    const handleEmail = (email) => {
        let err = error.emailError;
        let isValid = formValid
        if (email.trim() === "") {
            err = "This is required!"
            isValid = false;
        } else if (!emailRegex.test(email)) {
            err = "Enter a valid email"
            isValid = false;
        } else {
            err = ""
            isValid = true;
        }
        setError({ ...error, emailError: err })
        setFormValid(isValid)
        setEmail(email)
        return isValid
    }
    const handlePassword = (password) => {
        let err = error.passwordError;
        let isValid = formValid
        if (password.trim() === "") {
            err = "This is required!"
            isValid = false;
        } else if (password.trim().length < 8) {
            err = "Enter atleast 8 characters including uppercase,lowercase and a special character!"
            isValid = false;
        } else if (!passwordRegex.test(password)) {
            err = "Enter a valid password"
            isValid = false;
        } else {
            err = ""
            isValid = true;
        }
        setError({ ...error, passwordError: err })
        setFormValid(isValid)
        setPassword(password)
        return isValid
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (handleEmail(email) && handlePassword(password)) {
            setEmail("")
            setPassword("")
            setFormValid(false)
            //setError({fnError:"",lnError:"",emailError:"",contactError:"",passwordError:""})
            setMessage("Account created successfully!")
            //navigate("/")
        }
        else {
            setMessage("Please enter correct details!")
        }
        setIsSubmit(true)

    }
    return (
        <>
            <div className="bg-gray-100 h-screen" >

                {showAlert && (
                    <div
                        className={`p-4 mb-4 text-sm text-green-800  ${message.includes("successfully") ? 'bg-green-50' : 'bg-red-50'}`}
                        role="alert"
                    >
                        <span className="font-medium">{message.includes("successfully") ? "Success alert!" : ""} </span>
                        {message}
                    </div>)}
                <div className='flex items-center justify-center min-h-screen bg-gray-100'>
                    <div className='w-full max-w-md p-6 bg-white rounded shadow-md'>
                        <div className='flex flex-col justify-center items-center'>
                            <form onSubmit={(e) => handleSubmit(e)} className='w-full'>
                                <div className='flex flex-col p-4 bg-white rounded'>
                                    <p className='font-bold text-2xl text-center mb-4'>
                                        Connect with Us – Login | Sign Up
                                    </p>

                                    <label htmlFor='email' className='my-2'>Email</label>
                                    <input
                                        type='email'
                                        id='email'
                                        placeholder='Enter your email'
                                        className='border-[1px] border-gray-300 p-2 rounded w-full'
                                        onChange={(e) => validate(e)}
                                        value={email}
                                    />
                                    <p className='text-red-300'>{error.emailError}</p>

                                    <label htmlFor='password' className='my-2'>Password</label>
                                    <input
                                        type='password'
                                        id='password'
                                        placeholder='Enter your password'
                                        className='border-[1px] border-gray-300 p-2 rounded w-full'
                                        onChange={(e) => validate(e)}
                                        value={password}
                                    />
                                    <p className='text-red-300 w-full'>{error.passwordError}</p>

                                    <button
                                        className='bg-[#F7569B] w-full p-2 my-2 rounded text-white'>
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;