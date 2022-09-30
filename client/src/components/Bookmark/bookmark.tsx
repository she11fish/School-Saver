import { useState } from "react"

export default function Bookmark () {
    const [isUsernameFocused, setIsUsernameFocused] = useState(false)
    const [isEmailFocused, setIsEmailFocused] = useState(false)
    
    import("../../styles/bookmark.css");
    
    return (
        <>
            <div className="sm-box">
                    <div>Bookmark</div>
                    <input className="text-box" type="text" placeholder={!isUsernameFocused ? `Name`: ""} onFocus={() => {setIsUsernameFocused(true)}} onBlur={() => {setIsUsernameFocused(false)}}/>
                    <input className="text-box" type="email" placeholder={!isEmailFocused ? `Link`: ""} onFocus={() => {setIsEmailFocused(true)}} onBlur={() => {setIsEmailFocused(false)}}/>
                    <button className="sign-up-button">Add Link</button>
            </div>
            <div className="modal-background"></div>
        </>
    )
}