import { MessageTypeEnum } from './message-type.enum.ts';
import { ChatType } from './chat.type.ts';

export type MessageType = {
    id: number;
    chatId: string;
    message: string;
    number: number;
    parentMessageId: number;
    type: MessageTypeEnum;
    createdAt: Date;
    chat: ChatType;
};

export type EncryptMessageType = {
    id: string;
    chatId: string;
    encryptMessage: string;
    number: number;
    parentMessageId: number;
    type: MessageTypeEnum;
    createdAt: Date;
};
