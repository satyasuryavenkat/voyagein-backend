import Tour from '../models/Tour.js'


//Create new tour
export const createTour = async (req, res) => {
   const newTour = new Tour(req.body)

   try {
      const savedTour = await newTour.save()

      res.status(200).json({ success: true, message: 'Successfully created', data: savedTour })
   } catch (error) {
      res.status(500).json({ success: true, message: 'Failed to create. Try again!' })
   }
}

//Update Tour
export const updateTour = async (req, res) => {
   const id = req.params.id

   try {
      const updatedTour = await Tour.findByIdAndUpdate(id, {
         $set: req.body
      }, { new: true })

      res.status(200).json({ success: true, message: 'Successfully updated', data: updatedTour })
   } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to update' })
   }
}

//Delete Tour
export const deleteTour = async (req, res) => {
   const id = req.params.id

   try {
      await Tour.findByIdAndDelete(id)

      res.status(200).json({ success: true, message: 'Successfully deleted' })
   } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to delete' })
   }
}

//Getsingle Tour
export const getSingleTour = async (req, res) => {
   const id = req.params.id

   try {
      const tour = await Tour.findById(id).populate('reviews')

      res.status(200).json({ success: true, message: 'Successfully', data: tour })
   } catch (error) {
      res.status(404).json({ success: false, message: 'Not Found' })
   }
}

//Get All Tour
export const getAllTour = async (req, res) => {
   //For pagination
   const page = parseInt(req.query.page)

   //console.log(page)

   try {
      const tours = await Tour.find({}).populate('reviews').skip(page * 8).limit(8)

      res.status(200).json({ success: true, count: tours.length, message: 'Successfully', data: tours })
   } catch (error) {
      res.status(404).json({ success: false, message: 'Not Found' })
   }
}


// Get tour by search
export const getTourBySearch = async (req, res) => {

   // hear 'i' means case sensitive 
   const city = new RegExp(req.query.city, 'i')

   if(req.query.distance == ''){
      req.query.distance = 0;
   }

   if(req.query.cost == ''){
      req.query.cost = 0;
   }

   if(req.query.maxGroupSize == ''){
      req.query.maxGroupSize = 0;
   }

   const distance = parseInt(req.query.distance)
   const cost = parseInt(req.query.cost)
   const maxGroupSize = parseInt(req.query.maxGroupSize)

   let tours;
   try {
      // gte means greater than equal

      if(distance == 0){
         tours = await Tour.find({ city, distance: { $gte: distance },price: { $gte: cost }, maxGroupSize: { $gte: maxGroupSize } }).populate('reviews')
      }
      else if(distance > 0){

      tours = await Tour.find({ city, distance: { $lte: distance },price: { $gte: cost }, maxGroupSize: { $gte: maxGroupSize } }).populate('reviews')
      }
      res.status(200).json({ success: true, message: 'Successfully', data: tours })
   } catch (error) {
      res.status(404).json({ success: false, message: 'Not Found' })
   }
}

//Get featured Tour
export const getFeaturedTour = async (req, res) => {
   //console.log(page)

   try {
      const tours = await Tour.find({ featured: true }).populate('reviews').limit(8)

      res.status(200).json({ success: true, message: 'Successfully', data: tours })
   } catch (error) {
      res.status(404).json({ success: false, message: 'Not Found' })
   }
}

//Get tour count 
export const getTourCount = async(req,res) => {
   try {
      const tourCount = await Tour.estimatedDocumentCount()

      res.status(200).json({success:true, data:tourCount})
   } catch (error) {
      res.status(500).json({success:false, message: "Failed to fetch"})
   }
}