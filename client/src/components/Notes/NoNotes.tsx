import { useState } from "react"
import Navbar from "../Navbar/navbar"
import AddNote from "./AddNote"

export default function NotEnoughNotes() {
    
    interface AddMode {
        truthy: boolean
        subject: boolean
        day: boolean 
        note: boolean
    }

    const [addMode, setAddMode] = useState<AddMode>({truthy: false, subject: false, day: false, note: false})
    
    import("../../styles/bookmarks.css")

    return (
        <>
            <Navbar />
            <div className="text">The page feels empty. Want to add more notes?</div>
            <button className="add-bookmark" onClick={() => { setAddMode({truthy: true, subject: true, day: true, note: true}) }}>Add Note</button>
            { addMode.truthy && <AddNote subject={addMode.subject} day={addMode.day} note={addMode.note} /> }
        </>
    )
}