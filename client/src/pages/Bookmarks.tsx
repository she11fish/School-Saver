import { useState } from "react"
import { Link } from "react-router-dom"
import Bookmark from "../components/Bookmark/bookmark"

export default function Bookmarks() {
    const [addBookmarks, setAddBookmarks] = useState(false)

    import("../styles/bookmarks.css")
    return (
        <>
            <nav>
                <div className="nav-title">Home</div>
                <Link to="/notes"><div className="nav-title">Notes</div></Link>
                <div className="nav-title" onClick={() => { setAddBookmarks(true) }}>Bookmarks</div>
                <div className="nav-title">Sign in</div>
                <div className="nav-title">Sign up</div>
            </nav>
            <div className="line"></div>
            <div className="text">The page feels empty. Want to add more bookmarks?</div>
            <button className="bookmark">Add Bookmark</button>
            { addBookmarks && <Bookmark /> }
        </>
    )
}