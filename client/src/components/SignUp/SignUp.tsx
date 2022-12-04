import { useState } from "react"
import { errorHandler, signup } from "../../utils/util";
import validator from "validator"
import "../../styles/sign_up.css";

export default function SignUp ({ popUpRef }: { popUpRef: React.RefObject<HTMLDivElement>}) {
    const [isEmailFocused, setIsEmailFocused] = useState(false)
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const [valid, setValid] = useState(true)
    const [message, setMessage] = useState("")
    
    const valid_email = validator.isEmail(email)
    const valid_password = validator.isStrongPassword(password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1})

    const [validInput, setValidInput] = useState(false)

    const validateInput = () => Boolean(valid_email && valid_password && email && password)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (!validInput) {
            setValid(false)
            setMessage("")
            return
        }
        setValid(true)
        const response = await signup(email, password)

        if (!(response === true)) {
            setMessage(errorHandler(response))
            return
        }

        setMessage("Creating account...")
        window.location.reload();
    }

    const feedback = (<div className="feedback">{ !valid_email ? 'Must be a valid email' : !valid_password ? 'Password must be at least 8 characters with symbols':  message }</div>)

    return (
        <>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="sm-box" ref={popUpRef}>
                    <div>Sign Up</div>
                    <input 
                        className="sign-up-box" 
                        type="email" 
                        ref={ (c) => { setValidInput(validateInput()); c?.setAttribute("style", validInput ? "border-color: green" : "border-color: red;") } }
                        placeholder={!isEmailFocused ? `Email`: ""} 
                        onChange={(e) => setEmail(e.target.value)} 
                        onFocus={() => {setIsEmailFocused(true)}} 
                        onBlur={() => {setIsEmailFocused(false)}}
                        autoComplete="off"/>
                    <input 
                        className="sign-up-box" 
                        type="password" 
                        ref={ (c) => { setValidInput(validateInput()); c?.setAttribute("style", validInput ? "border-color: green" : "border-color: red;") } }
                        placeholder={!isPasswordFocused ? `Password`: ""} 
                        onChange={(e) => setPassword(e.target.value)} 
                        onFocus={() => {setIsPasswordFocused(true)}} 
                        onBlur={() => {setIsPasswordFocused(false)}}
                        autoComplete="off"/>
                    { (!valid || message)  && feedback }
                    <button className="sign-up-button" type="submit">Sign Up</button>
                </div>
            </form>
            <div className="modal-background"></div>
        </>
    )
}