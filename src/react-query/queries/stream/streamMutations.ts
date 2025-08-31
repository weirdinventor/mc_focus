import { useMutation } from '@tanstack/react-query';
import { StreamQueryFunctions } from './_streamQueryFunctions';

export const useJoinStreamMutation = () => {
  return useMutation({ mutationFn: StreamQueryFunctions.joinStream });
};

export const useJoinVoiceRoomMutation = () => {
  return useMutation({ mutationFn: StreamQueryFunctions.joinVoiceRoom });
};

export const useInterestToLiveMutation = () => {
  return useMutation({ mutationFn: StreamQueryFunctions.interestToLive });
};
