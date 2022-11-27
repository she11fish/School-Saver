import { useState } from "react"
import { Link } from "react-router-dom"
import SignIn from "../SignIn/sign_in"
import SignUp from "../SignUp/sign_up"
import { auth } from "../../firebase-config"
import LogOut from "../LogOut/LogOut"
import { logout } from "../../utils/util"

export default function Navbar() {
    const [signUpClicked, setSignUpClicked] = useState(false)
    const [signInClicked, setSignInClicked] = useState(false)
    const [logOutClicked, setLogOutClicked] = useState(false)
    const [logOutConfirmation, setLogOutConfirmation] = useState(false)

    if (logOutConfirmation) {
        logout()
    }

    return (
        <>
            <nav>
                <Link to="/"><div className="nav-title">Home</div></Link>
                <Link to="/notes"><div className="nav-title">Notes</div></Link>
                <Link to="/bookmarks"><div className="nav-title">Bookmarks</div></Link>
                { auth.currentUser && <div className="nav-title" onClick={() => {setLogOutClicked(true)}}>Log out</div> }
                { !auth.currentUser && <div className="nav-title" onClick={() => {setSignInClicked(true)}}>Sign in</div> }
                { !auth.currentUser && <div className="nav-title" onClick={() => {setSignUpClicked(true)}}>Sign up</div> }
            </nav>
            <div className="line"></div>
            { signUpClicked && <SignUp /> }
            { signInClicked && <SignIn /> }
            { logOutClicked && <LogOut setButtonClicked={setLogOutClicked} setLogOutConfirmation={setLogOutConfirmation}/>}
        </>
    )
}