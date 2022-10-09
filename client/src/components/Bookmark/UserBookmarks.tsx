import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { BookmarkRow } from "../../interfaces/interface"
import { deleteBookmark, getUserBookmarks } from "../../utils/util"
import AddBookmark from "./AddBookmark"
import WarningPopup from "./WarningPopup"

interface Props {
    id: number
}

export default function UserBookmarks({ id }: Props) {

    const [addBookmarks, setAddBookmarks] = useState(false)
    const [bookmarksData, setBookmarksData] = useState<BookmarkRow | undefined>()
    const [buttonClicked, setButtonClicked] = useState(false)
    const [deleteConfirmation, setDeleteConfirmation] = useState<boolean | null>(null)

    import("../../styles/bookmarks.css");
    import("../../styles/user_bookmarks.css");

    useEffect(() => {
        (async () => {
            setBookmarksData(await getUserBookmarks(id))
        })()
    }, [])
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
            { bookmarksData && bookmarksData?.bookmarks.map((bookmark, i) => <>
                <div>
                    <ul>{bookmark}</ul>
                    <button className="delete" onClick={() => {                        
                        setButtonClicked(true)
                    }}>DELETE</button>
                </div>
                <li>
                    <a href={`https://${bookmarksData.links[i]}`}>{bookmarksData.links[i]}</a>
                </li>
                { deleteConfirmation && deleteBookmark(2, bookmarksData.bookmarks[i], bookmarksData.links[i])}</>)}
                { deleteConfirmation && window.location.reload() } 
            <button className="bookmark" onClick={() => { setAddBookmarks(true) }}>Add Bookmark</button>
            { addBookmarks && <AddBookmark /> }
            { buttonClicked && <WarningPopup setButtonClicked={setButtonClicked} setDeleteConfirmation={setDeleteConfirmation}/> }
        </>
    )
}