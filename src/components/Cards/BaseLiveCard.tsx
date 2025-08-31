import IA from '../../assets/images';
import { PlayButton } from '../../components/Buttons/PlayButton';
import { CImage } from '../../components/CImage';
import { InfoChip } from '../../components/InfoChip';
import { MCLinearGradient } from '../../components/MCLinearGradient';
import { Colors } from '../../constants/Colors';
import { RootStackRoutes } from './../../navigators/routes';
import { useGetMeQuery } from '../../react-query/queries/user/userQueries';
import { useInterestToLiveMutation } from './../../react-query/queries/stream/streamMutations';

import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';

import {
  BaseLiveCardDescription,
  BaseLiveCardDescriptionProps,
} from './BaseLiveCardDescription';
import { CardType, LEFT_CHIP_DATA } from './baseLiveCardChipData';

export interface BaseLiveCardProps extends BaseLiveCardDescriptionProps {
  type: CardType;
  id: string;
  coverPicture?: string;
  subscriptionRequired: boolean;
  startsIn?: string;
  peopleAmount?: number;
  videoUrl?: string;
}

export const BaseLiveCard = ({
  title,
  id,
  description,
  author,
  timeAgo,
  type,
  coverPicture,
  subscriptionRequired,
  startsIn,
  profilePicture,
  videoUrl,
}: BaseLiveCardProps) => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);

  const { data: me } = useGetMeQuery();
  const { mutate } = useInterestToLiveMutation();

  const notSubscribed = subscriptionRequired && !me?.isSubscribed;

  const onCardPress = (e: React.MouseEvent) => {
    // Empêche le déclenchement de l'action si on clique sur les contrôles du lecteur vidéo
    if ((e.target as HTMLElement).closest('.react-player__controls')) {
      e.stopPropagation();
      return;
    }

    if (type === 'soon') {
      if (window.confirm(`Le live commence dans ${startsIn}. Voulez-vous enregistrer un rappel ?`)) {
        mutate({ liveId: id });
      }
      return;
    }

    if (notSubscribed) {
      return navigate(RootStackRoutes.SUB_SCREEN);
    }

    if (type === 'rebroadcast' && !notSubscribed && !isPlaying) {
      setIsPlaying(true);
    }
  };

  // Récupère les données du chip pour le type de carte actuel
  const chipData = LEFT_CHIP_DATA[type];

  return (
    <div onClick={onCardPress} style={styles.container}>
      <div style={styles.topWrapper}>
        <CImage
          style={{ ...styles.imageContainer, opacity: isPlaying ? 0 : 1 }}
          height="100%"
          source={coverPicture || IA.APP_ICON}
        />

        {type === 'rebroadcast' && !notSubscribed && (
          <div style={styles.playWrapper}>
            {isPlaying ? (
              <ReactPlayer
                className="react-player__controls" // Classe pour l'événement de clic
                src={videoUrl}
                playing={true}
                controls={true}
                width="100%"
                height="100%"
              />
            ) : (
              <div style={styles.playButtonContainer}>
                <PlayButton />
              </div>
            )}
          </div>
        )}

        {/* Cache les chips et le dégradé lorsque la vidéo est en lecture */}
        {!isPlaying &&
          (notSubscribed ? (
            <MCLinearGradient
              style={styles.linearWrapper}
              colors={Colors.gradients.blacToWhiteTransparent}
              angle={170}
            >
              <InfoChip name="lock" type="feather" text="live.moulaclubPlus" />
            </MCLinearGradient>
          ) : (
            <div style={styles.chipContainer}>
              {/*
               * CORRECTION APPLIQUÉE ICI :
               * On utilise le "spread operator" {...chipData} pour passer les props
               * (`text`, `icon`, `name`, `leftAccessory`) directement au composant InfoChip.
               * Cela correspond à la nouvelle structure de données et résout l'erreur.
               */}
              <InfoChip
                {...chipData}
                textOptions={{ time: startsIn }}
              />
            </div>
          ))}
      </div>
      <div style={styles.wrapper}>
        <BaseLiveCardDescription
          author={author}
          profilePicture={profilePicture}
          timeAgo={timeAgo}
          title={title}
          description={description}
        />
        <div style={styles.bottomContainer}></div>
      </div>
    </div>
  );
};

const absoluteFill: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: 'calc(100vw - 68px)',
    maxWidth: '400px',
    backgroundColor: Colors.white,
    borderRadius: '20px',
    overflow: 'hidden',
    cursor: 'pointer',
  },
  topWrapper: {
    height: '136px',
    position: 'relative',
    backgroundColor: '#000', // Fond noir pour la transition
  },
  chipContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '12px',
    position: 'relative',
    zIndex: 2,
  },
  wrapper: { margin: '0 12px 16px 12px' },
  imageContainer: {
    ...absoluteFill,
    zIndex: 1,
    objectFit: 'cover',
    transition: 'opacity 0.3s ease-in-out', // Pour un fondu doux
  },
  playWrapper: {
    ...absoluteFill,
    zIndex: 3,
  },
  playButtonContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  linearWrapper: {
    ...absoluteFill,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  bottomContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
};