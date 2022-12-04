import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import SignIn from "../SignIn/SignIn"
import SignUp from "../SignUp/SignUp"
import { auth } from "../../firebase-config"
import LogOut from "../LogOut/LogOut"
import { logout } from "../../utils/util"
import { onAuthStateChanged } from "firebase/auth"

export default function Navbar() {
    const [logOutClicked, setLogOutClicked] = useState(false)
    const [logOutConfirmation, setLogOutConfirmation] = useState(false)
    
    const [logInStatus, setLogInStatus] = useState(Boolean(auth.currentUser))

    if (logOutConfirmation) {
        logout()
        window.location.reload()
    }

    useEffect(() => {
        (async () => {
            onAuthStateChanged(auth, (user) => {
                setLogInStatus(Boolean(user))
            })
        })()
    }, [])

    const [signInFocus, setSignInFocus] = useState<boolean>(false)
    const signInPopRef = useRef<HTMLDivElement>(null)
    const [signUpFocus, setSignUpFocus] = useState<boolean>(false)
    const signUpPopRef = useRef<HTMLDivElement>(null)
    const [logOutFocus, setLogOutFocus] = useState<boolean>(false)
    const logOutPopRef = useRef<HTMLDivElement>(null)

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
        document.addEventListener("mousedown", (event) => {
            const popUp: HTMLDivElement | null = logOutPopRef.current
            const target = event.target as Node
            if ((popUp?.contains(target))) {
                setLogOutFocus(true)
                return
            }
            setLogOutFocus(false)
        })
    }, [])

    return (
        <>
            <nav>
                <Link to="/"><div className="nav-title">Home</div></Link>
                <Link to="/notes"><div className="nav-title">Notes</div></Link>
                <Link to="/bookmarks"><div className="nav-title">Bookmarks</div></Link>
                { logInStatus && <div className="nav-title" onClick={() => {setLogOutFocus(true); setLogOutClicked(true)}}>Log out</div> }
                { !logInStatus && <div className="nav-title" onClick={() => {setSignInFocus(true)}}>Sign in</div> }
                { !logInStatus && <div className="nav-title" onClick={() => {setSignUpFocus(true)}}>Sign up</div> }
            </nav>
            <div className="line"></div>
            { signUpFocus && <SignUp popUpRef={signUpPopRef}/> }
            { signInFocus && <SignIn popUpRef={signInPopRef}/> }
            { logOutClicked && logOutFocus && <LogOut popUpRef={logOutPopRef} setButtonClicked={setLogOutClicked} setLogOutConfirmation={setLogOutConfirmation}/>}
        </>
    )
}