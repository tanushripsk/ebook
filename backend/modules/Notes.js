// const mongoose=require('mongoose')
// const {Schema}=mongoose
// const NotesSchema=new Schema({
//     title:{
//         type:String,
//         required:true
//     },
//     description:{
//         type:String,
//         required:true,
//     },
//     tag:{
//         type:String,
//         default:"general"
//     },
//     date:{
//         type:Date,
//         default:Date.new
//     }
// })

// module.exports=mongoose.model('notes',NotesSchema)



const mongoose=require('mongoose')
const {Schema}=mongoose
const NotesSchema=new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    tag:{
        type:String,
        default:"general"
    },
    date:{
        type:Date,
        default:Date.new
    }
})



const Notes=mongoose.model('notes',NotesSchema);
module.exports=Notes;

// module.exports=mongoose.model('user',UserSchema)