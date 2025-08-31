import { core } from './../../../config/Configuration';
import { InterestToLiveCommand } from './../../../core/usecases/streamRepo/InterestToLive';
import { JoinStreamCommand } from './../../../core/usecases/streamRepo/JoinStream';
import { JoinVoiceRoomCommand } from './../../../core/usecases/streamRepo/JoinVoiceRoom';
import { defaultQueryResult } from './../../queryHelpers';

const joinStream = async (command: JoinStreamCommand) => {
  const result = await core.joinStream.execute(command);
  return defaultQueryResult(result);
};

const joinVoiceRoom = async (command: JoinVoiceRoomCommand) => {
  const result = await core.joinVoiceRoom.execute(command);
  return defaultQueryResult(result);
};

const interestToLive = async (command: InterestToLiveCommand) => {
  const result = await core.interestToLive.execute(command);
  return defaultQueryResult(result);
};

export const StreamQueryFunctions = {
  joinStream,
  joinVoiceRoom,
  interestToLive,
};
