import React from 'react';
import { useNavigate } from 'react-router-dom';
import IA from './../../assets/images';
import { CButton } from './../../components/Buttons/CButton';
import { CImage } from './../../components/CImage';
import { CText } from './../../components/CText';
import { ProvidersChoices } from './../../modules/onboarding/components/ProvidersChoices';
import { OnboardingStackRoutes, RootStackRoutes } from './../../navigators/routes';
import { openLink } from './../../utils/openLink';
import { BaseActionSheet } from './BaseActionSheet';

type LoginSheetProps = {
  open?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  onClose?: () => void; // Added to align with BaseSheetProps
};

export const LoginSheet = ({ open = false, onOpenChange, onClose }: LoginSheetProps) => {
  const navigate = useNavigate();

  const onHaveAccountPress = () => {
    onOpenChange?.(false);
    onClose?.(); // Call onClose if provided
    navigate(`${RootStackRoutes.ONBOARDING_STACK}/${OnboardingStackRoutes.LOGIN_SCREEN}`);
  };

  return (
    <BaseActionSheet open={open} onOpenChange={onOpenChange ?? (() => onClose?.())}>
      <div style={styles.container} className='flex flex-col justify-center'>
        <CImage height={72} resizeMode="contain" source={IA.BAG} />
        <CText
          text="onboarding.loginSheet.title"
          size="xxl_extraBold"
          isCentered
          toUppercase
          mb={8}
          mt={24}
        />
        <CText
          text="onboarding.loginSheet.description"
          size="md_medium"
          isCentered
          color="grey"
          mb={24}
        />
        <ProvidersChoices />
        <CText mt={10} isCentered>
          <CText text="onboarding.terms&conditions.agreementText" />
          {' '}
          <CText
            text="onboarding.terms&conditions.terms"
            style={{ textDecoration: 'underline', cursor: 'pointer' }}
            onClick={() =>
              openLink('https://moulaclub.com/app/mobile/politics/cgu')
            }
          />
          {' '}
          <CText text="onboarding.terms&conditions.and" />
          {' '}
          <CText
            text="onboarding.terms&conditions.privacyPolicy"
            style={{ textDecoration: 'underline', cursor: 'pointer' }}
            onClick={() =>
              openLink('https://moulaclub.com/app/mobile/politics/privacy')
            }
          />
        </CText>
        <CButton
          buttonType="secondary"
          text="onboarding.loginSheet.alreadyHave"
          small
          mt={24}
          onClick={onHaveAccountPress}
        />
      </div>
    </BaseActionSheet>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    paddingLeft: 24,
    paddingRight: 24,
  },
};