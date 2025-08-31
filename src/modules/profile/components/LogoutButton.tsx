import React from 'react';
import { CText } from './../../../components/CText';
import { Colors } from './../../../constants/Colors';
import { useAuth } from './../../../hooks/useAuth';
import { useButtonState } from './../../../hooks/useButtonState';
import { MdLogout } from 'react-icons/md'; // icône Material Logout pour le web

export const LogoutButton = ({
  onOpenLogoutSheet,
}: {
  onOpenLogoutSheet?: () => Promise<{ shouldDisconnect?: boolean }>;
}) => {
  const { logout } = useAuth();
  const { isPressed, buttonProps } = useButtonState();

  const onDisconnectPressHandler = async () => {
    let result;
    if (onOpenLogoutSheet) {
      result = await onOpenLogoutSheet();
    } else {
      result = window.confirm('Voulez-vous vraiment vous déconnecter ?')
        ? { shouldDisconnect: true }
        : {};
    }

    if (result?.shouldDisconnect) {
      logout();
    }
  };

  return (
    <div
      {...buttonProps}
      onClick={onDisconnectPressHandler}
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '24px 16px',
        gap: 8,
        cursor: 'pointer',
        opacity: isPressed ? 0.6 : 1,
        transition: 'opacity 0.1s',
      }}
    >
      <MdLogout size={24} color={Colors.deepRed} />
      <CText
        color="deepRed"
        size="lg_medium"
        text="parameters.items.main.logout"
      />
    </div>
  );
};
