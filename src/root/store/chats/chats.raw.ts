import { ChatType } from '../../types/chat/chat.type.ts';
import { RawChatType } from './types/raw-chat.type.ts';

const rawChats: RawChatType = {
    chats: new Map<number, ChatType>(),
    updatedChats: new Map<number, ChatType>(),
    chatsRead: new Map<number, number>(),
    indexDb: undefined,
};

export default rawChats;
