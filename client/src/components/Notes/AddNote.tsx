import { useState } from "react"
import { addBookmark, createBookmark } from "../../utils/util";

interface Props {
    subject: boolean
    day: boolean
    note: boolean
}

export default function AddNote({ subject, day, note }: Props) {
    const [subjectFocused, setSubjectFocused] = useState(false)
    const [isFocused, setIsFocused] = useState(false)
    
    // const [bookmark, setBookmark] = useState("")
    // const [link, setLink] = useState("")

    import("../../styles/add_note.css");

    function handleSubmit(event: React.MouseEvent<HTMLFormElement, MouseEvent>) {
        // addBookmark(event, 2, bookmark, link)
    }

    function getTitle(): string {
        if (subject && day && note) return "Add Subject" 
        if (day && note) return "Add Day"
        if (note) return "Add Note"
        return ""
    }
    
    if (!subject && !day && note) {
        return (
                <>
                    <form onSubmit={handleSubmit} >
                        <div className="xsm-box">
                            <div>{getTitle()}</div>
                            <input 
                            className="text-box" 
                            type="text" 
                            name="note" 
                            placeholder={!isFocused ? `Note`: ""} 
                            // onChange={(e) => setLink(e.target.value)}
                            onFocus={() => {setIsFocused(true)}} 
                            onBlur={() => {setIsFocused(false)}} />
                            <button className="sign-up-button" type="submit">Add</button>
                        </div>
                        <div className="modal-background"></div>
                    </form>
            </>
        )
    }
    
    return (
        <>
            <form onSubmit={handleSubmit} >
                <div className="sm-box">
                    <div>{getTitle()}</div>
                    { subject && (
                        <input className="text-box" 
                        type="text" 
                        name="subject" 
                        placeholder={!subjectFocused ? `Subject Name`: ""} 
                        // onChange={(e) => setBookmark(e.target.value)}
                        onFocus={() => {setSubjectFocused(true)}} 
                        onBlur={() => {setSubjectFocused(false)}} 
                        autoComplete="off"/>
                    )}

                    { day && (
                        <input 
                        className="text-box" 
                        type="text" 
                        name="day" 
                        placeholder={!isFocused ? `Day`: ""} 
                        // onChange={(e) => setLink(e.target.value)}
                        onFocus={() => {setIsFocused(true)}} 
                        onBlur={() => {setIsFocused(false)}} 
                        maxLength={15}
                        autoComplete="off"/>
                    )}

                    { note && (
                        <input 
                        className="text-box" 
                        type="text" 
                        name="note" 
                        placeholder={!isFocused ? `Note`: ""} 
                        // onChange={(e) => setLink(e.target.value)}
                        onFocus={() => {setIsFocused(true)}} 
                        onBlur={() => {setIsFocused(false)}} />
                    )}
                    <button className="sign-up-button" type="submit">Add</button>
                </div>
                <div className="modal-background"></div>
            </form>
        </>
    )
}