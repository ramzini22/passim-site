import { MutableRefObject, useEffect, useMemo, useRef } from 'react';
import { useAppSelector } from '../../../root/store';
import { MessageTypeEnum } from '../../../root/types/chat/message-type.enum.ts';
import { PropsType } from '../types/props.type.ts';
import { useTranslation } from 'react-i18next';
import moment from 'moment/min/moment-with-locales';

export const useVisibility = (props: PropsType): [MutableRefObject<null>, string, string] => {
    const { number, message, title, type, createdAt, readMessage } = props;
    const { chatOnPage } = useAppSelector((state) => state.chats);
    const observerTarget = useRef(null);
    const { t } = useTranslation();
    const time = moment(createdAt).format('LT');

    const visibleMessage = useMemo(() => {
        return type == MessageTypeEnum.IS_SYSTEM ? `${t(message)} «${title}»` : message;
    }, []);

    useEffect(() => {
        // todo
        // такой подход резко открывает чат...
        // сделать сохранение позиции скролла и обновление списка соощбений как в виртуальном списке
        // const num = rawChats.chatsRead.get(chatId);
        // if (number === num) document.querySelector(`#message${num}`)?.scrollIntoView({ behavior: 'instant' });
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => entries[0].isIntersecting && readMessage(number), {
            threshold: 1,
        });

        if (observerTarget.current) observer.observe(observerTarget.current);

        return () => {
            if (observerTarget.current) observer.unobserve(observerTarget.current);
        };
    }, [chatOnPage]);

    return [observerTarget, visibleMessage, time];
};
