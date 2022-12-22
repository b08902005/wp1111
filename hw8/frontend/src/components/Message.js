import { Tag } from "antd";
import styled from "styled-components";

const StyledMessage = styled.div`
    display: flex;
    flex-direction: ${({ isMe }) => (isMe ? 'row-reverse' : 'row')};
    align-items: center;
    margin: 8px 0px;

    & p:first-child {
        margin: 0 5px;
    }

    & p:last-child {
        border-radius: 5px;
        margin: auto 0;
        padding: 2px 5px;
        background: #eee;
        color: gray;
    }
`

const Message = ({ isMe, message }) => {
    return (
        <StyledMessage isMe={isMe}>
            <p>{message}</p>
        </StyledMessage>
    );
};

export default Message;