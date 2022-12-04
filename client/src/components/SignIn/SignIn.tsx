import { useEffect, useRef, useState } from "react"
import { errorHandler, signin } from "../../utils/util";
import "../../styles/sign_in.css";

export default function SignIn ({ popUpRef }: { popUpRef: React.RefObject<HTMLDivElement>}) {
    const [isEmailFocused, setIsEmailFocused] = useState(false)
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [valid, setValid] = useState(true)
    const [message, setMessage] = useState("")

    const valid_email = /[a-zA-Z0-9@\._]{8,}/.test(email) 
    const valid_password = /[a-zA-Z0-9@\._]{8,}/.test(password)
    
    const valid_input = valid_email && valid_password && email && password

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (!valid_input) {
            setValid(false)
            setMessage("")
            return
        }
        setValid(true)
        const response = await signin(email, password)
        
        if (!(response === true)) {
            setMessage(errorHandler(response))
            return
        }
        
        setMessage("Signing in...")
        window.location.reload();
    }

    const feedback = (<div className="feedback">{ !valid ? 'Incorrect Username or Password' : message }</div>)
    
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="sm-box" ref={popUpRef}>
                    <div>Sign In</div>
                    <input 
                        className="sign-in-box" 
                        type="email" 
                        ref={ (c) => { c?.setAttribute("style", valid_input ? "border-color: green" : "border-color: red;") } }
                        placeholder={!isEmailFocused ? `Email`: ""} 
                        onChange={(e) => setEmail(e.target.value)} 
                        onFocus={() => {setIsEmailFocused(true)}} 
                        onBlur={() => {setIsEmailFocused(false)}} 
                        autoComplete="off"/>
                    <input 
                        className="sign-in-box" 
                        type="password" 
                        ref={ (c) => { c?.setAttribute("style", valid_input ? "border-color: green" : "border-color: red;") } }
                        placeholder={!isPasswordFocused ? `Password`: ""} 
                        onChange={(e) => setPassword(e.target.value)} 
                        onFocus={() => {setIsPasswordFocused(true)}} 
                        onBlur={() => {setIsPasswordFocused(false)}}
                        autoComplete="off"/>
                    { (!valid || message) && feedback }
                    <button className="sign-up-button" type="submit">Sign In</button>
            </div>
            <div className="modal-background"></div>
            </form>

        </>
    )
}