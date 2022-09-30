import express from 'express'
const bookmarksRouter = express.Router()

bookmarksRouter.get("/")

bookmarksRouter.get("/:id")

bookmarksRouter.post("/")

bookmarksRouter.patch("/:id")

bookmarksRouter.delete("/:id")

export default bookmarksRouter