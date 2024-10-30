// for chat support

import Conversation from "../models/conversetion.model.js";

// send logic when user send
export const sendMessage = async (req, res) => {
    try {
      const senderId = req.id;
      const receiverId = req.params.id;
      const { message } = req.body;
  
      // Find the conversation by participants
      let conversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] }, // Use $all to match both participants
      });
  
      // If no conversation exists, create a new one
      if (!conversation) {
        conversation = await Conversation.create({
          participants: [senderId, receiverId],
        });
      }
  
      // Create the new message using the Message model
      const newMessage = await message.create({
        senderId,
        receiverId,
        message,
      });
  
      // Push the new message ID to the conversation's messages array
      conversation.messages.push(newMessage._id);
      
      await conversation.save();
  
      return res.status(201).json({
        success: true,
        newMessage,
      });
    } catch (error) {
      console.error(error);
      
      return res.status(500).json({
        message: "An error occurred while sending the message.",
        success: false,
      });
    }
  };
  
  
// get Message logic
export const getMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const reciverId = req.params.id;
    const conversation = await Conversation.find({
      participants: { $all: [senderId, reciverId] },
    });
    if (!conversation) {
      return res.status(200).json({
        success: true,
        messages: [],
      });
    }

    return res.status(200).json({
      messages: conversation?.messages,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
