import { useState, useEffect } from "react"
import NoBookmarks from "../components/Bookmark/NoBookmarks";
import UserBookmarks from "../components/Bookmark/UserBookmarks";
import { containsBookmarks, getUserBookmarks, getUserId } from "../utils/util"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";

export default function Bookmarks() {
    
    const [hasBookmarks, setHasBookmarks] = useState<boolean | null>(null)
    const [bookmarks, setBookmarks] = useState<any>()
    const [id, setId] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate()

    async function initialize() {
        if (id === 0 || id && loading) {
            setHasBookmarks(await containsBookmarks(id))
            setBookmarks(getUserBookmarks(id))
            setLoading(false)
        }
    }

    initialize()

    useEffect(() => {
        (async () => {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setId(getUserId(user.uid))
                } else {
                    navigate('/')
                }
            })
        })()
    }, [bookmarks])

    return (
        <>
            { 
                (hasBookmarks === false) && (id === 0 || id) ? <NoBookmarks id={id} /> : 
                (hasBookmarks === true) && (id === 0 || id) ? <UserBookmarks id={id} /> : null
            }
        </>
    )
}