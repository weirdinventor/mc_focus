import React from 'react';
import { openLink } from './../../../utils/openLink';
import { LogoutButton } from './LogoutButton';
import { ParameterItem } from './ParameterItem';
import { DeleteAccountButton } from './DeleteAccountButton';
import { useNavigate } from 'react-router-dom'; // Pour la navigation web
import { ParametersStackRoutes, RootStackRoutes } from './../../../navigators/routes';
import { useGetMeQuery } from './../../../react-query/queries/user/userQueries';

export const ProfileInfos = () => {
  const navigate = useNavigate();
  const { data: me } = useGetMeQuery();

  const onManageSubscription = () => {
    // Navigation web équivalente
    navigate(`/${RootStackRoutes.PARAMETERS_STACK}/${ParametersStackRoutes.MANAGE_SUBSCRIPTION}`);
  };

  return (
    <div style={styles.container}>
      {/* Afficher la gestion d'abonnement seulement si l'utilisateur est abonné */}
      {me?.isSubscribed && (
        <ParameterItem
          title="parameters.items.main.subscription"
          iconName="card-outline"
          iconType="ionicon"
          onPress={onManageSubscription}
        />
      )}

      <ParameterItem
        title="parameters.items.main.cgu"
        iconName="list-outline"
        iconType="ionicon"
        onPress={() =>
          openLink('https://moulaclub.com/app/mobile/politics/cgu')
        }
      />
      <ParameterItem
        title="parameters.items.main.policy"
        iconName="list-outline"
        iconType="ionicon"
        onPress={() =>
          openLink('https://moulaclub.com/app/mobile/politics/privacy')
        }
      />

      <LogoutButton />
      <DeleteAccountButton />
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 16px',
    marginTop: 20,
  },
};
