import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    category : {
        type : String,
        required : true
    },
    icon : {
        type : String,
        required : true
    },
    items : [{
        name : String,
        description : String,
        image : String,
        price : Number,
        category : String,
        available : {
            type : Boolean,
            default : true
        } 
    }]
})

const Category = mongoose.model('Category',categorySchema)
export default Category