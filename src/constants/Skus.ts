import { Platform } from 'react-native';

export const SUB_SKUS = Platform.select({
  ios: [],
  android: ['moulaclub_sub_1'],
  default: [],
});
