import { useState } from "react"
import { addBookmark, createBookmark } from "../../utils/util";

interface Props {
    subject: string | null
    note: string | null
}

export default function EditPopup({ subject, note }: Props) {
    const [inputFocused, setInputFocused] = useState(false)
    
    // const [bookmark, setBookmark] = useState("")
    // const [link, setLink] = useState("")

    import("../../styles/add_note.css");

    function handleSubmit(event: React.MouseEvent<HTMLFormElement, MouseEvent>) {
        // addBookmark(event, 2, bookmark, link)
    }

    function onChange() {
        document.querySelectorAll(".text-box")[0].removeAttribute("value")
    }

    function onFocus(str: string) {
        setInputFocused(true)
        document.querySelectorAll(".text-box")[0].setAttribute("value", str)
    }
    
    function onBlur(str: string) {
        document.querySelectorAll(".text-box")[0].setAttribute("value", str)
    }

    if (subject && subject !== "") {
        return (
            <>
                <form onSubmit={handleSubmit} >
                    <div className="xsm-box">
                        <div>Edit Subject</div>
                        <input className="text-box" 
                            type="text" 
                            name="subject" 
                            placeholder={subject ? subject : undefined} 
                            onChange={() => onChange()}
                            onFocus={() => onFocus(subject)} 
                            onBlur={() => onBlur(subject)} 
                            autoComplete="off"
                            maxLength={37}
                            required/>
                        <button className="sign-up-button" type="submit">Edit</button>
                    </div>
                    <div className="modal-background"></div>
                </form>
            </>
        ) 
    }
    if (note && note !== "") { 
        return (
            <>
                <form onSubmit={handleSubmit} >
                    <div className="xsm-box">
                        <div>Edit Note</div>
                        <input 
                            className="text-box" 
                            type="text" 
                            name="note" 
                            placeholder={note ? note : undefined}
                            onChange={() => onChange()}
                            onFocus={() => onFocus(note)} 
                            onBlur={() => onBlur(note)} 
                            autoComplete="off"
                            maxLength={100}
                            required/>
                        <button className="sign-up-button" type="submit">Edit</button>
                    </div>
                    <div className="modal-background"></div>
                </form>
            </>
        )
    }

    return (
        null
    )
}