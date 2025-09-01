import { useState } from 'react';
import { ArrowLeft, Edit2, ChevronRight, FileText, Shield, LogOut, Trash2, CreditCard } from 'lucide-react';
import { CText } from './../../../components/CText';
import { TopHeaderBar } from './../../../components/Headers/TopHeaderBar';
import { useGetMeQuery } from './../../../react-query/queries/user/userQueries';
import { EditPictureBlock } from './EditPictureBlock';
import { openLink } from './../../../utils/openLink';
import { LogoutButton } from './LogoutButton';
import { ParameterItem } from './ParameterItem';
import { DeleteAccountButton } from './DeleteAccountButton';
import { useNavigate } from 'react-router-dom';
import { ParametersStackRoutes, RootStackRoutes } from './../../../navigators/routes';

// Styled ProfileHeader component
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
        background: `linear-gradient(135deg, #000000 0%, #000000 25%, #1a1a1a 35%, #2a3a2a 45%, #405c57ff 55%, #E79C1C 75%, #6BE1DF 100%)`,
        overflow: 'hidden'
      }}
    >
      {/* Decorative background */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 256,
          height: 256,
          opacity: 0.1
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '50%',
            transform: 'translate(64px, -64px)'
          }}
        />
      </div>

      <TopHeaderBar text="profile.profil" />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'flex-start',
          padding: 24,
          position: 'relative',
          zIndex: 1
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
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
            }}
          >
            <h3 style={{ margin: 0, marginBottom: 16, fontSize: 18, fontWeight: 600 }}>
              Modifier la photo
            </h3>
            <button 
              onClick={closeModal}
              style={{
                marginTop: 16,
                padding: '8px 16px',
                backgroundColor: '#7c3aed',
                color: 'white',
                border: 'none',
                borderRadius: 8,
                cursor: 'pointer',
                fontWeight: 500
              }}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
