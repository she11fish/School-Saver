import { useState, useEffect } from "react"
import NoBookmarks from "../components/Bookmark/NoBookmarks";
import UserBookmarks from "../components/Bookmark/UserBookmarks";
import { containsBookmarks } from "../utils/util"

export default function Bookmarks() {
    
    const [hasBookmarks, setHasBookmarks] = useState<boolean | null>(null)

    const id = 2;

    useEffect(() => {
        (async () => {
            setHasBookmarks(await containsBookmarks(id))
        })()
    }, [])

    return (
        (hasBookmarks === false) ? <NoBookmarks /> : 
            (hasBookmarks === true) ? <UserBookmarks id={id} /> : null
    )
}