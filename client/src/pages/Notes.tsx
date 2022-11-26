import { useState, useEffect } from "react"
import Navbar from "../components/Navbar/navbar";
import NotEnoughNotes from "../components/Notes/NoNotes";
import UserNotes from "../components/Notes/UserNotes";
import { containsNotes, getUserNotes } from "../utils/util";

export default function Notes() {
    
    const [hasNotes, setHasNotes] = useState<boolean | null>(null)
    const [notes, setNotes] = useState<any>()

    const id = 1;

    useEffect(() => {
        (async () => {
            setHasNotes(await containsNotes(id))
            setNotes(await getUserNotes(id));
        })()
    }, [notes])

    return (
        <>
            { (hasNotes === false) ? <NotEnoughNotes id={id} notes={notes} /> : 
                (hasNotes === true) ? <UserNotes id={id} notes={notes} /> : null
            }
        </>
    )
}