import { CImage } from '@components/CImage';
import { CachedImage } from '@georstat/react-native-image-cache';
import { render } from '@testing-library/react-native';
import React from 'react';

jest.mock('@georstat/react-native-image-cache', () => ({
  CachedImage: jest
    .fn()
    .mockImplementation(({ style }) => <div style={style} />),
}));

describe('[COMPONENTS]: CImage', () => {
  it('renders correctly with mandatory and optional props', () => {
    const source = 'https://example.com/image.png';
    const height = 200;
    const width = 100;

    render(<CImage source={source} height={height} width={width} />);
    expect(CachedImage).toHaveBeenCalledWith(
      {
        source: source,
        thumbnailSource: source,
        resizeMode: 'cover',
        maxAge: 48,
        style: [
          { alignSelf: 'center' },
          {
            width: width,
            height: height,
          },
        ],
      },
      expect.anything(),
    );
  });

  it('renders correctly with default width', () => {
    const source = 'https://example.com/image.png';
    const height = '50%';

    render(<CImage source={source} height={height} />);

    expect(CachedImage).toHaveBeenCalledWith(
      {
        source: source,
        thumbnailSource: source,
        resizeMode: 'cover',
        maxAge: 48,
        style: [
          { alignSelf: 'center' },
          {
            width: '100%',
            height: height,
          },
        ],
      },
      expect.anything(),
    );
  });
});
