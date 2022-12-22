import mongoose from 'mongoose';
const Schema = mongoose.Schema
// Creating a schema, sort of like working with an ORM

const ChatBoxSchema = new Schema({
    name: {
        type: String,
        required:
            [true, 'Name field is required.']
    },
    messages: [{
        sender: { type: String },
        body: { type: String },
    }],
});
const ChatBoxModel = mongoose.model('ChatBox', ChatBoxSchema);

// export default ChatBoxModel;
export default ChatBoxModel;