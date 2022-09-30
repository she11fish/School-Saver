import "../styles/notes.css"
import { useState } from "react"
import { Link }from "react-router-dom"

export default function Notes() {
    const [isSignedUp, setIsSignedUp] = useState(false)
    const [signUpClicked, setSignUpClicked] = useState(false)
    const [signInClicked, setSignInClicked] = useState(false)

    return (
        <>
            <nav>
                <div className="nav-title">Home</div>
                <div className="nav-title">Notes</div>
                <Link to="/bookmarks"><div className="nav-title">Bookmarks</div></Link>
                <div className="nav-title" onClick={() => {setSignInClicked(true)}}>Sign in</div>
                <div className="nav-title" onClick={() => {setSignUpClicked(true)}}>Sign up</div>
            </nav>
            <div className="line"></div>
        </>
    )
}