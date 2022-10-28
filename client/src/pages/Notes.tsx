import { useState } from "react"
import Navbar from "../components/Navbar/navbar";
import NotEnoughNotes from "../components/Notes/NoNotes";
import UserNotes from "../components/Notes/UserNotes";

export default function Notes() {
    
    const [hasNotes, setHasNotes] = useState<boolean | null>(null)

    const id = 2;

    // useEffect(() => {
    //     (async () => {
    //         setHasNotes(await containsBookmarks(id))
    //     })()
    // })

    return (
        <>
            {/* { (hasNotes === false) ? <NotEnoughNotes /> : 
                (hasNotes === true) ? <UserNotes id={id} /> : null
            } */}
            {/* <NotEnoughNotes /> */}
            <UserNotes id={id}/>
        </>
    )
}