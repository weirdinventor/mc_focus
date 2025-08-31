import { useState } from 'react';
import { CText } from './../../../components/CText';
import { TopHeaderBar } from './../../../components/Headers/TopHeaderBar';
import { useGetMeQuery } from './../../../react-query/queries/user/userQueries';
import { EditPictureBlock } from './EditPictureBlock';

export const ProfileHeader = () => {
  const { data } = useGetMeQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onEditPicture = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      style={{
        position: 'relative',
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        paddingTop: 16,
        background: `linear-gradient(29.74deg, #CA82FF -122.6%, #CD80F0 -91.2%, #A61EDF -58.73%, #1C0024 93.9%)`

      }}
    >
      <TopHeaderBar text="profile.profil" />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'flex-start',
          padding: 24,
        }}
      >
        <EditPictureBlock
          onPress={onEditPicture}
          size={64}
          iconPosition={{ top: -10, right: -10 }}
        />
        <CText toUppercase size="xxxl_black" color="white">
          {data?.username}
        </CText>
      </div>

      {/* Modal pour l'édition de l'image */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: 24,
              borderRadius: 16,
              minWidth: 300,
            }}
          >
            <h3>Modifier la photo</h3>
            <button onClick={closeModal} style={{ marginTop: 16 }}>
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
