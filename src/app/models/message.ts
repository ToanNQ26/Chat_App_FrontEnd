import { Conversation } from "./conversation";
import { User } from "./user";

export interface Message {
    //id: string,
    content: string,
    timeStamp: string,
    senderId: User,
    conversationId: Conversation
}
