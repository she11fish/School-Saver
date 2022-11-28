import { useEffect, useRef, useState } from "react"
import { signin } from "../../utils/util";
import "../../styles/sign_in.css";

export default function SignIn ({ popUpRef }: { popUpRef: React.RefObject<HTMLDivElement>}) {
    const [isEmailFocused, setIsEmailFocused] = useState(false)
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function handleSubmit() {
        if (email && password)  {
            console.log("Should be working")
            signin(email, password)
        }
    }


    return (
        <>
            <div className="sm-box" ref={popUpRef}>
                <div>Sign In</div>
                <input className="sign-in-box" type="email" placeholder={!isEmailFocused ? `Email`: ""} onChange={(e) => setEmail(e.target.value)} onFocus={() => {setIsEmailFocused(true)}} onBlur={() => {setIsEmailFocused(false)}}/>
                <input className="sign-in-box" type="password" placeholder={!isPasswordFocused ? `Password`: ""} onChange={(e) => setPassword(e.target.value)} onFocus={() => {setIsPasswordFocused(true)}} onBlur={() => {setIsPasswordFocused(false)}}/>
                <button className="sign-up-button" onClick={handleSubmit}>Sign In</button>
            </div>
            <div className="modal-background"></div>

        </>
    )
}