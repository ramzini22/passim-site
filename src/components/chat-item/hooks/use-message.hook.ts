import { ChatType } from '../../../root/types/chat/chat.type.ts';
import { ChatEnum } from '../../../root/types/chat/chat.enum.ts';
import { MessageTypeEnum } from '../../../root/types/chat/message-type.enum.ts';
import { useEffect, useState } from 'react';
import moment from 'moment/min/moment-with-locales';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../root/store';
import rawChats from '../../../root/store/chats/chats.raw.ts';

export const useMessage = (chat: ChatType): (string | undefined)[] => {
    const { chatOnPage } = useAppSelector((state) => state.chats);
    const { isLoadedChatsFromIndexDb } = useAppSelector((state) => state.app);
    const { t } = useTranslation();
    const [message, setMessage] = useState<string>();
    const [countMessages, setCountMessages] = useState<string>();
    const [time, setTime] = useState<string>();

    const updateTime = (data: Date) => {
        const now = new Date();
        const correctData = new Date(data);

        const diffAtDays = (now.getTime() - correctData.getTime()) / (1000 * 60 * 60 * 24);

        if (diffAtDays < 1) setTime(moment(correctData).format('LT'));
        else if (diffAtDays >= 1 && diffAtDays < 7) setTime(moment(correctData).format('dddd'));
        else setTime(moment(correctData).calendar());
    };

    const changeMessage = () => {
        if (chat.type === ChatEnum.IS_OPEN) {
            const message = chat.message;
            const visibleMessage = message.type === MessageTypeEnum.IS_SYSTEM ? t('chat_is_create') : message.message;

            setMessage(visibleMessage);
            updateTime(message.createdAt);
        }
    };

    const changeCountMessages = () => {
        if (!isLoadedChatsFromIndexDb) return;

        let count = chat.countMessages;
        const number = rawChats.chats.get(chat.id)?.readMessage;
        if (number) {
            count = chat.countMessages - number;
            if (count === 0) return setCountMessages(undefined);
        }

        if (count < 1000) setCountMessages(count.toString());
        else if (count < 1000000) setCountMessages(`${Math.floor(count / 1000)}К`);
        else if (count >= 1000000) setCountMessages(`${Math.floor(count / 1000000)}М`);
    };

    useEffect(() => {
        changeMessage();
    }, [chat]);

    useEffect(() => {
        changeCountMessages();
    }, [chatOnPage, chat]);

    return [message, time, countMessages];
};
