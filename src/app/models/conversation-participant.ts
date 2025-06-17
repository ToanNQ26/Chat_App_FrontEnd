import { Conversation } from "./conversation";

export interface ConversationParticipant {
    conversation: Conversation,
    userIds: string[],
    
}
