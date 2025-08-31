import { core } from './../../../config/Configuration';
import { CreateConversationCommand } from './../../../core/usecases/chatRepo/CreateConversation';
import { GetUserConversationsCommand } from './../../../core/usecases/chatRepo/GetUserConversations';
import { SendGroupMessageCommand } from './../../../core/usecases/chatRepo/SendGroupMessage';
import { SendMessageCommand } from './../../../core/usecases/chatRepo/SendMessage';
import { defaultQueryResult } from '../../queryHelpers';

const getUserConversations = async (req: GetUserConversationsCommand) => {
  const result = await core.getUserConversations.execute(req);
  return defaultQueryResult(result);
};

const createConversation = async (req: CreateConversationCommand) => {
  const result = await core.createConversation.execute(req);
  return defaultQueryResult(result);
};

const sendMessage = async (req: SendMessageCommand) => {
  const result = await core.sendMessage.execute(req);
  return defaultQueryResult(result);
};

const sendGroupMessage = async (req: SendGroupMessageCommand) => {
  const result = await core.sendGroupMessage.execute(req);
  return defaultQueryResult(result);
};

export const ChatQueryFunctions = {
  getUserConversations,
  createConversation,
  sendMessage,
  sendGroupMessage,
};
