import { useEffect, useRef, useState} from "react";
import EditPopup from "./EditPopup";
import AddNote from "./AddNote"
import WarningPopup from "./WarningPopup";
import Navbar from "../Navbar/Navbar";
import { deleteNotes } from "../../utils/util";
import "../../styles/notes.css";
import "../../styles/user_notes.css";

export default function UserNotes({ id, notes }: { id: number, notes: any }) {
    interface EditMode {
        truthy: boolean 
        subject: string | null 
        note: string | null
        current_subject: string
        current_day?: string
        current_note?: string
    } 

    interface AddMode {
        truthy: boolean
        subject: boolean
        day: boolean 
        note: boolean
        current_subject?: string
        current_day?: string
    }

    interface DeleteMode {
        subject: string
        day: string
        note: string
    }

    const [editMode, setEditMode] = useState<EditMode>({ truthy: false, subject: null, note: null, current_subject: "", current_day: "", current_note: "" })
    const [addMode, setAddMode] = useState<AddMode>({ truthy: false, subject: false, day: false, note: false })
    const [deleteMode, setDeleteMode] = useState<DeleteMode>({ subject: "", day: "", note: "" })

    const [deleteButtonClicked, setDeleteButtonClicked] = useState(false)
    const [deleteConfirmation, setDeleteConfirmation] = useState<boolean | null>(null)

    const [addPopUpfocus, setAddPopUpfocus] = useState<boolean>(false)
    const addPopUpRef = useRef<HTMLDivElement>(null)

    const [editPopUpfocus, setEditPopUpfocus] = useState<boolean>(false)
    const editPopUpRef = useRef<HTMLDivElement>(null)

    const [deletePopUpfocus, setDeletePopUpfocus] = useState<boolean>(false)
    const deletePopUpRef = useRef<HTMLDivElement>(null)


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
        document.addEventListener("mousedown", (event) => {
            const popUp: HTMLDivElement | null = editPopUpRef.current
            const target = event.target as Node
            if ((popUp?.contains(target))) {
                setEditPopUpfocus(true)
                return
            }
            setEditPopUpfocus(false)
        })
        document.addEventListener("mousedown", (event) => {
            const popUp: HTMLDivElement | null = deletePopUpRef.current
            const target = event.target as Node
            if ((popUp?.contains(target))) {
                setDeletePopUpfocus(true)
                return
            }
            setDeletePopUpfocus(false)
        })
    })

    return (
        <>
            <Navbar />
            { notes && Object.keys(notes).map((subject, i) => {
                return (
                    <>
                        <div>
                            <ul className="subject">{subject}</ul>
                            <button className="add" onClick={() => {                        
                                setAddMode({truthy: true, subject: false, day: true, note: true, current_subject: subject})
                                setAddPopUpfocus(true)
                            }}>ADD</button>
                            <button className="edit" onClick={() => {                        
                                setEditMode({truthy: true, subject: subject, note: null, current_subject: subject})
                                setEditPopUpfocus(true)
                            }}>EDIT</button>
                            <button className="delete" onClick={() => {  
                                if (!deleteButtonClicked) {
                                    setDeleteMode({ ...deleteMode, subject: subject})
                                }          
                                setDeletePopUpfocus(true)            
                                setDeleteButtonClicked(true)
                            }}>DELETE</button>
                        </div>
                        {
                            Object.keys(notes[subject]).map((day, k: number) => {
                                return (
                                    <>
                                        <div className="day">
                                            {day}
                                            <button className="sm add" onClick={() => {                        
                                                setAddMode({truthy: true, subject: false, day: false, note: true, current_subject: subject, current_day: day})
                                                setAddPopUpfocus(true)
                                            }}>ADD</button>
                                            <button className="sm delete" onClick={() => {   
                                                if (!deleteButtonClicked) {
                                                    setDeleteMode({ ...deleteMode, subject: subject, day: day})
                                                }                    
                                                setDeletePopUpfocus(true)
                                                setDeleteButtonClicked(true)
                                            }}>DELETE</button>
                                        </div>
                                        <ul>                                                    
                                            {
                                                notes[subject][day].map((note: any, j: number) => {
                                                    return (
                                                        <>
                                                            <div>
                                                            <li className="note">
                                                            {note}                                                
                                                            </li>
                                                            <button className="sm edit" onClick={() => {                        
                                                                setEditMode({truthy: true, subject: null, note: note, current_subject: subject, current_day: day, current_note: note})
                                                                setEditPopUpfocus(true)
                                                            }}>EDIT</button>
                                                            <button className="sm delete" onClick={() => {    
                                                                if (!deleteButtonClicked) {
                                                                    setDeleteMode({ subject: subject, day: day, note: note })
                                                                }
                                                                setDeletePopUpfocus(true)
                                                                setDeleteButtonClicked(true)
                                                            }}>DELETE</button>
                                                            </div>                                                                                                                     
                                                        </>
                                                    )      
                                                })
                                            }                                        
                                        </ul>
                                    </>
                                )
                            })
                        }
                    </>
                )
            })}
            <button className="add-note" onClick={() => { setAddMode({truthy: true, subject: true, day: true, note: true}); setAddPopUpfocus(true) }}>Add Subject</button>
            { addMode.truthy && addPopUpfocus && <AddNote notes={notes} id={id} popUpRef={addPopUpRef} subject={addMode.subject} day={addMode.day} note={addMode.note} current_subject={addMode?.current_subject} current_day={addMode?.current_day}/> }
            { editMode.truthy && editPopUpfocus && <EditPopup notes={notes} id={id} popUpRef={editPopUpRef} subject={editMode.subject} note={editMode.note} current_subject={editMode.current_subject} current_day={editMode?.current_day} current_note={editMode?.current_note}/> }
            { deleteButtonClicked && deletePopUpfocus && <WarningPopup popUpRef={deletePopUpRef} setButtonClicked={setDeleteButtonClicked} setDeleteConfirmation={setDeleteConfirmation}/> }
            { deleteConfirmation && deleteNotes(notes, id, deleteMode.subject, deleteMode.day, deleteMode.note)}
            { deleteButtonClicked && deleteConfirmation && setDeleteButtonClicked(false) }
            { !deleteButtonClicked && deleteConfirmation && setDeleteConfirmation(false)}
            { deleteConfirmation && window.location.reload() }
        </>
    )
}