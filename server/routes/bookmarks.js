import express from 'express'
import { getAllBookmarks, createBookmark, getBookmarks, updateBookmarks, deleteBookmark } from '../controllers/controller.js'

const bookmarksRouter = express.Router()

bookmarksRouter.get("/", getAllBookmarks)

bookmarksRouter.get("/:id", getBookmarks)

bookmarksRouter.post("/", createBookmark)

bookmarksRouter.patch("/:id", updateBookmarks)

bookmarksRouter.delete("/:id", deleteBookmark)

export default bookmarksRouter