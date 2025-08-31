import { GetUserConversationsCommand } from './../../../core/usecases/chatRepo/GetUserConversations';
import { ConversationsList } from '../entities/ConversationsList';
import { CreateConversationCommand } from './../../../core/usecases/chatRepo/CreateConversation';
import { SendMessageCommand } from './../../../core/usecases/chatRepo/SendMessage';
import { Conversation } from '../entities/Conversation';
import { Discussion } from '../entities/Discussion';
import { GetDiscussionByIdCommand } from './../../../core/usecases/chatRepo/GetDiscussionById';
import { SendGroupMessageCommand } from './../../../core/usecases/chatRepo/SendGroupMessage';
import { GetConversationByUserIdCommand } from './../../../core/usecases/chatRepo/GetConversationByUserId';

export interface ChatRepo {
  getUserConversations(
    req: GetUserConversationsCommand,
  ): Promise<ConversationsList>;
  createConversation(
    req: CreateConversationCommand,
  ): Promise<{ conversation: Conversation }>;
  sendMessage(req: SendMessageCommand): Promise<void>;
  sendGroupMessage(req: SendGroupMessageCommand): Promise<void>;
  getDiscussions(): Promise<Discussion[]>;
  getDiscussionById(req: GetDiscussionByIdCommand): Promise<Discussion>;
  getConversationByUserId(
    req: GetConversationByUserIdCommand,
  ): Promise<Omit<Conversation, 'startedBy'>>;
}
