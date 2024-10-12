import { FC, useState } from 'react';
import ChatItem from '../../components/chat-item';
import styles from './index.module.css';
import useChats from './hooks/use-chats.ts';
import Search from '../search';
import { useAppSelector } from '../../root/store';
import BackButton from '../../components/back-button';
import LoadingChats from '../../components/loading-chats';
import VisibilityAction from '../../components/visibility-action';
import Loading from '../../components/loading';

const Chats: FC = () => {
    const [input, setInput] = useState<string>();
    const [isLoading, chats, scrollBottom] = useChats(input);
    const page = useAppSelector((state) => state.app.page);

    if (chats)
        return (
            <div id={styles.background}>
                <div id={styles.main}>
                    <Search isLoading={isLoading} onChange={setInput} />
                    <div id={styles.chats}>
                        <Loading isLoading={isLoading} loadingComponent={<LoadingChats />}>
                            {chats.map((chat) => (
                                <ChatItem key={chat.id} chat={chat} />
                            ))}
                            <VisibilityAction action={scrollBottom} size={chats.length} loading={isLoading} />
                        </Loading>
                    </div>
                </div>
                <div id={styles.page_block}>
                    <div id={styles.page_button}>
                        <BackButton />
                    </div>
                    <div id={styles.page}>{page}</div>
                </div>
            </div>
        );
};
export default Chats;
