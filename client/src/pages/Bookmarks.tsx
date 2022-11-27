import { useState, useEffect } from "react"
import NoBookmarks from "../components/Bookmark/NoBookmarks";
import UserBookmarks from "../components/Bookmark/UserBookmarks";
import { containsBookmarks, getUserId } from "../utils/util"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase-config";
import { Navigate } from "react-router-dom";

export default function Bookmarks() {
    
    const [hasBookmarks, setHasBookmarks] = useState<boolean | null>(null)
    const [id, setId] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    async function initialize() {
        if (id === 0 || id && loading) {
            setHasBookmarks(await containsBookmarks(id))
            setLoading(false)
        }
    }

    initialize()

    useEffect(() => {
        (async () => {
            
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setId(getUserId(user.uid))
                }
            })
        })()
    }, [])

    return (
        (hasBookmarks === false) ? <NoBookmarks /> : 
            (hasBookmarks === true) && (id === 0 || id) ? <UserBookmarks id={id} /> : null
    )
}