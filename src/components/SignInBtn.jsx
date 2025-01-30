import React from 'react'
import { auth, provider } from '../Config/FirebaseAuth'
import { signInWithPopup } from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from '../Utils/authSlice'
import { useNavigate } from 'react-router-dom'
import { clearUserData } from '../Utils/authSlice'
import { toggleLoginBar } from '../Utils/toggleSlice'
import { deleteAllCart } from '../Utils/cartSlice'
const SignInBtn = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userData = useSelector((state) => state.authSlice.userData);

    async function handleGoogleSignIn() {
        let data = await signInWithPopup(auth, provider)
        // console.log(data)
        const userData = {
            name: data.user.displayName,
            photo: data.user.photoURL
        }

        dispatch(setUserData(userData))
        dispatch(toggleLoginBar())
        navigate("/")
    }

    async function handleLogout() {
        await auth.signOut()
        dispatch(clearUserData())             
        dispatch(toggleLoginBar())
        dispatch(deleteAllCart())
        navigate("/")

    }

    return (
        <div>
            
           
            {userData ? 
            <button className=' my-5 w-full text-white bg-[#ff5200] text=2xl p-5' onClick={handleLogout}>Logout</button>
        : 
        <button className='my-5 w-full text-white bg-[#ff5200] text=2xl p-5' onClick={handleGoogleSignIn}>Login with Google</button>
        }
            
        </div>
    )
}

export default SignInBtn