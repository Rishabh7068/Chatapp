import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useSignup from '../../hooks/useSignup'

const SignUp = () => {

    const[inputs,setInputs] = useState({
        fullName : '',
        username : '',
        gender : '',
        password : '',
        confirmPassword : ''
    })
    const {loading ,signup } = useSignup();
    const handleSubmit = async(e)=>{
        e.preventDefault();
        await signup(inputs);
    }

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
        <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>SignUp
            <span className='text-blue-500'> ChatApp</span>
        </h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label className='label p-2'>
                    <span className='text-base label-text'>Username</span>
                </label>
                <input type="text" placeholder='Enter Username' className='w-full input input-bordered h-10'
                    value={inputs.username}
                    onChange={(e) => setInputs({...inputs,username : e.target.value})}
                />
            </div>
            <div>
                <label className='label p-2'>
                    <span className='text-base label-text'>Full Name</span>
                </label>
                <input type="text" placeholder='Enter Full Name' className='w-full input input-bordered h-10'
                value={inputs.fullName}
                onChange={(e) => setInputs({...inputs,fullName : e.target.value})}
                />
            </div>


            <div>
                <label className='label p-2'>
                    <span className='text-base label-text'>Password</span>
                </label>
                <input type="password" placeholder='Enter Password' className='w-full input input-bordered h-10'
                    value={inputs.password}
                    onChange={(e) => setInputs({...inputs,password : e.target.value})}
                />
            </div>
            <div>
                <label className='label p-2'>
                    <span className='text-base label-text'>Confirm Password</span>
                </label>
                <input type="password" placeholder='Confirm Password' className='w-full input input-bordered h-10'
                    value={inputs.confirmPassword}
                    onChange={(e) => setInputs({...inputs,confirmPassword : e.target.value})}
                />
            </div>
            <div className='flex'>
                <div className='form-control'>
                    <label className='label gap-2 cursor-pointer'>
                        <span className='label-text'>Male</span>
                        <input type="radio" name="gender" className="radio checked:bg-blue-500"  
                        value={"male"}
                        onChange={(e) => setInputs({...inputs,gender : e.target.value})}
                        />
                    </label>
                </div>
                <div className='form-control'>
                    <label className='label gap-2 cursor-pointer'>
                        <span className='label-text'>Female</span>
                        <input type="radio" name="gender" className="radio checked:bg-pink-500" 
                            value={"female"}
                            onChange={(e) => setInputs({...inputs,gender : e.target.value})}
                        />
                    </label>
                </div>
            </div>
            <Link to="/login" className='text-sm hover:underline hover:text-blue-400 mt-2 inline-block'>
                Already have an account ?
            </Link>
            <div>
            <button className='btn btn-block btn-sm mt-2' disabled={loading}>
                {loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
            </button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default SignUp