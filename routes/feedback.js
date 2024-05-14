import express from 'express'
import { createFeedback, getAllFeedback } from '../Controllers/FeedbackController.js'

import { verifyAdmin, verifyUser } from '../utils/verifyToken.js'

const router = express.Router()

//Update user
router.post('/', verifyUser, createFeedback)



//Get all user
router.get('/', verifyAdmin, getAllFeedback)


export default router