import { useState } from "react"
import { Link } from "react-router-dom"
import SignIn from "../SignIn/sign_in"
import SignUp from "../SignUp/sign_up"

export default function Navbar() {
    const [signUpClicked, setSignUpClicked] = useState(false)
    const [signInClicked, setSignInClicked] = useState(false)

    const [isSignedUp, setIsSignedUp] = useState(false)

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
            { !isSignedUp && signUpClicked && <SignUp /> }
            { !isSignedUp && signInClicked && <SignIn /> }
        </>
    )
}