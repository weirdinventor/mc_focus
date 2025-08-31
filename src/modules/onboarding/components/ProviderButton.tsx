import AppleLogo from './../../../assets/svg/AppleLogo.svg?react';
import EtaSymbol from './../../../assets/svg/EtaSymbol.svg?react';
import GoogleLogo from './../../../assets/svg/GoogleLogo.svg?react';
import { Colors } from './../../../constants/Colors';
import { Providers } from './../../../core/domain/entities/Providers';
import React, { ReactNode } from 'react';
import { Pressable, StyleSheet } from 'react-native';

const PROVIDER_LOGO_MAPPER: Record<Providers, ReactNode> = {
  google: <GoogleLogo />,
  apple: <AppleLogo />,
  email: <EtaSymbol /*stroke={Colors.black} strokeWidth={2}*/ />,
};

interface ProviderButtonProps {
  provider: Providers;
  onPress: () => void;
}

export const ProviderButton = ({ provider, onPress }: ProviderButtonProps) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      {PROVIDER_LOGO_MAPPER[provider]}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 80,
    borderWidth: 4,
    borderColor: Colors.grey3,
    height: 72,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
