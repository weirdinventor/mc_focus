import { JoinStreamCommand } from './../../../core/usecases/streamRepo/JoinStream';
import { JoinVoiceRoomCommand } from './../../../core/usecases/streamRepo/JoinVoiceRoom';
import { LiveRoom } from '../entities/LiveRoom';
import { InterestToLiveCommand } from './../../../core/usecases/streamRepo/InterestToLive';

export interface StreamRepo {
  joinStream(req: JoinStreamCommand): Promise<LiveRoom>;
  joinVoiceRoom(req: JoinVoiceRoomCommand): Promise<LiveRoom>;
  interestToLive(req: InterestToLiveCommand): Promise<void>;
}
