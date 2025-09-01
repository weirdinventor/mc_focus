import React, { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiInbox } from 'react-icons/fi';
import { TOptions } from 'i18next'; // 1. Importer le type TOptions

// 2. Importer votre fonction d'aide 't' et le type I18nKeyPath depuis votre fichier de configuration
import { t } from '../../i18n'; // Assurez-vous que le chemin est correct
import { I18nKeyPath } from '../../i18n/types'; // Assurez-vous que le chemin est correct

import { BackButton } from '../Buttons/BackButton';
import { Mail, Search } from 'lucide-react';
import { RootStackRoutes } from '../../navigators/routes';

interface TopHeaderBarProps {
  text?: I18nKeyPath;
  textOptions?: TOptions; // 3. Utiliser le type TOptions correct pour les options
  withBackButton?: boolean;
  withMessage?: boolean;
}

export const TopHeaderBar = ({
  text,
  textOptions,
  withBackButton,
  withMessage = true,
}: TopHeaderBarProps) => {
  const navigate = useNavigate();

  const cTextStyle: CSSProperties = {
    fontSize: '1.5rem',
    fontWeight: 800,
    color: 'white',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  return (
    <div style={styles.container}>
      <div style={styles.titleWrapper}>
        {withBackButton && <BackButton />}
        {text && (
          <span style={cTextStyle}>
            {/* 4. Utiliser la fonction 't' importée, la logique reste la même */}
            {t(text, textOptions)}
          </span>
        )}
      </div>
      {/* <div className="flex items-center space-x-3">
        <Search className="w-6 h-6 text-white cursor-pointer hover:text-purple-200 transition-colors"
          onClick={() => navigate(RootStackRoutes.SEARCH_SCREEN)} />
        <Mail className="w-6 h-6 text-white cursor-pointer hover:text-purple-200 transition-colors"
          onClick={() => navigate(RootStackRoutes.MESSAGES_LIST_SCREEN)} />
      </div> */}
    </div>
  );
};

// Les styles restent les mêmes (CSS-in-JS)
const styles: { [key: string]: CSSProperties } = {
  container: {
    gap: 34,
    paddingLeft: 16,
    paddingRight: 16,
    height: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    overflow: 'hidden',
  },
  iconsWrapper: {
    gap: 12,
    display: 'flex',
    flexDirection: 'row',
  },
  iconButton: {
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};