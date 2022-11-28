import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import SignIn from "../SignIn/SignIn"
import SignUp from "../SignUp/SignUp"
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

    const [signInFocus, setSignInFocus] = useState<boolean>(false)
    const signInPopRef = useRef<HTMLDivElement>(null)
    const [signUpFocus, setSignUpFocus] = useState<boolean>(false)
    const signUpPopRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        document.addEventListener("mousedown", (event) => {
            const popUp: HTMLDivElement | null = signInPopRef.current
            const target = event.target as Node
            if ((popUp?.contains(target))) {
                setSignInFocus(true)
                return
            }
            setSignInFocus(false)
        })
        document.addEventListener("mousedown", (event) => {
            const popUp: HTMLDivElement | null = signUpPopRef.current
            const target = event.target as Node
            if ((popUp?.contains(target))) {
                setSignUpFocus(true)
                return
            }
            setSignUpFocus(false)
        })
    }, [])

    return (
        <>
            <nav>
                <Link to="/"><div className="nav-title">Home</div></Link>
                <Link to="/notes"><div className="nav-title">Notes</div></Link>
                <Link to="/bookmarks"><div className="nav-title">Bookmarks</div></Link>
                { auth.currentUser && <div className="nav-title" onClick={() => {setLogOutClicked(true)}}>Log out</div> }
                { !auth.currentUser && <div className="nav-title" onClick={() => {setSignInClicked(true); setSignInFocus(true)}}>Sign in</div> }
                { !auth.currentUser && <div className="nav-title" onClick={() => {setSignUpClicked(true); setSignUpFocus(true)}}>Sign up</div> }
            </nav>
            <div className="line"></div>
            { signUpClicked && signUpFocus && <SignUp popUpRef={signUpPopRef}/> }
            { signInClicked && signInFocus && <SignIn popUpRef={signInPopRef}/> }
            { logOutClicked && <LogOut setButtonClicked={setLogOutClicked} setLogOutConfirmation={setLogOutConfirmation}/>}
        </>
    )
}