import { useState } from "react"
import { signin } from "../../utils/util";

export default function SignIn () {
    const [isEmailFocused, setIsEmailFocused] = useState(false)
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    
    import("../../styles/sign_in.css");
    
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
            <div className="sm-box">
                    <div>Sign In</div>
                    <input className="sign-in-box" type="email" placeholder={!isEmailFocused ? `Email`: ""} onChange={(e) => setEmail(e.target.value)} onFocus={() => {setIsEmailFocused(true)}} onBlur={() => {setIsEmailFocused(false)}}/>
                    <input className="sign-in-box" type="password" placeholder={!isPasswordFocused ? `Password`: ""} onChange={(e) => setPassword(e.target.value)} onFocus={() => {setIsPasswordFocused(true)}} onBlur={() => {setIsPasswordFocused(false)}}/>
                    <button className="sign-up-button" onClick={handleSubmit}>Sign In</button>
            </div>
            <div className="modal-background"></div>
        </>
    )
}