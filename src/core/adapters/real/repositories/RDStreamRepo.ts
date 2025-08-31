import { LiveRoom } from './../../../../core/domain/entities/LiveRoom';
import { StreamRepo } from './../../../../core/domain/repositories/StreamRepo';
import { InterestToLiveCommand } from './../../../../core/usecases/streamRepo/InterestToLive';
import { JoinStreamCommand } from './../../../../core/usecases/streamRepo/JoinStream';
import { JoinVoiceRoomCommand } from './../../../../core/usecases/streamRepo/JoinVoiceRoom';
import { AxiosInstance } from 'axios';

export class RDStreamRepo implements StreamRepo {
  constructor(private httpClient: AxiosInstance) {}

  async joinStream(req: JoinStreamCommand) {
    const result: LiveRoom = await this.httpClient.post('api/stream/join', req);
    return result;
  }

  async joinVoiceRoom(req: JoinVoiceRoomCommand) {
    const result: LiveRoom = await this.httpClient.post(
      'api/stream/voice/join',
      req,
    );
    return result;
  }

  async interestToLive(req: InterestToLiveCommand) {
    const result: void = await this.httpClient.post('api/live/interest', req);
    return result;
  }
}
