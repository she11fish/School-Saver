import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { BookmarkRow } from "../../interfaces/interface"
import { deleteBookmark, getUserBookmarks } from "../../utils/util"
import Navbar from "../Navbar/navbar"
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

    const [signUpClicked, setSignUpClicked] = useState(false)
    const [signInClicked, setSignInClicked] = useState(false)

    return (
        <>
            <Navbar />
            { bookmarksData && bookmarksData?.bookmarks.map((bookmark, i) => <>
                <div>
                    <ul className="bookmark-name">{bookmark}</ul>
                    <button className="delete-button" onClick={() => {                        
                        setButtonClicked(true)
                    }}>DELETE</button>
                </div>
                <li>
                    <a href={`https://${bookmarksData.links[i]}`}>{bookmarksData.links[i]}</a>
                </li>
                { deleteConfirmation && deleteBookmark(id, bookmarksData.bookmarks[i], bookmarksData.links[i])}</>)}
                { deleteConfirmation && window.location.reload() } 
            <button className="add-bookmark" onClick={() => { setAddBookmarks(true) }}>Add Bookmark</button>
            { addBookmarks && <AddBookmark /> }
            { buttonClicked && <WarningPopup setButtonClicked={setButtonClicked} setDeleteConfirmation={setDeleteConfirmation}/> }
        </>
    )
}