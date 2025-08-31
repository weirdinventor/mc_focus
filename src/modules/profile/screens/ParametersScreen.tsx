import React from 'react';
import { Wrapper } from './../../../components/Wrapper';
import { ParameterItem } from '../components/ParameterItem';
import { LogoutButton } from '../components/LogoutButton';
import { ParametersStackRoutes } from './../../../navigators/routes';

export const ParametersScreen: React.FC = () => {
  // Pour le web, tu peux remplacer navigation.navigate par un lien <a> ou une fonction router
  const handleNavigate = (route: string) => {
    console.log('Navigate to', route);
    // Exemple avec window.location.href ou un routeur comme react-router
    // window.location.href = route;
  };

    return (
    <Wrapper fullscreen noHorizontalPadding style={{ paddingTop: 32 }}>
        <ParameterItem
          title="parameters.items.main.cgu"
          iconName="list-outline"
          iconType="ionicon"
          onPress={() => null}
        />
        <ParameterItem
          title="parameters.items.main.policy"
          iconName="list-outline"
          iconType="ionicon"
          onPress={() => null}
        />
        <ParameterItem
          title="parameters.items.main.cancelSub"
          iconName="euro"
          iconType="material"
          withBottomBorder={false}
        onPress={() => handleNavigate(ParametersStackRoutes.MANAGE_SUBSCRIPTION)}
        />
        <LogoutButton />
      </Wrapper>
    );
  };
