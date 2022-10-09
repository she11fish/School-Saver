import axios from "axios"
import { BookmarkRow } from "../interfaces/interface";

export async function createBookmark(event: React.MouseEvent<HTMLFormElement, MouseEvent>, bookmark: string, link: string) {
    try {
        const request = await axios.post(`http://localhost:5000/api/v1/bookmarks/`, {
            bookmark: bookmark,
            link: link
        })
    } catch(err) {
        console.log(err)
    }
}

export async function addBookmark(event: React.MouseEvent<HTMLFormElement, MouseEvent>, id:number, bookmark: string, link: string) {
    try {
        const request = await axios.patch(`http://localhost:5000/api/v1/bookmarks/${id}`, {
            bookmark: bookmark,
            link: link
        })
    } catch(err) {
        console.log(err)
    }
}

export async function getUserBookmarks(id: number): Promise<BookmarkRow | undefined> {
    try {
        const response = await axios.get(`http://localhost:5000/api/v1/bookmarks/${id}`)
        const data = response.data
        if (data.rows.length) 
            return data.rows[0]
    } catch(err) {
        console.log(err)
    }
}

export async function containsBookmarks(id: number): Promise<boolean> {
    try {
        const response = await axios.get(`http://localhost:5000/api/v1/bookmarks/${id}`)
        const data = response.data
        return Boolean(data.rows[0].bookmarks.length) 
    } catch(err) {
        console.log(err)
        return false
    }
}

export async function deleteBookmark(id: number, bookmark: string, link: string) {
    try {
        const request = await axios.delete(`http://localhost:5000/api/v1/bookmarks/${id}`, {
            data: { 
                bookmark: bookmark,
                link: link
            }
        })
    } catch(err) {
        console.log(err)
    }
}

export async function generateId(): Promise<number | void> {
    try {
        const response = await axios("http://localhost:5000/api/v1/bookmarks");
        const table = response.data;
        const rows: Array<BookmarkRow> = table.rows;
        const rowSize = table.rowCount
        return rows[rowSize - 1].id + 1
    } catch (err) {
        console.log(err)
    }
}