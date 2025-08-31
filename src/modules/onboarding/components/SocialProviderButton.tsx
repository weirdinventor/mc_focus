import AppleLogoWhite from './../../../assets/svg/appleLogoWhite.svg?react';
import GoogleLogo from './../../../assets/svg/googleLogo.svg?react';
import EtaSymbol from './../../../assets/svg/etaSymbol.svg?react';
import { CText } from './../../../components/CText';
import { Colors } from './../../../constants/Colors';
import { Providers } from './../../../core/domain/entities/Providers';
import { t } from './../../../i18n';
import React, { ReactNode } from 'react';
// Removed react-native imports

const PROVIDER_LOGO_MAPPER: Record<Providers, ReactNode> = {
  google: <GoogleLogo />,
  apple: <AppleLogoWhite />,
  email: <EtaSymbol  />,
};

const PROVIDER_STYLE_MAPPER: Record<
  Providers,
  { backgroundColor: string; textColor: string }
> = {
  google: { backgroundColor: Colors.white, textColor: Colors.black },
  apple: { backgroundColor: Colors.black, textColor: Colors.white },
  email: { backgroundColor: Colors.white, textColor: Colors.black },
};

interface ProviderButtonProps {
  provider: Providers;
  type: 'login' | 'signup';
  onPress: () => void;
  hasBorder?: boolean;
}

export const SocialProviderButton: React.FC<ProviderButtonProps> = ({
  provider,
  type,
  onPress,
  hasBorder,
}) => {
  const { backgroundColor, textColor } = PROVIDER_STYLE_MAPPER[provider];

  // Inline styles for web
  const containerStyle: React.CSSProperties = {
    borderRadius: 80,
    maxHeight: 72,
    display: 'flex',
    flexDirection: 'row' as const,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor,
    borderWidth: hasBorder ? 4 : undefined,
    borderStyle: hasBorder ? 'solid' : undefined,
    borderColor: hasBorder ? Colors.grey3 : undefined,
    border: hasBorder ? `4px solid ${Colors.grey3}` : undefined,
    cursor: 'pointer',
  };
  const contentStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row' as const,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  };
  const iconContainerStyle: React.CSSProperties = {
    width: 24,
    display: 'flex',
    alignItems: 'center',
    marginRight: 12,
  };

  return (
    <button onClick={onPress} style={containerStyle}>
      <div style={contentStyle}>
        <div style={iconContainerStyle}>
          {PROVIDER_LOGO_MAPPER[provider]}
        </div>
        <CText mt={2} size="md_black" style={{ color: textColor }}>
          {type === 'login'
            ? provider === 'google'
              ? t('common.google_login')
              : provider === 'apple'
                ? t('common.apple_login')
                : t('common.email_login')
            : provider === 'google'
              ? t('common.google_signup')
              : provider === 'apple'
                ? t('common.apple_signup')
                : t('common.email_signup')}
        </CText>
      </div>
    </button>
  );
};

// ...existing code...
