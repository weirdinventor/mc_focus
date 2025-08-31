import IA from './../../assets/images';
import { CImage } from './../../components/CImage';
import { CText } from './../../components/CText';
import { Colors } from './../../constants/Colors';
import { Resource } from './../../core/domain/entities/Resource';
import { openLink } from './../../utils/openLink';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

type ResourceCardProps = Pick<
  Resource,
  'title' | 'description' | 'image' | 'url'
> & {
  tag: string;
  isContentScreen?: boolean;
};

export const ResourceCard = ({
  title,
  description,
  image,
  url,
  isContentScreen = false,
}: ResourceCardProps) => {
  const onResourcePressHandler = () => {
    openLink(url);
  };

  return (
    <Pressable
      onPress={onResourcePressHandler}
      style={isContentScreen && styles.containerContent}
    >
      <View style={[styles.wrapper, isContentScreen && styles.wrapperContent]}>
        <CImage height={88} source={image || IA.APP_ICON} />
        <View style={styles.textsWrapper}>
          <CText numberOfLines={2} size="sm_bold">
            {title}
          </CText>
          <CText numberOfLines={1} size="sm_medium">
            {description}
          </CText>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  containerContent: { padding: 4, flexBasis: '50%' },
  wrapper: {
    width: 164,
    height: 192,
    backgroundColor: Colors.white,
    borderRadius: 16,
    overflow: 'hidden',
  },
  wrapperContent: { width: 'auto' },
  textsWrapper: {
    margin: 16,
    flex: 1,
    justifyContent: 'center',
  },
});
