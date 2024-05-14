import Feedback from '../models/Feedback.js'

//Create new User
export const createFeedback = async (req, res) => {
   const newFeedback = new Feedback(req.body)

   try {
      const savedFeedback = await newFeedback.save()

      res.status(200).json({ success: true, message: 'Successfully created', data: savedFeedback })
   } catch (error) {
      res.status(500).json({ success: true, message: 'Failed to create. Try again!' })
   }
}


//GetAll User
export const getAllFeedback = async (req, res) => {
   //console.log(page)

   try {
      const feedbacks = await Feedback.find({})

      res.status(200).json({ success: true, message: 'Successfully', data: feedbacks })
   } catch (error) {
      res.status(404).json({ success: false, message: 'Not Found' })
   }
}