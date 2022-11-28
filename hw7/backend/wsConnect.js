import { MessageModel, ChatBoxModel } from "./models/chatbox.js"

const makeName = (name, to) => { return [name, to].sort().join('_'); }

const validateChatBox = async (name, participants) => {
    let box = await ChatBoxModel.findOne({ name });
    if (!box)
        box = await new ChatBoxModel
            ({ name, users: participants }).save();
    return box.populate
        ({ path: 'messages', model: 'Message' });
};

const sendData = (data, ws) => {
    ws.send(JSON.stringify(data));
}
const sendStatus = (payload, ws) => {
    sendData(["status", payload], ws);
}

const broadcastMessage = (wss, ws, data, status) => {
    wss.clients.forEach((client) => {
        if (client.box === ws.box) {
            sendData(data, client);
            sendStatus(status, client);
        }
    });
};

export default {
    onMessage: (wss, ws) => (
        async (byteString) => {
            const { data } = byteString
            const [task, payload] = JSON.parse(data)
            switch (task) {
                case 'CHAT': {
                    const { name, to } = payload;
                    const boxName = makeName(name, to);
                    const { messages } = await validateChatBox(boxName, [name, to]);
                    // console.log(messages);
                    sendData(['CHAT', messages], ws);
                    sendStatus({
                        type: 'success',
                        msg: 'chat start'
                    }, ws)
                    ws.box = boxName;
                    break;
                }
                case 'MESSAGE': {
                    const { name, to, body } = payload
                    // Save payload to DB
                    const message
                        = new MessageModel({ sender: name, body: body })
                    const boxName = makeName(name, to);
                    let box = await ChatBoxModel.findOne({ name: boxName });
                    box.messages.push(message._id);
                    try {
                        await message.save();
                        await box.save();
                    } catch (e) {
                        throw new Error
                            ("Message DB save error: " + e);
                    }
                    broadcastMessage(
                        wss,
                        ws,
                        ['MESSAGE', [{ sender: name, body: body }]],
                        {
                            type: 'success',
                            msg: 'Message sent.'
                        }
                    )
                    break;
                }
                case 'CLEAR': {
                    const { name } = payload;
                    Message.deleteMany({}, () => {
                        broadcastMessage(
                            wss,
                            ['cleared'],
                            { type: 'info', msg: 'Message cache cleared.' }
                        )
                    })
                    break;
                }
                default: break;
            }
        }
    )
}