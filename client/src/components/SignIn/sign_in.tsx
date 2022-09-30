import { useState } from "react"

export default function SignIn () {
    const [isUsernameFocused, setIsUsernameFocused] = useState(false)
    const [isEmailFocused, setIsEmailFocused] = useState(false)
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    
    import("../../styles/sign_in.css");
    
    return (
        <>
            <div className="sm-box">
                    <div>Sign In</div>
                    <input className="text-box" type="text" placeholder={!isUsernameFocused ? `Username`: ""} onFocus={() => {setIsUsernameFocused(true)}} onBlur={() => {setIsUsernameFocused(false)}}/>
                    <input className="text-box" type="email" placeholder={!isEmailFocused ? `Email`: ""} onFocus={() => {setIsEmailFocused(true)}} onBlur={() => {setIsEmailFocused(false)}}/>
                    <input className="text-box" type="password" placeholder={!isPasswordFocused ? `Password`: ""} onFocus={() => {setIsPasswordFocused(true)}} onBlur={() => {setIsPasswordFocused(false)}}/>
                    <button className="sign-up-button">Sign In</button>
            </div>
            <div className="modal-background"></div>
        </>
    )
}