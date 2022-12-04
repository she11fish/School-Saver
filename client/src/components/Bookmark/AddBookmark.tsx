import {  useState } from "react"
import { addBookmark } from "../../utils/util";
import validator from "validator"
import "../../styles/add_bookmark.css";

export default function Bookmark({ id, popUpRef }: { id: number, popUpRef: React.RefObject<HTMLDivElement> }) {
    const [isUsernameFocused, setIsUsernameFocused] = useState(false)
    const [isEmailFocused, setIsEmailFocused] = useState(false)
    
    const [bookmark, setBookmark] = useState("")
    const [link, setLink] = useState("")

    const [valid, setValid] = useState(true)
    const [message, setMessage] = useState("")

    const [validInput, setValidInput] = useState(false)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (!validInput) {
            setValid(false)
            setMessage("")
            return
        }
        setValid(true)
        setMessage("Creating Bookmark...")
        await addBookmark(id, bookmark, link)
        window.location.reload()
    }

    const valid_bookmark = /[a-zA-Z0-9]{4,}/.test(bookmark) && bookmark

    const valid_link = validator.isURL(link) && link

    const validateInput = () => Boolean(valid_bookmark && valid_link && bookmark && link)

    const feedback = (<div className="bookmark-feedback">{ !valid_bookmark ? 'Bookmark must have at least 4 alphanumeric characters' : !valid_link ? 'Must be a valid URL' :  message }</div>)

    return (
        <>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="add-sm-box" ref={popUpRef}>
                    <div className="bookmark-header">Bookmark</div>
                    <input className="text-box" 
                           type="text" 
                           name="bookmark"
                           ref={() => setValidInput(validateInput())} 
                           placeholder={!isUsernameFocused ? `Name`: ""} 
                           onChange={(e) => setBookmark(e.target.value)}
                           onFocus={() => {setIsUsernameFocused(true)}} 
                           onBlur={() => {setIsUsernameFocused(false)}} 
                           required
                           autoComplete="off"/>
                    <input 
                           className="text-box" 
                            type="url" 
                            name="link" 
                            ref={() => setValidInput(validateInput())} 
                            placeholder={!isEmailFocused ? `Link`: ""} 
                            onChange={(e) => setLink(e.target.value)}
                            onFocus={() => {setIsEmailFocused(true)}} 
                            onBlur={() => {setIsEmailFocused(false)}} 
                            required
                            autoComplete="off"/>
                    { (!valid || message)  && feedback }
                    <button className="sign-up-button" type="submit">Add</button>
                </div>
                <div className="modal-background"></div>
            </form>
        </>
    )
}