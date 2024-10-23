import mongoose from "mongoose";
const conversationSchema = new mongoose.Schema({
  participants: [ // use array because multiple ID's
    {
      // chat b/w id's
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
});
 const Conversation = mongoose.model(
  "Coneversation",
  conversationSchema
);

export default Conversation;