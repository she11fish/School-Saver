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

    async function handleSubmit(event: React.MouseEvent<HTMLFormElement, MouseEvent>) {
        event.preventDefault()
        if (notes) {
            if (newSubject && newDay && newNote) {
                let day_object: any = {}
                day_object[newDay] = [newNote]
                notes[newSubject] = day_object 
                updateUserNotes(notes, id)
            } else if (newDay && newNote && current_subject) {
                notes[current_subject][newDay] = [newNote]
                updateUserNotes(notes, id)
            }
        } else {
            if (newSubject && newDay && newNote) {
                console.log("here")
                createUserNotes(id, newSubject, newDay, newNote)
            }
        }
    }

    async function handleNoteSubmit(event: React.MouseEvent<HTMLFormElement, MouseEvent>) {
        event.preventDefault()
        if (notes) {
            if (current_subject && current_day) {
                if (newNote) {
                    notes[current_subject][current_day].push(newNote)
                    updateUserNotes(notes, id)
                }
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
                            <div>{getTitle()}</div>
                            <input 
                            className="text-note-box" 
                            type="text" 
                            name="note" 
                            placeholder={!isFocused ? `Note`: ""} 
                            onChange={(e) => setNewNote(e.target.value)}
                            onFocus={() => {setIsFocused(true)}} 
                            onBlur={() => {setIsFocused(false)}} 
                            autoComplete="off" />
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
                    <div>{getTitle()}</div>
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
                        maxLength={15}
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
                    <button className="sign-up-note-button" type="submit">Add</button>
                </div>
                <div className="modal-background"></div>
            </form>
        </>
    )
}