import { useState } from "react";
import EditPopup from "./EditPopup";
import AddNote from "./AddNote"
import WarningPopup from "./WarningPopup";
import Navbar from "../Navbar/navbar";

export default function UserNotes({ id }: { id: number }) {
    import("../../styles/notes.css");
    import("../../styles/user_notes.css");

    interface EditMode {
        truthy: boolean 
        subject: null | string 
        note: null | string
    } 

    interface AddMode {
        truthy: boolean
        subject: boolean
        day: boolean 
        note: boolean
    }

    const [editMode, setEditMode] = useState<EditMode>({truthy: false, subject: null, note: null})
    const [addMode, setAddMode] = useState<AddMode>({truthy: false, subject: false, day: false, note: false})

    const [deleteButtonClicked, setDeleteButtonClicked] = useState(false)
    const [deleteConfirmation, setDeleteConfirmation] = useState<boolean | null>(null)

    const notes: any = {
        English: {
            Monday: [
                "Act 1 quiz",
                "Wohooo"
            ],
            "Tuesday":
            [
                "unlimited notes"
            ]
        },
        "Computer Engineering": {
            Wednesday: [
                "Mission Success",
                "Missionsadfadsfdsafdsafsadfdsaklfjadslk;fjdsal;kjfdsaljdsl;kfjdsal;jfdsal;k"
            ]
        }
    };

    return (
        <>
            <Navbar />
            { Object.keys(notes).map((subject, i) => {
                console.log(subject, i)
                return (
                    <>
                        <div>
                            <ul className="subject">{subject}</ul>
                            <button className="add" onClick={() => {                        
                                setAddMode({truthy: true, subject: false, day: true, note: true})
                            }}>ADD</button>
                            <button className="edit" onClick={() => {                        
                                setEditMode({truthy: true, subject: subject, note: null} as EditMode)
                            }}>EDIT</button>
                            <button className="delete" onClick={() => {                        
                                setDeleteButtonClicked(true)
                            }}>DELETE</button>
                        </div>  
                            {
                                Object.keys(notes[subject]).map((day, i) => {
                                    return (
                                        <>
                                            <div className="day">
                                                {day}
                                                <button className="sm add" onClick={() => {                        
                                                    setAddMode({truthy: true, subject: false, day: false, note: true})
                                                }}>ADD</button>
                                                <button className="sm delete" onClick={() => {                        
                                                    setDeleteButtonClicked(true)
                                                }}>DELETE</button>
                                            </div>
                                            <ul >                                                    
                                                {
                                                    notes[subject][day].map((note: any, i: any) => {
                                                        return (
                                                            <li className="note">
                                                                {note}
                                                                <button className="sm edit" onClick={() => {                        
                                                                    setEditMode({truthy: true, subject: null, note: note} as EditMode)
                                                                }}>EDIT</button>
                                                                <button className="sm delete" onClick={() => {                        
                                                                    setDeleteButtonClicked(true)
                                                                }}>DELETE</button>
                                                            </li>
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
            <button className="add-note" onClick={() => { setAddMode({truthy: true, subject: true, day: true, note: true}) }}>Add Subject</button>
            { addMode.truthy && <AddNote subject={addMode.subject} day={addMode.day} note={addMode.note}/> }
            { editMode.truthy && <EditPopup subject={editMode.subject} note={editMode.note} /> }
            { deleteButtonClicked && <WarningPopup setButtonClicked={setDeleteButtonClicked} setDeleteConfirmation={setDeleteConfirmation}/> }
        </>
    )
}