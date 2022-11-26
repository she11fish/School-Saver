import { useState } from "react"
import Navbar from "../Navbar/navbar"
import AddNote from "./AddNote"

export default function NotEnoughNotes({ id, notes }: { id : number, notes: any}) {
    
    interface AddMode {
        truthy: boolean
        subject: boolean
        day: boolean 
        note: boolean
    }

    const [addMode, setAddMode] = useState<AddMode>({truthy: false, subject: false, day: false, note: false})
    
    import("../../styles/notes.css")

    return (
        <>
            <Navbar />
            <div className="text">The page feels empty. Want to add more notes?</div>
            <button className="add-lg-note" onClick={() => { setAddMode({ truthy: true, subject: true, day: true, note: true }) }}>Add Note</button>
            { addMode.truthy && <AddNote notes={notes} id={id} subject={addMode.subject} day={addMode.day} note={addMode.note} current_subject={undefined} current_day={undefined} /> }
        </>
    )
}