import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId ,io } from "../lib/socket.js";


// ------------getting the user for the side bar-----------------
export const getUserProtected = async (req, res) => {
  try {
    const loginUserId = req.user._id;
    console.log(req);
    const sideUser = await User.find({ _id: { $ne: loginUserId } }).select(
      "-password"
    );
    res.status(200).json(sideUser);
  } catch (error) {
    console.log(`error in getting user for side bar : ${error.message}`);
    res.status(500).json({ message : "error in side bar" });
  }
};

// ---------------------getting the message---------------------------
export const getMessages = async (req, res) => {
  try {
    const { id: userId } = req.params;
    const myId = req.user._id;
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userId },
        { senderId: userId, receiverId: myId }
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    console.log(`error in user messages : ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

//----------------- sending message to the friend--------------------
export const sendMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const { text, image } = req.body;
    const senderId = req.user._id;
    let imageUrl;

    if (image) {
      const uploadImage = await cloudinary.uploader.upload(image);
      imageUrl = uploadImage.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();
    const recceiverSocketId = getReceiverSocketId(receiverId)
    if(recceiverSocketId){
      io.to(recceiverSocketId).emit('newMessage',newMessage)
    }
    res.status(201).json(newMessage);

  } catch (error) {
    console.log(`error in conversation : ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};
