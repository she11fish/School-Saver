import { useEffect, useRef, useState } from "react"
import Navbar from "../Navbar/NavBar"
import AddNote from "./AddNote"
import "../../styles/notes.css"

export default function NotEnoughNotes({ id, notes }: { id : number, notes: any}) {
    
    interface AddMode {
        truthy: boolean
        subject: boolean
        day: boolean 
        note: boolean
    }

    const [addMode, setAddMode] = useState<AddMode>({truthy: false, subject: false, day: false, note: false})

    const [addPopUpfocus, setAddPopUpfocus] = useState<boolean>(false)
    const addPopUpRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        document.addEventListener("mousedown", (event) => {
            const popUp: HTMLDivElement | null = addPopUpRef.current
            const target = event.target as Node
            if ((popUp?.contains(target))) {
                setAddPopUpfocus(true)
                return
            }
            setAddPopUpfocus(false)
        })
    })


    return (
        <>
            <Navbar />
            <div className="md-text">The page feels empty. Want to add more notes?</div>
            <button className="add-lg-note" onClick={() => { setAddMode({ truthy: true, subject: true, day: true, note: true }); setAddPopUpfocus(true) }}>Add Note</button>
            { addMode.truthy && addPopUpfocus && <AddNote notes={notes} id={id} popUpRef={addPopUpRef} subject={addMode.subject} day={addMode.day} note={addMode.note} current_subject={undefined} current_day={undefined} /> }
        </>
    )
}