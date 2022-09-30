import express from 'express'
import notes from './notes.js'
import bookmarks from './bookmarks.js'

const rootRouter = express.Router()

rootRouter.use('/notes', notes);

rootRouter.use('/bookmarks', bookmarks);

export default rootRouter