import { CText } from './../../../components/CText';
import { Colors } from './../../../constants/Colors';
import { useAuth } from './../../../hooks/useAuth';
import { useButtonState } from './../../../hooks/useButtonState';
import { useDeleteAccountMutation } from './../../../react-query/queries/user/userMutations';
import React from 'react';
import { IoRemoveCircleOutline } from 'react-icons/io5'; // icône Ionicons web

export const DeleteAccountButton = () => {
  const { logout } = useAuth();
  const { isPressed, buttonProps } = useButtonState();
  const { mutateAsync: deleteAccount } = useDeleteAccountMutation();

  const onDisconnectPressHandler = async () => {
    const confirmDelete = window.confirm(
      'Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.'
    );

    if (confirmDelete) {
      await deleteAccount();
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
        opacity: isPressed ? 0.6 : 1, // effet visuel simple
      }}
    >
      <IoRemoveCircleOutline size={24} color={Colors.deepRed} />
      <CText
        color="deepRed"
        size="lg_medium"
        text="parameters.items.main.deleteAccount"
      />
    </div>
  );
};
