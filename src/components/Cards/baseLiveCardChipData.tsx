import { LiveDot } from './../../components/LiveDot';
import { Colors } from './../../constants/Colors';
import React, { ComponentType } from 'react';
import { I18nKeyPath } from './../../../src/i18n/types';

// Étape 1 : Importer les icônes spécifiques de 'react-icons'
import { FiAirplay } from 'react-icons/fi'; // Pour le type 'feather'
import { GoClock } from 'react-icons/go';   // Pour le type 'octicon'
import { MdVisibility } from 'react-icons/md'; // Remplacement pour 'material-community'

export type CardType = 'rebroadcast' | 'soon' | 'annonces' | 'currentLive';

type ChipDataI = {
  text: I18nKeyPath;
} & EitherIconOrAccessory;

// Ce type conditionnel est déjà compatible avec le web
type EitherIconOrAccessory =
  | { name: string; icon: ComponentType<{ size?: number; color?: string }>; leftAccessory?: never }
  | { leftAccessory: ComponentType; name?: never; icon?: never };

// Étape 2 : Mettre à jour la structure pour utiliser le composant icône directement
export const LEFT_CHIP_DATA: Record<CardType, ChipDataI> = {
  rebroadcast: { text: 'live.rebroadcast', name: 'airplay', icon: FiAirplay },
  soon: { text: 'live.time2', name: 'clock', icon: GoClock },
  annonces: { text: 'live.time', name: 'clock', icon: GoClock },
  currentLive: {
    text: 'live.liveHappening',
    leftAccessory: () => <LiveDot dotColor={Colors.deepRed} />,
  },
};

export const RIGHT_CHIP_DATA: Record<CardType, ChipDataI> = {
  rebroadcast: {
    text: 'live.viewing',
    // Étape 3 : Remplacer l'ancien composant Icon par le nouveau
    leftAccessory: () => (
      <MdVisibility size={14} color={Colors.white} />
    ),
  },
  soon: {
    text: 'live.interested',
    leftAccessory: () => <LiveDot />,
  },
  annonces: {
    text: 'live.interested',
    leftAccessory: () => <LiveDot />,
  },
  currentLive: {
    text: 'live.viewing',
    leftAccessory: () => (
      <MdVisibility size={14} color={Colors.white} />
    ),
  },
};

// Cette partie ne nécessite aucune modification
export const BOTTOM_CHIP_DATA: Record<CardType, I18nKeyPath> = {
  rebroadcast: 'chipTexts.watch',
  soon: 'chipTexts.alert',
  annonces: 'chipTexts.alert',
  currentLive: 'chipTexts.watch',
};