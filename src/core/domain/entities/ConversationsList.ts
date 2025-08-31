import { Conversation } from './Conversation';
import { Pagination } from './Pagination';

export interface ConversationsList {
  conversations: Conversation[];
  pagination: Pagination;
}
