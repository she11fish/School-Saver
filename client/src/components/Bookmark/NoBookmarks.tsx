import { useState } from "react"
import { Link } from "react-router-dom"
import Bookmark from "./AddBookmark"

export default function NotEnoughBookmarks() {
    
    const [addBookmarks, setAddBookmarks] = useState(false)
    
    import("../../styles/bookmarks.css")

    return (
        <>
        <nav>
            <div className="nav-title">Home</div>
            <Link to="/notes"><div className="nav-title">Notes</div></Link>
            <div className="nav-title">Bookmarks</div>
            <div className="nav-title">Sign in</div>
            <div className="nav-title">Sign up</div>
        </nav>
        <div className="line"></div>
        <div className="text">The page feels empty. Want to add more row?</div>
        <button className="bookmark" onClick={() => { setAddBookmarks(true) }}>Add Bookmark</button>
        { addBookmarks && <Bookmark /> }
        </>
    )
}