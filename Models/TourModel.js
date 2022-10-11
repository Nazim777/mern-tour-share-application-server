import mongoose from "mongoose";
const TourSchema =new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    image:{
        type:Object,
    },
    name:{
       type:String
    },
    creator:{
        type:mongoose.Schema.Types.ObjectId
    },
    likes:[],
    comments:[]
},
{
    timestamps:true
}

)
export const TourModel = mongoose.model('tours',TourSchema)