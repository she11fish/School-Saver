import { useEffect, useRef, useState } from "react"
import Navbar from "../Navbar/NavBar"
import Bookmark from "./AddBookmark"
import "../../styles/bookmarks.css"

export default function NotEnoughBookmarks({ id }: { id: number }) {
    
    const [addBookmarks, setAddBookmarks] = useState(false)
    const [addPopUpfocus, setAddPopUpfocus] = useState<boolean>(false)
    const addPopUpRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        document.addEventListener("mousedown", (event) => {
            const popUp: HTMLDivElement | null = addPopUpRef.current
            const target = event.target as Node
            if ((popUp?.contains(target))) {
                setAddPopUpfocus(true)
                return
            }
            setAddPopUpfocus(false)
        })
    })

    return (
        <>
            <Navbar />
            <div className="md-text">The page feels empty. Want to add more bookmarks?</div>
            <button className="add-bookmark" onClick={() => { setAddBookmarks(true); setAddPopUpfocus(true) }}>Add Bookmark</button>
            { addBookmarks && addPopUpfocus && <Bookmark id={id} popUpRef={addPopUpRef}/> }
        </>
    )
}