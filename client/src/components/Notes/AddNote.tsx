import { useState } from "react"
import { addBookmark, createBookmark } from "../../utils/util";

export default function Note() {
    const [subjectFocused, setSubjectFocused] = useState(false)
    const [isEmailFocused, setIsEmailFocused] = useState(false)
    
    const [bookmark, setBookmark] = useState("")
    const [link, setLink] = useState("")

    import("../../styles/add_note.css");

    function handleSubmit(event: React.MouseEvent<HTMLFormElement, MouseEvent>) {
        addBookmark(event, 2, bookmark, link)
    }

    return (
        <>
            <form onSubmit={handleSubmit} >
                <div className="sm-box">
                    <div>Note</div>
                    <input className="text-box" 
                        type="text" 
                        name="subject" 
                        placeholder={!subjectFocused ? `Subject Name`: ""} 
                        onChange={(e) => setBookmark(e.target.value)}
                        onFocus={() => {setSubjectFocused(true)}} 
                        onBlur={() => {setSubjectFocused(false)}} 
                        autoComplete="off"/>
                    <input 
                        className="text-box" 
                        type="text" 
                        name="day" 
                        placeholder={!isEmailFocused ? `Day`: ""} 
                        onChange={(e) => setLink(e.target.value)}
                        onFocus={() => {setIsEmailFocused(true)}} 
                        onBlur={() => {setIsEmailFocused(false)}} 
                            autoComplete="off"/>
                    <input 
                        className="text-box" 
                        type="text" 
                        name="note" 
                        placeholder={!isEmailFocused ? `Note`: ""} 
                        onChange={(e) => setLink(e.target.value)}
                        onFocus={() => {setIsEmailFocused(true)}} 
                        onBlur={() => {setIsEmailFocused(false)}} />
                    <button className="sign-up-button" type="submit">Add</button>
                </div>
                <div className="modal-background"></div>
            </form>
        </>
    )
}