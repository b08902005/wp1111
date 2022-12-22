import { Tabs, Input, Tag } from 'antd'
import { useState, useEffect, useRef } from 'react'
import { useChat } from './hooks/useChat'
import styled from 'styled-components';
import Title from '../components/Title';
import Message from '../components/Message';
import ChatModal from '../components/ChatModal';

const ChatBoxesWrapper = styled(Tabs)`
    width: 100%;
    height: 300px;
    background: #eeeeee52;
    border-radius: 10px;
    margin: 20px;
    padding: 20px;
`;

const ChatBoxWrapper = styled.div`
    height: calc(240px - 36px);
    display: flex;
    flex-direction: column;
    overflow: auto;
`;

const FootRef = styled.div`
    height: 20px;
`;

const ChatRoom = () => {
    const { me, messages, sendMessage, displayStatus, startChat, setStatus,
        data, loading, friend, setFriend, setMessages, setCreated } = useChat()
    const [msg, setMsg] = useState('') // textBody
    const [msgSent, setMsgSent] = useState(false);
    // const msgRef = useRef(null)
    const msgFooter = useRef(null)
    // const [friend, setActiveKey] = useState(''); //目前顯示的是哪個 tab(點在誰身上)
    const [modalOpen, setModalOpen] = useState(false);
    const [chatBoxes, setChatBoxes] = useState([]); // {label, children, key} 方便起見使 key = label

    // useEffect(() => {
    //     console.log('change foot');
    // }, msgFooter);
    useEffect(() => {
        // console.log('msg changes');
        if (friend) {
            updateChatBox(friend);
        }
        // scrollToBottom();
    }, [messages])

    const scrollToBottom = () => {
        msgFooter.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })     //?.前面若是undefined的話會回傳undefined而非throw error
    }

    useEffect(() => {
        scrollToBottom();
        setMsgSent(false);
    }, [msgSent])

    useEffect(() => {
        if (!loading && data && data.chatbox) {
            setMessages(() =>
                [...data.chatbox.messages])
        }
    }, [data])

    const renderChat = (chat) => (

        chat.length === 0 ? (
            <p style={{ color: '#ccc' }}> No messages... </p>
        ) : (
            <ChatBoxWrapper>
                {chat.map(({ sender, body }, i) => (
                    <Message isMe={sender === me} message={body} key={i} />
                ))}
                <FootRef key={chat.length} ref={msgFooter} />
            </ChatBoxWrapper>
        )
    );

    const extractChat = (friend) => {
        // console.log(messages);
        return renderChat
            (messages.filter
                (({ sender, body }) => ((sender === friend) || (sender === me))));
    }

    const updateChatBox = (newKey) => {
        const index = chatBoxes.findIndex
            (({ key }) => key === newKey);
        // const chat = renderChat(messages);
        const chat = extractChat(newKey);
        // console.log(chat);
        setChatBoxes([...chatBoxes.slice(0, index),
        {
            label: newKey, children: chat,
            key: newKey
        },
        ...chatBoxes.slice(index + 1)
        ]);
        setMsgSent(true);
        return newKey;
    }

    const createChatBox = (friend) => {
        if (chatBoxes.some
            (({ key }) => key === friend)) {
            throw new Error(friend +
                "'s chat box has already opened.");
        }
        const chat = extractChat(friend);
        // console.log("chat:", chat);
        setChatBoxes([...chatBoxes,
        {
            label: friend, children: chat,
            key: friend
        }]);
        // setMsgSent(true);
        return friend;
    };

    const removeChatBox = (targetKey, activeKey) => {
        const index = chatBoxes.findIndex
            (({ key }) => key === activeKey);
        const newChatBoxes = chatBoxes
            .filter(({ key }) =>
                key !== targetKey);
        setChatBoxes(newChatBoxes);
        let newKey = (
            activeKey ?
                activeKey === targetKey ?
                    index === (chatBoxes.length - 1) ?
                        index === 0 ?
                            ''
                            : chatBoxes[index - 1].key
                        : chatBoxes[index + 1].key
                    : activeKey
                : '');
        let chat = startChat({
            variables: {
                name1: me,
                name2: newKey,
            }
        });
        // setMessages(() =>
        //     [...chat])
        return newKey;
    };


    return (
        <>
            <Title name={me} />
            <>
                <ChatBoxesWrapper
                    tabBarStyle={{ height: '36px' }}
                    type="editable-card"
                    activeKey={friend}
                    onChange={(key) => {    // 點選其他已開啟的tab(切換)
                        startChat({
                            variables: {
                                name1: me,
                                name2: key,
                            }
                        })
                        setStatus({
                            type: 'success',
                            msg: `Change to chatbox ${key}`
                        })
                        setFriend(key);
                    }}
                    onEdit={(targetKey, action) => {    // 點加號或叉叉時
                        if (action === 'add') {
                            setModalOpen(true);
                        }
                        else if (action === 'remove') {
                            let newKey = removeChatBox(targetKey, friend);
                            console.log(newKey);
                            setFriend((prev) => {
                                setStatus({
                                    type: 'success',
                                    msg: `Remove chatbox ${prev}`
                                })
                                return newKey
                            });
                        }
                    }}
                    items={chatBoxes}
                />
                <ChatModal
                    open={modalOpen}
                    onCreate={({ name }) => {
                        startChat({
                            variables: {
                                name1: me,
                                name2: name,
                            }
                        })
                        setStatus({
                            type: 'success',
                            msg: `Create chatbox ${name}`
                        })
                        setFriend(createChatBox(name));
                        setCreated(true)
                        setModalOpen(false);
                    }}
                    onCancel={() => {
                        setModalOpen(false);
                    }}
                />
            </>
            <Input.Search
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                enterButton="Send"
                placeholder="Type a message here..."
                onSearch={(msg) => {
                    if (friend) {
                        if (!msg) {
                            displayStatus({
                                type: 'error',
                                msg: 'Please enter message.'
                            })
                            return
                        }
                        sendMessage({
                            variables: {
                                name: me,
                                to: friend,
                                body: msg,
                            }
                        })
                        // .then((res) => {
                        //     setMessages([...messages, res.data.createMessage])
                        // })
                        setMsg('')
                        setStatus({
                            type: 'success',
                            msg: `Message sent`
                        })
                        setMsgSent(true);
                    }
                    else {
                        displayStatus({
                            type: 'error',
                            msg: 'Please create chatbox(es).'
                        })
                    }
                }}
            ></Input.Search>
            {/* <button onClick={() => {
                console.log('scrollBtn');
                msgFooter.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}>scroll</button> */}
            {/* <button onClick={() => { console.log(data.chatbox.messages); }}>show</button>
            <button onClick={() => { console.log(un) }}>unsub</button> */}
        </>
    )
}

export default ChatRoom