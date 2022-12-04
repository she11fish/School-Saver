import { useState } from "react"
import { createUserNotes, updateUserNotes } from "../../utils/util";
import "../../styles/add_note.css";

interface Props {
    notes: any
    id: number   
    popUpRef: React.RefObject<HTMLDivElement> 
    subject: boolean
    day: boolean
    note: boolean
    current_subject: string | undefined
    current_day: string | undefined
}

export default function AddNote({ notes, id, popUpRef, subject, day, note, current_subject, current_day }: Props) {
    const [subjectFocused, setSubjectFocused] = useState(false)
    const [isFocused, setIsFocused] = useState(false)
    
    const [newNote, setNewNote] = useState<string>("")
    const [newDay, setNewDay] = useState<string>("")
    const [newSubject, setNewSubject] = useState<string>("")

    const [message, setMessage] = useState("")

    const feedback = (<div className="note-feedback">{ message }</div>)

    const valid_subject = validateSubject()
    const valid_day = validateDay()
    const valid_note = validateNote()

    function validateSubject() {
        return /[a-zA-Z0-9 \.-_]{4,37}/.test(newSubject)
    }

    function validateDay() {
        return ("Monday" ===  newDay || "Mon" ===  newDay
                || "Tuesday" === newDay ||  "Tue" ===  newDay || "Tues" === newDay
                || "Wednesday" === newDay || "Wed" === newDay
                || "Thursday" === newDay ||   "Thu" === newDay || "Thur" === newDay || "Thrus" === newDay
                || "Friday" === newDay || "Fri" === newDay 
                || "Saturday" === newDay || "Sat" === newDay  
                || "Sunday" === newDay || "Sun" == newDay)
    }

    function validateNote() {
        return /[a-zA-Z0-9 \._]{4,100}/.test(newNote)
    }

    async function handleSubmit(event: React.MouseEvent<HTMLFormElement, MouseEvent>) {
        event.preventDefault()
        if (notes) {
            if (newSubject && newDay && newNote) {
                if (valid_subject && valid_day && valid_note) {
                    let day_object: any = {}
                    day_object[newDay] = [newNote]
                    notes[newSubject] = day_object
                    setMessage("Adding Note...")
                    updateUserNotes(notes, id)
                    window.location.reload()
                    return
                }
                setMessage("Must be a valid subject, day, and note")
            } else if (newDay && newNote && current_subject) {
                if (valid_day && valid_note) {
                    notes[current_subject][newDay] = [newNote]
                    setMessage("Adding Day...")
                    updateUserNotes(notes, id)
                    window.location.reload()
                    return
                }
                setMessage("Must be a valid day and note")
            }
        } else {
            if (newSubject && newDay && newNote) {
                if (valid_subject && valid_day && valid_note) {
                    setMessage("Creating Note...")
                    createUserNotes(id, newSubject, newDay, newNote)
                    window.location.reload()
                    return
                }
                setMessage("Must be a valid subject, day, and note")
            }
        }
    }

    async function handleNoteSubmit(event: React.MouseEvent<HTMLFormElement, MouseEvent>) {
        event.preventDefault()
        if (notes) {
            if (current_subject && current_day) {
                if (newNote && valid_note) {
                    notes[current_subject][current_day].push(newNote)
                    setMessage("Adding Note...")
                    updateUserNotes(notes, id)
                    window.location.reload()
                    return
                }
                setMessage("Must be a valid note")
            }
        }
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
                    <form onSubmit={handleNoteSubmit} >
                        <div className="xsm-box" ref={popUpRef}>
                            <div className="note-title">{getTitle()}</div>
                            <input 
                            className="text-note-box" 
                            type="text" 
                            name="note" 
                            placeholder={!isFocused ? `Note`: ""} 
                            onChange={(e) => setNewNote(e.target.value)}
                            onFocus={() => {setIsFocused(true)}} 
                            onBlur={() => {setIsFocused(false)}} 
                            autoComplete="off" />
                            { message && feedback }
                            <button className="sign-up-note-button" type="submit">Add</button>
                        </div>
                        <div className="modal-background"></div>
                    </form>
            </>
        )
    }
    
    return (
        <>
            <form onSubmit={handleSubmit} >
                <div className="sm-note-box" ref={popUpRef}>
                    <div className="note-title">{getTitle()}</div>
                    { subject && (
                        <input className="text-note-box" 
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
                        className="text-note-box" 
                        type="text" 
                        name="day" 
                        placeholder={!isFocused ? `Day`: ""} 
                        onChange={(e) => setNewDay(e.target.value)}
                        onFocus={() => {setIsFocused(true)}} 
                        onBlur={() => {setIsFocused(false)}} 
                        autoComplete="off"/>
                    )}

                    { note && (
                        <input 
                        className="text-note-box" 
                        type="text" 
                        name="note" 
                        placeholder={!isFocused ? `Note`: ""} 
                        onChange={(e) => setNewNote(e.target.value)}
                        onFocus={() => {setIsFocused(true)}} 
                        onBlur={() => {setIsFocused(false)}} 
                        autoComplete="off"  />
                    )}
                    { message && feedback }
                    <button className="sign-up-note-button" type="submit">Add</button>
                </div>
                <div className="modal-background"></div>
            </form>
        </>
    )
}