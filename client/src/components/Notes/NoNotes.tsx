import { useState } from "react"
import Navbar from "../Navbar/navbar"
import AddNote from "./AddNote"

export default function NotEnoughNotes() {
    
    const [addNotes, setAddNotes] = useState(false)
    
    import("../../styles/bookmarks.css")

    return (
        <>
            <Navbar />
            <div className="text">The page feels empty. Want to add more notes?</div>
            <button className="add-bookmark" onClick={() => { setAddNotes(true) }}>Add Note</button>
            { addNotes && <AddNote /> }
        </>
    )
}