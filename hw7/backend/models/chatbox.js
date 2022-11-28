import mongoose from 'mongoose';
const Schema = mongoose.Schema
// Creating a schema, sort of like working with an ORM

const MessageSchema = new Schema({
    sender: {
        type: String,
        required: [true, 'Sender field is required.']
    },
    body: {
        type: String,
        required: [true, 'Body field is required.']
    }
})

const MessageModel = mongoose.model('Message', MessageSchema);

const ChatBoxSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required.']
    },
    users: [{
        type: String,
        required: [true, 'Users field is required.']
    }],
    messages: [{
        type: mongoose.Types.ObjectId,
        ref: 'Message'
    }]
})

const ChatBoxModel = mongoose.model('ChatBox', ChatBoxSchema);

// export default ChatBoxModel;
export { MessageModel, ChatBoxModel };