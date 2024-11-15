import useDebounced from '../../../common/hooks/use-debounced.ts';
import { useEffect, useState } from 'react';
import { getChats } from '../../../root/api/chats';
import { useAppAction, useAppSelector } from '../../../root/store';
import { Envs } from '../../../common/config/envs/envs.ts';
import { ChatType } from '../../../root/types/chat/chat.type.ts';

let globalKey: string | undefined = undefined;

const useChats = (input?: string): [boolean, ChatType[], () => void] => {
    const limit = Envs.chats.limit;
    const key = useDebounced(input, 300);
    const { chats } = useAppSelector((state) => state.chats);
    const { setChats } = useAppAction();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [offset, setOffset] = useState<number>(0);

    const scrollBottom = () => {
        setOffset(offset + limit);
    };

    useEffect(() => {
        setIsLoading(true);
        if (input === key) return setIsLoading(false);

        globalKey = input;
    }, [input]);

    useEffect(() => {
        getChats(key, limit).then(({ success, data }) => {
            if (key !== globalKey) return;
            setIsLoading(false);

            if (success) setChats(data);
            else setChats([]);
        });
    }, [key]);

    useEffect(() => {
        if (!offset) return;

        getChats(key, limit, offset).then(({ success, data }) => {
            if (success && data) setChats(chats.concat(data));
            else setChats([]);
        });
    }, [offset]);

    return [isLoading, chats, scrollBottom];
};

export default useChats;
