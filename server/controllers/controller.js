import { pool as db } from "../models/db.js"
import pgp from "pg-promise"

export async function getAllBookmarks(req, res) {
    const query = pgp.as.format("SELECT * from bookmark")
    try {
        res.send(await db.query(query))
    } catch(err) {
        res.status(503).send(err)
        console.log(err)
    }
}

export async function getBookmarks(req, res) {
    const query = pgp.as.format("SELECT * FROM bookmark WHERE id=$1", [req.params.id])
    try {
        res.send(await db.query(query))
    } catch(err) {
        res.status(503)
        console.log(err)
    }
}

export async function createBookmark(req, res) {
    let { bookmark, link } = req.body
    
    bookmark = bookmark.split(" ")
    link = Array(link) 

    const query = pgp.as.format(`INSERT INTO bookmark (bookmarks, links) VALUES ('{$1}' , $2);`, [bookmark, link])
    
    try {
        res.send(await db.query(query))
    } catch(err) {
        res.status(503)
        console.log(err)
    }
}

export async function createBookmarkById(req, res) {
    let { bookmark, link } = req.body
    console.log(bookmark)
    bookmark = bookmark.split(" ")
    link = Array(link) 

    const query = pgp.as.format(`INSERT INTO bookmark (id, bookmarks, links) VALUES ($1, $2, $3);`, [req.params.id, bookmark, link])
    
    try {
        res.send(await db.query(query))
    } catch(err) {
        res.status(503)
        console.log(err)
    }
}

export async function updateBookmarks(req, res) {
    let { bookmark, link } = req.body 
    const query = pgp.as.format(`
        UPDATE bookmark SET bookmarks = array_append(bookmarks, $1) WHERE id=$2;
        UPDATE bookmark SET links = array_append(links, $3) WHERE id=$4;
    `, [bookmark, req.params.id, link, req.params.id])
    try {
        res.send(await db.query(query))
    } catch(err) {
        res.status(503)
        console.log(err)
    }
}

export async function deleteBookmark(req, res) {
    let { bookmark, link } = req.body
    const query = pgp.as.format(`
        UPDATE bookmark SET bookmarks = array_remove(bookmarks, $1) WHERE id=$2;
        UPDATE bookmark SET links = array_remove(links, $3) WHERE id=$4;
    `, [bookmark, req.params.id, link, req.params.id])
    try {
        res.send(await db.query(query))
    } catch(err) {
        res.status(503)
        console.log(err)
    }
}

export async function getAllNotes(req, res) {
    const query = pgp.as.format("SELECT * from note")
    try {
        res.send(await db.query(query))
    } catch(err) {
        res.status(503).send(err)
        console.log(err)
    }
}

export async function createNotes(req, res) {
    const query = pgp.as.format(`INSERT INTO note (notes) VALUES ($1);`, [JSON.stringify(req.body)]);
    try {
        res.send(await db.query(query))
    } catch(err) {
        res.status(503).send(err)
        console.log(err)
    }
}

export async function createNotesById(req, res) {
    const query = pgp.as.format(`INSERT INTO note (id, notes) VALUES ($1, $2) ;`, [req.params.id,JSON.stringify(req.body)]);
    try {
        res.send(await db.query(query))
    } catch(err) {
        res.status(503).send(err)
        console.log(err)
    }
}

export async function getNotes(req, res) {
    const query = pgp.as.format(`SELECT * FROM note WHERE id=$1`, [req.params.id])
    try {
        res.send(await db.query(query))
    } catch(err) {
        res.status(503)
        console.log(err)
    }
}

export async function updateNotes(req, res) {
    const query = pgp.as.format(`UPDATE note SET notes = ($1)::jsonb WHERE id=$2;`, [JSON.stringify(req.body), req.params.id])
    try {
        res.send(await db.query(query))
    } catch(err) {
        res.status(503).send(err)
        console.log(err)
    }
}

export async function deleteNotes(req, res) {
    const query = pgp.as.format(`UPDATE note SET notes = ('{}')::jsonb WHERE id=$1;`, [req.params.id])
    try {
        res.send(await db.query(query))
    } catch(err) {
        res.status(503).send(err)
        console.log(err)
    }
}