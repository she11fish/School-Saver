import { useState } from "react"
import { signup } from "../../utils/util";

export default function SignUp () {
    const [isEmailFocused, setIsEmailFocused] = useState(false)
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function handleSubmit() {
        if (email && password)  {
            console.log("Should be working")
            signup(email, password)
        }
    }

    import("../../styles/sign_up.css");
    
    return (
        <>
            <div className="sm-box">
                <div>Sign Up</div>
                <input className="sign-up-box" type="email" placeholder={!isEmailFocused ? `Email`: ""} onChange={(e) => setEmail(e.target.value)} onFocus={() => {setIsEmailFocused(true)}} onBlur={() => {setIsEmailFocused(false)}}/>
                <input className="sign-up-box" type="password" placeholder={!isPasswordFocused ? `Password`: ""} onChange={(e) => setPassword(e.target.value)} onFocus={() => {setIsPasswordFocused(true)}} onBlur={() => {setIsPasswordFocused(false)}}/>
                <button className="sign-up-button" onClick={handleSubmit}>Sign Up</button>
            </div>
            <div className="modal-background"></div>
        </>
    )
}