import { message } from "antd";
import { createContext, useContext, useState, useEffect } from "react";
import { useQuery, useMutation, useLazyQuery, useSubscription } from "@apollo/client";
import { CHATBOX_QUERY, CREATE_CHATBOX_MUTATION, CREATE_MESSAGE_MUTATION, MESSAGE_SUBSCRIPTION } from "../../graphql";

const LOCALSTORAGE_KEY = 'save-me';
const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);

const ChatContext = createContext({
    status: {},
    me: "",
    signedIn: false,
    messages: [],
    startChat: () => { },
    sendMessage: () => { },
    clearMessages: () => { },
});

let un = null

const ChatProvider = (props) => {
    const [messages, setMessages] = useState([]);
    const [me, setMe] = useState(savedMe || '');
    const [status, setStatus] = useState({});
    const [signedIn, setSignedIn] = useState(false);
    const [friend, setFriend] = useState('')
    const [created, setCreated] = useState(false)

    const [loadingData, { called, data, loading, subscribeToMore }]
        = useLazyQuery(CHATBOX_QUERY, {
            variables: {
                name1: me,
                name2: friend,
            },
            fetchPolicy: "network-only"
        });
    useEffect(() => {
        if (friend) {
            console.log("loading data");
            loadingData()
        }
    }, [friend])
    const [startChat] = useMutation(CREATE_CHATBOX_MUTATION);
    const [sendMessage] = useMutation(CREATE_MESSAGE_MUTATION);

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

    useEffect(() => {
        try {
            if (friend) {
                if (un) {
                    un();
                    un = null
                }
                console.log("sub\nfrom: ", me, "to: ", friend);
                un = subscribeToMore({
                    document: MESSAGE_SUBSCRIPTION,
                    variables: { from: me, to: friend },
                    updateQuery: (prev, { subscriptionData }) => {
                        if (!subscriptionData.data) return prev;
                        const newMessage = subscriptionData.data.message;
                        // console.log(prev.chatbox.messages);
                        // console.log(subscriptionData.data.message);
                        // console.log(prev);
                        return {
                            chatbox: {
                                messages: [...prev.chatbox.messages, newMessage],
                                name: prev.chatbox.name
                            },
                        };
                    },
                });
            }
        } catch (e) { console.log(e); }
    }, [subscribeToMore, friend]);

    // useEffect(() => {
    //     console.log(data);
    // }, [data])

    return (
        <ChatContext.Provider
            value={{
                status, me, signedIn, messages, setMe, setSignedIn, setStatus,
                startChat, sendMessage, displayStatus, data,
                loading, friend, setFriend, setMessages,
                setCreated
            }}
            {...props}
        />
    );
}

const useChat = () => useContext(ChatContext);
export { ChatProvider, useChat };