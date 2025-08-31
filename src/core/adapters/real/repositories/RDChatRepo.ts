import { Conversation } from './../../../../core/domain/entities/Conversation';
import { ConversationsList } from './../../../../core/domain/entities/ConversationsList';
import { Discussion } from './../../../../core/domain/entities/Discussion';
import { ChatRepo } from './../../../../core/domain/repositories/ChatRepo';
import { CreateConversationCommand } from './../../../../core/usecases/chatRepo/CreateConversation';
import { GetConversationByUserIdCommand } from './../../../../core/usecases/chatRepo/GetConversationByUserId';
import { GetDiscussionByIdCommand } from './../../../../core/usecases/chatRepo/GetDiscussionById';
import { GetUserConversationsCommand } from './../../../../core/usecases/chatRepo/GetUserConversations';
import { SendGroupMessageCommand } from './../../../../core/usecases/chatRepo/SendGroupMessage';
import { SendMessageCommand } from './../../../../core/usecases/chatRepo/SendMessage';
import { AxiosInstance } from 'axios';

export class RDChatRepo implements ChatRepo {
  constructor(private httpClient: AxiosInstance) {}

  async getUserConversations(req: GetUserConversationsCommand) {
    const { page } = req;

    const result: ConversationsList = await this.httpClient.get(
      `api/conversation?page=${page}`,
    );
    return result;
  }

  async createConversation(req: CreateConversationCommand) {
    const result: { conversation: Conversation } = await this.httpClient.post(
      'api/conversation',
      req,
    );
    return result;
  }

  async sendMessage(req: SendMessageCommand) {
    const result: void = await this.httpClient.post(
      'api/conversation/message',
      req,
    );
    return result;
  }

  async sendGroupMessage(req: SendGroupMessageCommand) {
    const result: void = await this.httpClient.post(
      'api/conversation-group/message',
      req,
    );
    return result;
  }

  async getDiscussions() {
    const result: Discussion[] = await this.httpClient.get('api/group');
    return result;
  }

  async getDiscussionById(req: GetDiscussionByIdCommand) {
    const { id } = req;
    const result: Discussion = await this.httpClient.get(`api/group/${id}`);
    return result;
  }

  async getConversationByUserId(req: GetConversationByUserIdCommand) {
    const { id } = req;
    const result: Omit<Conversation, 'startedBy'> = await this.httpClient.get(
      `api/conversation/exist/${id}`,
    );
    return result;
  }
}
