import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
 
    senderId: { // who send sms
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    recever: { // whid id send sms
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    message: {
        type: String,
        required:true,
    },

},{timestamps: true})
const Message = mongoose.model('Message', messageSchema);
export default Message;