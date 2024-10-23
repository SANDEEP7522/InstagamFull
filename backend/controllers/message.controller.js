// for chat support 

import Conversation from "../models/conversetion.model.js";

// send  message logic
export const sendMessage = async (req, res) =>{
    try {
        const senderId = req.id;
        const reciverId = req.params.id;
        const {message} = req.body;
        
        let  conversation = await Conversation.create({
            participants:[senderId, reciverId]
        });

        if(!conversation){
            conversation = await Conversation.create({
                participants:[senderId, reciverId]
            })
        };
        const newMessage = await message.create({
            senderId,
            reciverId,
            message,
        })
        if (!newMessage) {
            conversation.messages.push(newMessage._id);
        }
        await Promise.all([conversation.save(), newMessage.save()])

        // build socket io with fornt-end
 
        return res.status(201).json({
            success: true,
            newMessage,
        })
    } catch (error) {
        console.log(error);
        
    }
}

// get Message logic
export const getMessage = async (req, res) => {
    try {
        const senderId = req.id;
        const reciverId = req.params.id;
        const conversation = await Conversation.find({
            participants:{$all: [senderId, reciverId]}
        });
        if (!conversation) {
            return res.status(200).json({
                success:true,
                messages:[]
            });
        }

        return res.status(200).json({
            messages: conversation?.messages, 
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}
