import { useEffect, useState } from "react"
import { BookmarkRow } from "../../interfaces/interface"
import { getUserBookmarks } from "../../utils/util"
import Navbar from "../Navbar/navbar"
import TempNote from "./TempNote"

interface Props {
    id: number
}

export default function UserNotes({ id }: Props) {

    const [addBookmarks, setAddBookmarks] = useState(false)
    const [bookmarksData, setBookmarksData] = useState<BookmarkRow | undefined>()
    const [buttonClicked, setButtonClicked] = useState(false)
    const [deleteConfirmation, setDeleteConfirmation] = useState<boolean | null>(null)

    import("../../styles/notes.css");
    import("../../styles/user_notes.css");

    useEffect(() => {
        (async () => {
            setBookmarksData(await getUserBookmarks(id))
        })()
    }, [])

    return (
        <>
            <Navbar />
            <TempNote />
            {/* { bookmarksData && bookmarksData?.bookmarks.map((bookmark, i) => <>
                <div>
                    <ul>{bookmark}</ul>
                    <button className="delete" onClick={() => {                        
                        setButtonClicked(true)
                    }}>DELETE</button>
                </div>
                <li>
                    <a href={`https://${bookmarksData.links[i]}`}>{bookmarksData.links[i]}</a>
                </li>
                { deleteConfirmation && deleteBookmark(id, bookmarksData.bookmarks[i], bookmarksData.links[i])}</>)}
                { deleteConfirmation && window.location.reload() } 
            <button className="bookmark" onClick={() => { setAddBookmarks(true) }}>Add Bookmark</button>
            { addBookmarks && <AddNote /> }
            { buttonClicked && <WarningPopup setButtonClicked={setButtonClicked} setDeleteConfirmation={setDeleteConfirmation}/> } */}
        </>
    )
}