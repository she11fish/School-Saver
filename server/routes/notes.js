import express from 'express'
import { createNotes, getAllNotes, getNotes, updateNotes, deleteNotes } from '../controllers/controller.js'
const notesRouter = express.Router()

notesRouter.get("/", getAllNotes)

notesRouter.get("/:id", getNotes)

notesRouter.post("/", createNotes)

notesRouter.patch("/:id", updateNotes)

notesRouter.delete("/:id", deleteNotes)

export default notesRouter