import { pool as db } from "../models/db.js"
import { dereferenceArray } from "../services/service.js"

export async function getAllBookmarks(req, res) {
    try {
        res.send(await db.query("SELECT * from bookmark"))
    } catch(err) {
        res.status(503).send(err)
        console.log(err)
    }
}

export async function getBookmarks(req, res) {
    try {
        res.send(await db.query(`SELECT * FROM bookmark WHERE id=${req.params.id}`))
    } catch(err) {
        res.status(503)
        console.log(err)
    }
}

export async function createBookmark(req, res) {
    let { bookmark, link } = req.body
    
    bookmark = bookmark.split(" ")
    link = Array(link) 

    const dereferenedBookmark = dereferenceArray(bookmark)
    const dereferenedLink = dereferenceArray(link)

    try {
        res.send(await db.query(`INSERT INTO bookmark (bookmarks, links) VALUES ('{${dereferenedBookmark}}' , '{${dereferenedLink}}');`))
    } catch(err) {
        res.status(503)
        console.log(err)
    }
}

export async function updateBookmarks(req, res) {
    let { bookmark, link } = req.body 
    try {
        res.send(await db.query(`
            UPDATE bookmark SET bookmarks = array_append(bookmarks, '${bookmark}') WHERE id=${req.params.id};
            UPDATE bookmark SET links = array_append(links, '${link}') WHERE id=${req.params.id};
        `))
    } catch(err) {
        res.status(503)
        console.log(err)
    }
}

export async function deleteBookmark(req, res) {
    let { bookmark, link } = req.body
    try {
        res.send(await db.query(`
            UPDATE bookmark SET bookmarks = array_remove(bookmarks, '${bookmark}') WHERE id=${req.params.id};
            UPDATE bookmark SET links = array_remove(links, '${link}') WHERE id=${req.params.id};
        `))
    } catch(err) {
        res.status(503)
        console.log(err)
    }
}