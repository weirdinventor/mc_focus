import { CImage } from './../../components/CImage';
import { CText } from './../../components/CText';
import { MicrophoneBox } from './../../components/MicrophoneBox';
import { Colors } from './../../constants/Colors';
import { useMeeting, useParticipant } from '@videosdk.live/react-sdk';
import React, { memo, useMemo } from 'react';

interface ParticipantCardProps {
  participantId: string;
  small?: boolean;
}

const ParticipantCard = ({
  participantId,
  small = false,
}: ParticipantCardProps) => {
  // Hook pour les données en temps réel (micro, webcam, etc.)
  const { displayName, micOn, isActiveSpeaker } = useParticipant(participantId);

  // Hook pour accéder au contexte global de la réunion
  const { participants } = useMeeting();

  // Générer l'URL de l'avatar avec les initiales via l'API UI Avatars
  const avatarUrl = useMemo(() => {
    const name = encodeURIComponent(displayName || 'John Doe'); // URL-encoder le nom pour gérer les caractères spéciaux
    const size = small ? 40 : 62; // Taille basée sur le prop small
    return `https://ui-avatars.com/api/?name=${name}&background=0D8ABC&color=fff&size=${size}&rounded=true&length=2`;
  }, [displayName, small]);

  return (
    <div style={{ ...styles.mainContainer, ...(small && styles.smallContainer) }}>
      <div
        style={{
          ...styles.container,
          ...(isActiveSpeaker && micOn && styles.activeSpeakerActive),
        }}
      >
        <MicrophoneBox
          isMuted={!micOn}
          size={small ? 24 : 37}
          iconSize={small ? 12 : 20}
        />
        <div style={styles.imageContainer}>
          <CImage
            source={avatarUrl}
            height={small ? 40 : 62}
            width={small ? 40 : 62}
            style={styles.imageBorder}
          />
        </div>
        <CText
          style={styles.textWidth}
          size={small ? 'xxs_medium' : 'md_medium'}
          isCentered
          numberOfLines={1}
        >
          {displayName}
        </CText>
      </div>
    </div>
  );
};

export const MemoizedParticipantCard = memo(ParticipantCard);

// Le reste du fichier (styles) reste inchangé
const absoluteFill: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

const styles: { [key: string]: React.CSSProperties } = {
  mainContainer: {
    padding: '4px',
    flexBasis: '50%',
    boxSizing: 'border-box',
  },
  smallContainer: {
    flexBasis: '33.33%',
  },
  container: {
    backgroundColor: Colors.white,
    borderRadius: '12px',
    padding: '6px',
    paddingBottom: '12px',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: Colors.transparent,
    position: 'relative',
    width: '100%',
    aspectRatio: '1 / 1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageContainer: {
    ...absoluteFill,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBorder: {
    borderRadius: '8px',
  },
  textWidth: {
    maxWidth: '80px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  activeSpeakerActive: {
    borderColor: Colors.seance600,
  },
};