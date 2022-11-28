import { message } from "antd";
import { createContext, useContext, useState, useEffect } from "react";

const LOCALSTORAGE_KEY = 'save-me';
const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);

const client = new WebSocket
    ('ws://localhost:4000')

client.onopen = () => console.log('Backend socket server connected!')

const ChatContext = createContext({
    status: {},
    me: "",
    signedIn: false,
    messages: [],
    startChat: () => { },
    sendMessage: () => { },
    clearMessages: () => { },
});

const ChatProvider = (props) => {
    const [messages, setMessages] = useState([]);
    const [me, setMe] = useState(savedMe || '');
    const [status, setStatus] = useState({});
    const [signedIn, setSignedIn] = useState(false);

    client.onmessage = (byteString) => {
        const { data } = byteString;
        const [task, payload] = JSON.parse(data);
        switch (task) {
            case "CHAT": {
                // console.log(payload);
                setMessages(payload);
                break;
            }
            case "MESSAGE": {
                // console.log(messages);
                // console.log(payload);
                setMessages(() =>
                    [...messages, ...payload]);
                break;
            }
            case "status": {
                setStatus(payload);
                break;
            }
            case 'CLEAR': {
                setMessages([]);
                break
            }
            default: break;
        }
    }
    const sendData = async (data) => {
        client.send(
            JSON.stringify(data)
        );
    };

    // ["input", payload]
    const startChat = async (name, to) => {
        console.log('start chat');
        if (!name || !to)
            throw new Error('Name or to required!');
        sendData(['CHAT', {
            name, to
        }])
        // console.log(messages);
    }

    const sendMessage = (name, to, body) => {
        sendData(['MESSAGE', {
            name, to, body
        }]);
    }
    const clearMessages = () => {
        sendData(['CLEAR']);
    };

    const displayStatus = (s) => {
        if (s.msg) {
            const { type, msg } = s;
            const content = {
                content: msg, duration: 0.5
            }
            switch (type) {
                case 'success':
                    message.success(content)
                    break
                case 'error':
                default:
                    message.error(content)
                    break
            }
        }
    }

    useEffect(() => {
        if (signedIn) {
            localStorage.setItem(LOCALSTORAGE_KEY, me);
        }
    }, [signedIn])

    return (
        <ChatContext.Provider
            value={{
                status, me, signedIn, messages, setMe, setSignedIn,
                startChat, sendMessage, clearMessages, displayStatus
            }}
            {...props}
        />
    );
}

const useChat = () => useContext(ChatContext);
export { ChatProvider, useChat };