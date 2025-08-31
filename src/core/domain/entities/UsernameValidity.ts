import { IsTaken } from './Taken';

export interface UsernameValidity extends IsTaken {
  suggestions: string[];
}
