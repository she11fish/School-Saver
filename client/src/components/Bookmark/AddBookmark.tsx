import {  useState } from "react"
import { addBookmark, createBookmark } from "../../utils/util";

export default function Bookmark () {
    const [isUsernameFocused, setIsUsernameFocused] = useState(false)
    const [isEmailFocused, setIsEmailFocused] = useState(false)
    
    const [bookmark, setBookmark] = useState("")
    const [link, setLink] = useState("")

    import("../../styles/add_bookmark.css");

    function handleSubmit(event: React.MouseEvent<HTMLFormElement, MouseEvent>) {
        addBookmark(event, 2, bookmark, link)
    }

    return (
        <>
            <form onSubmit={handleSubmit} >
                <div className="sm-box">
                    <div>Bookmark</div>
                    <input className="text-box" 
                           type="text" 
                           name="bookmark" 
                           placeholder={!isUsernameFocused ? `Name`: ""} 
                           onChange={(e) => setBookmark(e.target.value)}
                           onFocus={() => {setIsUsernameFocused(true)}} 
                           onBlur={() => {setIsUsernameFocused(false)}} 
                           autoComplete="off"/>
                    <input 
                           className="text-box" 
                            type="text" 
                            name="link" 
                            placeholder={!isEmailFocused ? `Link`: ""} 
                            onChange={(e) => setLink(e.target.value)}
                            onFocus={() => {setIsEmailFocused(true)}} 
                            onBlur={() => {setIsEmailFocused(false)}} 
                            autoComplete="off"/>
                    <button className="sign-up-button" type="submit">Add</button>
                </div>
                <div className="modal-background"></div>
            </form>
        </>
    )
}