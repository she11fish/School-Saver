import { useState } from "react";
import EditPopup from "./EditPopup";
import WarningPopup from "./WarningPopup";

export default function TempNote() {
    import("../../styles/notes.css");
    import("../../styles/user_notes.css");

    const [editButtonClicked, setEditButtonClicked] = useState(false)
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
                "Mission Success"
            ]
        }
    };

    return (
        
        <>
            {Object.keys(notes).map((subject, i) => {
                console.log(subject, i)
                return (
                    <>
                        <div>
                            <ul className="subject">{subject}</ul>
                            <button className="add" onClick={() => {                        
                                setEditButtonClicked(true)
                            }}>ADD</button>
                            <button className="edit" onClick={() => {                        
                                setEditButtonClicked(true)
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
                                                    setEditButtonClicked(true)
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
                                                                <button className="sm add" onClick={() => {                        
                                                                    setEditButtonClicked(true)
                                                                }}>ADD</button>
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
            {/* { editButtonClicked && <EditPopup subject={subject} day={day} note={note} /> } */}
            { deleteButtonClicked && <WarningPopup setButtonClicked={setDeleteButtonClicked} setDeleteConfirmation={setDeleteConfirmation}/> }
        </>
    )
}