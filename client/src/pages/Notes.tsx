import { onAuthStateChanged } from "@firebase/auth";
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import NotEnoughNotes from "../components/Notes/NoNotes";
import UserNotes from "../components/Notes/UserNotes";
import { auth } from "../firebase-config";
import { containsNotes, getUserId, getUserNotes } from "../utils/util";

export default function Notes() {
    
    const [hasNotes, setHasNotes] = useState<boolean | null>(null)
    const [notes, setNotes] = useState<any>()
    const [id, setId] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate()

    async function initialize() {
        if (id === 0 || id && loading) {
            setHasNotes(await containsNotes(id))
            setNotes(await getUserNotes(id));
            setLoading(false);
        }
    }
    
    initialize()

    useEffect(() => {
        (async () => {
            onAuthStateChanged(auth, (user) => {
                console.log("happens?")
                if (user) {
                    console.log("ok, this is definitly happening")
                    console.log(user.uid)
                    setId(getUserId(user.uid))
                } else {
                    navigate('/')
                }
            })
        })()
    }, [notes])

    return (
        <>
            { 
                (hasNotes === false) && (id === 0 || id) ? <NotEnoughNotes id={id} notes={notes} /> : 
                (hasNotes === true) && (id === 0 || id) ? <UserNotes id={id} notes={notes} /> : null
            }
        </>
    )
}