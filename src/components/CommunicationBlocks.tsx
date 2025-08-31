import ImageAssets from './../assets/images';
import { DiscussionBlock } from './Chat/DiscussionBlock';
 
interface CommunicationBlocksProps {
  onVocalPress: () => void;
  onDiscussionPress: () => void;
}

export const CommunicationBlocks = ({
  onVocalPress,
  onDiscussionPress,
}: CommunicationBlocksProps) => {
  return (
    <div
      style={{
        display: 'flex',
        overflowX: 'auto',
        marginTop: '-10%',
        scrollbarWidth: 'auto', // For Firefox
        WebkitOverflowScrolling: 'touch', // Smooth scrolling for touch devices
       
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '12px',
          paddingLeft: '24px',
          paddingRight: '24px',
        }}
      >
        <DiscussionBlock
          onPress={onDiscussionPress}
          image={ImageAssets.BLOCK_CHAT}
          title="group.joinDiscussion"
        />
        <DiscussionBlock
          image={ImageAssets.BLOCK_MIC}
          onPress={onVocalPress}
          title="group.joinVocal"
        />
      </div>
    </div>
  );
};