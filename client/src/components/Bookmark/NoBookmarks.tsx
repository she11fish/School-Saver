import { useState } from "react"
import { Link } from "react-router-dom"
import Navbar from "../Navbar/navbar"
import Bookmark from "./AddBookmark"

export default function NotEnoughBookmarks() {
    
    const [addBookmarks, setAddBookmarks] = useState(false)
    
    import("../../styles/bookmarks.css")

    return (
        <>
            <Navbar />
            <div className="text">The page feels empty. Want to add more bookmarks?</div>
            <button className="add-bookmark" onClick={() => { setAddBookmarks(true) }}>Add Bookmark</button>
            { addBookmarks && <Bookmark /> }
        </>
    )
}