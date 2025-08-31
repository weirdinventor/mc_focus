import { CButton } from './../../components/Buttons/CButton';
import { ControlledInput } from './../../components/ControlledInput';
import { Colors } from './../../constants/Colors';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useChangeProfilePictureMutation,
  useChangeUsernameMutation,
} from './../../react-query/queries/user/userMutations';
import { useGetMeQuery } from './../../react-query/queries/user/userQueries';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineStar } from 'react-icons/ai';
import { FiEdit2 } from 'react-icons/fi';
import Modal from 'react-modal';
import { UsernameScheme, usernameScheme } from './../../../src/schemes/username.scheme';
import { EditPictureBlock } from './../../modules/profile/components/EditPictureBlock';

// Define the types for the component's props
interface ProfileSheetProps {
  isOpen?: boolean; // Changed to optional
  onRequestClose?: () => void; // Changed to optional
  onClose?: () => void; // Added to align with BaseSheetProps
}

// Set the app element for accessibility
Modal.setAppElement('#root');

export const ProfileSheet = ({ isOpen = false, onRequestClose, onClose }: ProfileSheetProps) => {
  const { data } = useGetMeQuery();
  const { mutate: changePictureMutation } = useChangeProfilePictureMutation();
  const { mutate: changeUsernameMutation } = useChangeUsernameMutation();

  const [cPhoto, setCPhoto] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  const { control, handleSubmit, watch } = useForm<UsernameScheme>({
    defaultValues: { username: data?.username || '' },
    resolver: zodResolver(usernameScheme),
  });

  const watchUsername = watch('username');

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setCPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSaveChanges = ({ username }: UsernameScheme) => {
    if (cPhoto) {
      changePictureMutation(cPhoto);
    }
    if (username !== data?.username) {
      changeUsernameMutation({ username });
    }
    onRequestClose?.();
    onClose?.(); // Call onClose if provided
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose ?? onClose} // Fallback to onClose if onRequestClose is undefined
      contentLabel="Profile Settings"
      style={{
        content: styles.modalContent,
        overlay: styles.overlay,
      }}
    >
      <div style={styles.panel}>
        <EditPictureBlock
          onPress={() => document.getElementById('fileInput')?.click()}
          style={styles.editBlockContainer as any}
          size={88}
          newPicture={cPhoto || undefined}
          iconPosition={{ top: -14, right: -14 }}
        />
        <input
          type="file"
          id="fileInput"
          style={{ display: 'none' }}
          onChange={handleImageChange}
          accept="image/*"
        />
        <ControlledInput
          name="username"
          control={control}
          placeholderText="onboarding.userInfos.usernamePlaceholder"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          LeftAccessory={() => (
            <AiOutlineStar
              size={24}
              color={isFocused ? Colors.seance400 : Colors.grey6}
            />
          )}
          RightAccessory={() => (
            <FiEdit2
              size={18}
              color={isFocused ? Colors.seance400 : Colors.grey6}
            />
          )}
        />
        <CButton
          onClick={handleSubmit(onSaveChanges)}
          text="profile.saveModifications"
          buttonType="colored"
          disabled={!(cPhoto || watchUsername !== data?.username)}
        />
      </div>
    </Modal>
  );
};

// Styles remain unchanged
const styles: { [key: string]: React.CSSProperties } = {
  modalContent: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: '#fff',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '500px',
    width: '90%',
    border: 'none',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: 1000,
  },
  panel: {
    paddingLeft: 16,
    paddingRight: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    marginTop: 24,
  },
  editBlockContainer: {
    alignSelf: 'center',
  },
};