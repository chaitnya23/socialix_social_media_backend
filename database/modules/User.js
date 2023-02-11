const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    userName: {
      type: String,
      unique: true,
    },
    profilePic: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    Requests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    
      },
    ],
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        
      },
    ],
    Posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post", 
      },
    ],
    SavedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    notifications:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Notification"
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
