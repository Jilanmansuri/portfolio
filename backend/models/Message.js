import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true,
  },
  sender: {
    type: String,
    enum: ['user', 'admin'],
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  // To format cleanly when sending back to frontend matching old id structure
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

const Message = mongoose.model('Message', messageSchema);

export default Message;
