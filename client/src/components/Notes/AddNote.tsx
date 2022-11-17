import { useState } from "react"
import { addBookmark, createBookmark } from "../../utils/util";

interface Props {
    subject: boolean
    day: boolean
    note: boolean
    current_subject: string | undefined
    current_day: string | undefined
}

export default function AddNote({ subject, day, note, current_subject, current_day }: Props) {
    const [subjectFocused, setSubjectFocused] = useState(false)
    const [isFocused, setIsFocused] = useState(false)
    
    const [newNote, setNewNote] = useState<string | null>()
    const [newDay, setNewDay] = useState<string | null>()
    const [newSubject, setNewSubject] = useState<string | null>()


    // const [bookmark, setBookmark] = useState("")
    // const [link, setLink] = useState("")

    import("../../styles/add_note.css");

    function handleSubmit(event: React.MouseEvent<HTMLFormElement, MouseEvent>) {
        // addBookmark(event, 2, bookmark, link)
        event.preventDefault()
        console.log(newNote, newDay ? newDay : current_day, newSubject ? newSubject : current_subject)
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
                            onChange={(e) => setNewNote(e.target.value)}
                            onFocus={() => {setIsFocused(true)}} 
                            onBlur={() => {setIsFocused(false)}} 
                            autoComplete="off" />
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
                        onChange={(e) => setNewSubject(e.target.value)}
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
                        onChange={(e) => setNewDay(e.target.value)}
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
                        onChange={(e) => setNewNote(e.target.value)}
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