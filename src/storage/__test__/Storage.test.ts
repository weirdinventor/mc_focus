import { PersistenceStorage } from '..';

const MOCKED_STRING_KEY = 'mockedString';
const MOCKED_NUMBER_KEY = 'mockedNumber';
const MOCKED_BOOLEAN_KEY = 'mockedBoolean';

describe('[STORAGE MMKV]', () => {
  let storageService: typeof PersistenceStorage;

  beforeAll(() => {
    storageService = PersistenceStorage;
  });

  it('functions correctly', () => {
    storageService.setItem(MOCKED_STRING_KEY, 'value');
    expect(storageService.getItem(MOCKED_STRING_KEY)).toStrictEqual('value');

    storageService.setItem(MOCKED_NUMBER_KEY, 99);
    expect(storageService.getItem(MOCKED_STRING_KEY)).toStrictEqual('value');
    expect(storageService.getItem(MOCKED_NUMBER_KEY)).toStrictEqual(99);

    storageService.setItem(MOCKED_BOOLEAN_KEY, false);
    expect(storageService.getItem(MOCKED_STRING_KEY)).toStrictEqual('value');
    expect(storageService.getItem(MOCKED_NUMBER_KEY)).toStrictEqual(99);
    expect(storageService.getItem(MOCKED_BOOLEAN_KEY)).toStrictEqual(false);

    storageService.removeItem(MOCKED_BOOLEAN_KEY);
    expect(storageService.getItem(MOCKED_BOOLEAN_KEY)).toBeNull();
    expect(storageService.getItem(MOCKED_STRING_KEY)).toStrictEqual('value');

    storageService.clearAll();
    expect(storageService.getItem(MOCKED_NUMBER_KEY)).toBeNull();
    expect(storageService.getItem(MOCKED_STRING_KEY)).toBeNull();
  });
});
