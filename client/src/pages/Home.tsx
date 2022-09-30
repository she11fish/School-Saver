import "../styles/home.css"
import { useState } from "react"
import SignUp from "../components/SignUp/sign_up"
import SignIn from "../components/SignIn/sign_in"
import { Link }from "react-router-dom"

export default function Home() {
    const [isSignedUp, setIsSignedUp] = useState(false)
    const [signUpClicked, setSignUpClicked] = useState(false)
    const [signInClicked, setSignInClicked] = useState(false)

    return (
        <>
            <nav>
                <div className="nav-title">Home</div>
                <Link to="/notes"><div className="nav-title">Notes</div></Link>
                <Link to="/bookmarks"><div className="nav-title">Bookmarks</div></Link>
                <div className="nav-title" onClick={() => {setSignInClicked(true)}}>Sign in</div>
                <div className="nav-title" onClick={() => {setSignUpClicked(true)}}>Sign up</div>
            </nav>
            <div className="line"></div>
            <div className="text">A website for students to take notes and check on emails without having to go to several apps in order to do 1 simple task</div>
            { !isSignedUp && signUpClicked && <SignUp /> }
            { !isSignedUp && signInClicked && <SignIn /> }
        </>
    )
}