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
    const { me, messages, sendMessage, displayStatus, startChat } = useChat()
    const [msg, setMsg] = useState('') // textBody
    const [msgSent, setMsgSent] = useState(false);
    // const msgRef = useRef(null)
    const msgFooter = useRef(null)
    const [activeKey, setActiveKey] = useState(''); //目前顯示的是哪個 tab(點在誰身上)
    const [modalOpen, setModalOpen] = useState(false);
    const [chatBoxes, setChatBoxes] = useState([]); // {label, children, key} 方便起見使 key = label

    // useEffect(() => {
    //     console.log('change foot');
    // }, msgFooter);
    useEffect(() => {
        // console.log('msg changes');
        if (activeKey) {
            updateChatBox(activeKey);
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
        startChat(me, newKey, 'REMOVE');
        return newKey;
    };


    return (
        <>
            <Title name={me} />
            <>
                <ChatBoxesWrapper
                    tabBarStyle={{ height: '36px' }}
                    type="editable-card"
                    activeKey={activeKey}
                    onChange={(key) => {    // 點選其他已開啟的tab(切換)
                        startChat(me, key, 'CHANGE');
                        setActiveKey(updateChatBox(key));
                    }}
                    onEdit={(targetKey, action) => {    // 點加號或叉叉時
                        if (action === 'add') {
                            setModalOpen(true);
                        }
                        else if (action === 'remove') {
                            setActiveKey(removeChatBox(targetKey, activeKey));
                        }
                    }}
                    items={chatBoxes}
                />
                <ChatModal
                    open={modalOpen}
                    onCreate={({ name }) => {
                        startChat(me, name, 'START');
                        setActiveKey(createChatBox(name));
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
                    if (activeKey) {
                        if (!msg) {
                            displayStatus({
                                type: 'error',
                                msg: 'Please enter message.'
                            })
                            return
                        }
                        sendMessage(me, activeKey, msg)
                        setMsg('')
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
            }}>scroll</button>
            <button onClick={() => { console.log(msgFooter.current) }}>show</button> */}
        </>
    )
}

export default ChatRoom