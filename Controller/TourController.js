import {TourModel} from '../Models/TourModel.js'
import cloudinary from '../Utils/Cloudinay.js'

export const createTour = async(req,res)=>{
    try {
        const {title,description,image,creator,name} = req.body
        if (image) {
            const uploadedResponse = await cloudinary.uploader.upload(image, {
              upload_preset: "blogimage",
            });
              if(uploadedResponse){

                const data =  TourModel({
                    title,
                    description,
                    creator,
                    name,
                    image:uploadedResponse,
                })
                const result = await data.save()
              return  res.status(200).json(result)
              }


        }else{

            const data =  TourModel({
                title,
                description,
                creator,
                name
            })
            const result = await data.save()
          return  res.status(200).json(result)

        }
        
    } catch (error) {
        res.status(500).json('something went wrong!')
        
    }
}

export const getAllTour= async(req,res) =>{

   
    try {
        let {page} = req.query
        // console.log(req.query)
        if(!page){
            page = 1
        }
        const limit = 3
        const total = await TourModel.countDocuments({})
        const startIndex = (Number(page)-1) * limit
        const data = await TourModel.find().skip(startIndex).limit(limit)
        res.status(200).json({
            data:data,
            currentPage:Number(page),
            nuberOfPages:Math.ceil(total/limit),
            totalTours: total,
        })
        
    } catch (error) {
        
        res.status(500).json('something went wrong!')
    }
}

export const getTourById = async(req,res)=>{
    const {id} = req.params
    try {
        const tour = await TourModel.findById(id)
        res.status(200).json(tour)
    } catch (error) {
        res.status(500).json('something went wrong!')

        
    }
}

export const getTourByUserId = async(req,res)=>{

    const {id} = req.params
    try {
        const tours = await TourModel.find({creator:id})
        res.status(200).json(tours)
    } catch (error) {
        res.status(500).json('something went wrong!')
        
    }

}

export const updateTours = async(req,res)=>{
    const {id} = req.params
    try {
        const updatedTour = await TourModel.findByIdAndUpdate(id,req.body, { new: true })
        res.status(200).json(updatedTour)
    } catch (error) {
        res.status(500).json('something went wrong!')
        
    }
}

export const deleteTours = async(req,res)=>{
    const {id} = req.params
    try {
        await TourModel.findByIdAndDelete(id)
        res.status(200).json('tour delete successfully!')
    } catch (error) {
        res.status(500).json('something went wrong!')
        
    }
}

export const searchTour = async(req,res)=>{
    const {search} = req.query 
    try {
        const title = new RegExp(search,"i")
        const tours = await TourModel.find({title})
        res.status(200).json(tours)
    } catch (error) {
        res.status(500).json('something went wrong!')
        
    }
    
}

export const likeTour = async (req, res) => {
    const id = req.params.id;
    const userId = req.user._id 
    // console.log('tourId',id,'userId',userId)
  
    try {
      const tour = await TourModel.findById(id);
      if (!tour.likes.includes(userId)) {
         const updatedTour = await TourModel.findByIdAndUpdate(id,{
            $push:{likes:userId}
        },{new:true})
      return   res.status(200).json(updatedTour);
      } else {
        const updatedTour = await TourModel.findByIdAndUpdate(id,{
        $pull:{likes:userId}
    },{new:true})
      return  res.status(200).json(updatedTour);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  };


export const commentTour = async(req,res)=>{
    const {id} = req.params 
    const {_id,name} = req.user
    const {comment} = req.body
    // console.log(comment)
    // console.log(_id,name)
    try {
        const tour = await TourModel.findByIdAndUpdate(id,{
            $push:{comments:{id:_id,name,comment}}
        },{new:true})
    res.status(200).json(tour)
    } catch (error) {
        res.status(500).json(error);
        
    }
}