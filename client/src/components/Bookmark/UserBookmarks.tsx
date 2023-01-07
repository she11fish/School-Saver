import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { BookmarkRow } from "../../interfaces/interface"
import { deleteBookmark, getUserBookmarks } from "../../utils/util"
import Navbar from "../Navbar/NavBar"
import AddBookmark from "./AddBookmark"
import WarningPopup from "./WarningPopup"
import "../../styles/bookmarks.css";
import "../../styles/user_bookmarks.css";

interface Props {
    id: number
}

export default function UserBookmarks({ id }: Props) {

    const [addBookmarks, setAddBookmarks] = useState(false)
    const [bookmarksData, setBookmarksData] = useState<BookmarkRow | undefined>()
    const [buttonClicked, setButtonClicked] = useState(false)
    const [deleteConfirmation, setDeleteConfirmation] = useState<boolean | null>(null)
    const [bookmark, setBookmark] = useState<string>("")
    const [link, setLink] = useState<string>("")

    const [deletePopUpfocus, setDeletePopUpfocus] = useState<boolean>(false)
    const deletePopUpRef = useRef<HTMLDivElement>(null)
    const [addPopUpfocus, setAddPopUpfocus] = useState<boolean>(false)
    const addPopUpRef = useRef<HTMLDivElement>(null)

    console.log(deletePopUpfocus)

    useEffect(() => {
        (async () => {
            setBookmarksData(await getUserBookmarks(id))
        })()

    }, [])

    useEffect(() => {
        document.addEventListener("mousedown", (event) => {
            const popUp: HTMLDivElement | null = deletePopUpRef.current
            const target = event.target as Node
            if ((popUp?.contains(target))) {
                setDeletePopUpfocus(true)
                return
            }
            setDeletePopUpfocus(false)
        })
        document.addEventListener("mousedown", (event) => {
            const popUp: HTMLDivElement | null = addPopUpRef.current
            const target = event.target as Node
            if ((popUp?.contains(target))) {
                setAddPopUpfocus(true)
                return
            }
            setAddPopUpfocus(false)
        })
    }, [])

    return (
        <>
            <Navbar />
            { bookmarksData && bookmarksData?.bookmarks.map((bookmark, i) => 
                    <>
                        <div>
                            <ul className="bookmark-name">{bookmark}</ul>
                            <button className="delete-button" onClick={() => {   
                                if (!buttonClicked) {
                                    setBookmark(bookmarksData.bookmarks[i])
                                    setLink(bookmarksData.links[i])
                                }   
                                setDeletePopUpfocus(true)                  
                                setButtonClicked(true)
                            }}>DELETE</button>
                        </div>
                        <ul className="link-container">
                            <li>
                                <a className="test" href={`${bookmarksData.links[i]}`}>{bookmarksData.links[i]}</a>
                            </li>
                        </ul>

                    </>
                )
            }
            <button className="add-bookmark" onClick={() => { setAddBookmarks(true); setAddPopUpfocus(true) }}>Add Bookmark</button>
            { addBookmarks &&  addPopUpfocus && <AddBookmark id={id} popUpRef={addPopUpRef}/> }
            { buttonClicked && deletePopUpfocus && <WarningPopup popUpRef={deletePopUpRef} setButtonClicked={setButtonClicked} setDeleteConfirmation={setDeleteConfirmation} /> }
            { deleteConfirmation && (bookmark && link) && deleteBookmark(id, bookmark, link) }
            { buttonClicked && deleteConfirmation && setButtonClicked(false) }
            { !buttonClicked && deleteConfirmation && setDeleteConfirmation(false)}
            { deleteConfirmation && window.location.reload() }
        </>
    )
}