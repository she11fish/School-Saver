import { useState } from "react"
import { updateUserNotes } from "../../utils/util";

interface Props {
    notes: any
    id: number
    subject: string | null
    note: string | null
    current_subject: string
    current_day: string | undefined
    current_note: string | undefined
}

export default function EditPopup({ notes, id, subject, note, current_subject, current_day, current_note }: Props) {
    import("../../styles/edit_popup.css");

    const [newNote, setNewNote] = useState<string | null>()
    const [newSubject, setNewSubject] = useState<string | null>()

    function handleSubmit(event: React.MouseEvent<HTMLFormElement, MouseEvent>) {
        event.preventDefault()
        console.log(current_day)
        if (!current_day && newSubject) {
            console.log(newSubject)
            const sub_notes = notes[current_subject]
            notes[newSubject] = sub_notes
            delete notes[current_subject]
        } else {
            if (current_note && current_day) {
                const index = notes[current_subject][current_day].indexOf(current_note)
                if (index != -1) {
                    notes[current_subject][current_day][index] = newNote
                }
            }
        }
        updateUserNotes(notes, id)
    }

    function onChange() {
        document.querySelectorAll(".text-note-box")[0].removeAttribute("value")
    }

    function onFocus(str: string) {
        document.querySelectorAll(".text-note-box")[0].setAttribute("value", str)
    }
    
    function onBlur(str: string) {
        document.querySelectorAll(".text-note-box")[0].setAttribute("value", str)
    }

    if (subject && subject !== "") {
        return (
            <>
                <form onSubmit={handleSubmit} >
                    <div className="xsm-box">
                        <div>Edit Subject</div>
                        <input className="text-note-box" 
                            type="text" 
                            name="subject" 
                            placeholder={subject ? subject : undefined} 
                            onChange={(e) => { onChange(); setNewSubject(e.target.value); console.log(e.target.value) }}
                            onFocus={() => onFocus(subject)} 
                            onBlur={() => onBlur(subject)} 
                            autoComplete="off"
                            maxLength={37}
                            required/>
                        <button className="sign-up-note-button" type="submit">Edit</button>
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
                            className="text-note-box" 
                            type="text" 
                            name="note" 
                            placeholder={note ? note : undefined}
                            onChange={(e) => { onChange(); setNewNote(e.target.value) }}
                            onFocus={() => onFocus(note)} 
                            onBlur={() => onBlur(note)} 
                            autoComplete="off"
                            maxLength={100}
                            required/>
                        <button className="sign-up-note-button" type="submit">Edit</button>
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