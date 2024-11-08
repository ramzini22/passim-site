import { FC } from 'react';
import styles from './index.module.css';
import { ChatItemType } from '../../root/types/chat/chat-item.type.ts';
import { useNavigate } from 'react-router-dom';
import ChatAvatar from '../chat-avatar';

const ChatItem: FC<{ chat: ChatItemType }> = ({ chat }) => {
    const navigate = useNavigate();

    return (
        <div
            className={styles.chat_item}
            onClick={() => {
                document.documentElement.style.setProperty('--menu-margin', 'var(--menu-width)');
                navigate(`${chat.id}`, { state: chat });
            }}
        >
            <ChatAvatar type={chat.type} />
            <div className={styles.main_inf}>
                <div className={styles.title}>{chat.title}</div>
                <div className={styles.message_block}>
                    {/*<div className={styles.message}>{chat.lastMessage?.message}</div>*/}
                    {/*{chat.countIsNotReadMessages > 0 && (*/}
                    {/*    <div className={styles.count_message}>{chat.countIsNotReadMessages}</div>*/}
                    {/*)}*/}
                </div>
            </div>
        </div>
    );
};

export default ChatItem;
