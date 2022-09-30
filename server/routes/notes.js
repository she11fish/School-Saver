import express from 'express'
const notesRouter = express.Router()

notesRouter.get("/")

notesRouter.get("/:id")

notesRouter.post("/")

notesRouter.patch("/:id")

notesRouter.delete("/:id")

export default notesRouter