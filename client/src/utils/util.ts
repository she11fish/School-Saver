import axios from "axios"
import { BookmarkRow } from "../interfaces/interface";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth } from "../firebase-config";

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
        await axios.delete(`http://localhost:5000/api/v1/bookmarks/${id}`, {
            data: { 
                bookmark: bookmark,
                link: link
            }
        })
    } catch(err) {
        console.log(err)
    }
}

export async function getUserNotes(id: number): Promise<any | undefined> {
    try {
        const response = await axios.get(`http://localhost:5000/api/v1/notes/${id}`)
        const data = response.data
        if (data.rows.length) 
            return data.rows[0]["notes"]
    } catch(err) {
        console.log(err)
    }
}

export async function createUserNotes(id: number, subject: string, day: string, note: string) {
    try {
        let notes: any = {}
        let day_object: any = {}
        day_object[day] = [note]
        notes[subject] = day_object
        const request = await axios.post(`http://localhost:5000/api/v1/notes/${id}`, {
            notes
        })
    } catch(err) {
        console.log(err)
    }
}

export async function updateUserNotes(notes: object, id: number) {
    try {
        await axios.patch(`http://localhost:5000/api/v1/notes/${id}`, {
            ...notes
        })
    } catch(err) {
        console.log(err)
    }
}

export async function containsNotes(id: number): Promise<boolean> {
    console.log("id")
    try {
        const response = await axios.get(`http://localhost:5000/api/v1/notes/${id}`)
        const data = response.data
        return Boolean(Object.keys(data.rows[0]?.notes).length) 
    } catch(err) {
        console.log(err)
        return false
    }
}

function deleteNote(notes: any, subject: string, day: string, note: string) {
    const index: number = notes[subject][day]?.indexOf(note)
    if (index != -1 && typeof index === "number") {
        notes[subject][day].splice(index, 1)
    }
    if (!notes[subject][day]?.length) {
        deleteDay(notes, subject, day)
    }
}

function deleteDay(notes: any, subject: string, day: string) {
    delete notes[subject][day]
    if (!Object.keys(notes[subject]).length) {
        deleteSubject(notes, subject)
    }
}

function deleteSubject(notes: any, subject: string) {
    delete notes[subject]
}

export async function deleteNotes(notes: any, id: number, subject: string, day: string | null = null, note: string | null = null) {
    if (subject && day && note) {
        deleteNote(notes, subject, day, note)
    }
    if (subject && day && !note) {
        deleteDay(notes, subject, day)
    }

    if (subject && !day && !note) {
        deleteSubject(notes, subject)
    }

    console.log(notes)
    try {
        await axios.patch(`http://localhost:5000/api/v1/notes/${id}`, {
            ...notes
        })
    } catch(err) {
        console.log(err)
    }
}

export async function signup(email: string, password: string) {
    try {
        const data = await createUserWithEmailAndPassword(auth, email, password)
    } catch (err) {
        console.error(err);
    }
}

export async function signin(email: string, password: string) {
    try {
        const user = await signInWithEmailAndPassword(auth, email, password)
    } catch (err) {
        console.error(err);
    }
}

export async function logout() {
    try {
        await signOut(auth)
    } catch (err) {
        console.error(err);
    }
}

export function decode(str: string) {
    var res = 0,
        length = str.length,
        i, char;
    for (i = 0; i < length; i++) {
        char = str.charCodeAt(i);
        if (char < 58) {
            char = char - 48;
        } else if (char < 91) {
            char = char - 29;
        } else {
            char = char - 87;
        }
        res += char * Math.pow(62, length - i - 1);
    }
    return res % 100000000;
};

export function getUserId(uid: string) {
    // convert alphanumeric to a number within 9 digits
    return decode(uid)
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