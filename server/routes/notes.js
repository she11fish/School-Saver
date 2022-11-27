import express from 'express'
import { createNotes, getAllNotes, getNotes, updateNotes, deleteNotes, createNotesById } from '../controllers/controller.js'
const notesRouter = express.Router()

notesRouter.get("/", getAllNotes)

notesRouter.get("/:id", getNotes)

notesRouter.post("/", createNotes)

notesRouter.post("/:id", createNotesById)

notesRouter.patch("/:id", updateNotes)

notesRouter.delete("/:id", deleteNotes)

export default notesRouter