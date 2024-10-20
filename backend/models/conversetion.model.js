import mongoose from "mongoose";
const conversationSchema = new mongoose.Schema({
  participants: [ // use array because multiple ID's
    {
      // chat b/w id's
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  message: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
});
export default Conversation = mongoose.model(
  "Coneversation",
  conversationSchema
);
