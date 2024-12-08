import { FC, useState } from 'react';
import ChatItem from '../../components/chat-item';
import styles from './index.module.css';
import styles2 from '../../components/chat-item/index.module.css';
import useChats from './hooks/use-chats.ts';
import Search from '../search';
import { useAppSelector } from '../../root/store';
import BackButton from '../../components/back-button';
import LoadingChats from '../../components/loading-chats';
import VisibilityAction from '../../components/visibility-action';
import Loading from '../../components/loading';
import ChatsNotFound from '../../components/chats-not-found';
import { useTranslation } from 'react-i18next';

const Chats: FC = () => {
    const { t } = useTranslation();
    const [input, setInput] = useState<string | undefined>(undefined);
    const { chats, updatedChats } = useAppSelector((state) => state.chats);
    const [isLoading, scrollBottom] = useChats(input);
    const page = useAppSelector((state) => state.app.page);

    return (
        <div id={styles.background}>
            <div id={styles.main}>
                <Search isLoading={isLoading} onChange={setInput} />
                <div id={styles.chats}>
                    <Loading isLoading={isLoading} loadingComponent={<LoadingChats />}>
                        <div className={styles.nav_chats}>{t('global_search')}</div>
                        {updatedChats?.map((chat) => <ChatItem key={chat.id} chat={chat} isNew={true} />)}

                        {chats.length || isLoading ? (
                            chats.map((chat, index) =>
                                updatedChats.find((ch) => chat.id === ch.id) ? (
                                    <div key={index} className={`${styles2.chat_item} ${styles2.hide_chat}`}></div>
                                ) : (
                                    <ChatItem key={chat.id} chat={chat} />
                                ),
                            )
                        ) : (
                            <ChatsNotFound />
                        )}
                        <VisibilityAction action={scrollBottom} size={chats.length} loading={isLoading} />
                        <div className={styles.nav_padding}></div>
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
