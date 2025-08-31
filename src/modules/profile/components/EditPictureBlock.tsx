import ImageAssets from './../../../assets/images';
import { CImage } from './../../../components/CImage';
import { Colors } from './../../../constants/Colors';
import { useGetMeQuery } from './../../../react-query/queries/user/userQueries';
import React from 'react';
import { FiEdit2 } from 'react-icons/fi';

interface IconPosition {
  top: number;
  right: number;
}

interface EditPictureBlockProps {
  size: number;
  iconPosition: IconPosition;
  onPress: () => void;
  style?: React.CSSProperties;
  newPicture?: string;
}

export const EditPictureBlock = ({
  size,
  newPicture,
  style,
  iconPosition,
  onPress,
}: EditPictureBlockProps) => {
  const { data } = useGetMeQuery();

  return (
    <div
      onClick={onPress}
      style={{ display: 'inline-block', position: 'relative', ...style }}
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: 16,
          overflow: 'hidden',
          marginBottom: 8,
        }}
      >
        <CImage
          height="100%"
          source={newPicture || data?.profilePicture || ImageAssets.AVATAR_PINK}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          top: iconPosition.top,
          right: iconPosition.right,
            width: size / 2 - 4,
            height: size / 2 - 4,
          borderRadius: '50%',
          backgroundColor: Colors.black60,
          display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
        }}
      >
        <FiEdit2 color="white" size={14} />
      </div>
    </div>
  );
};
