import { default as IA } from './../../../assets/images';
import { CImage } from './../../../components/CImage';
import { CText } from './../../../components/CText';

import { FirebaseToken } from './../../../core/domain/entities/FirebaseToken';
import { Token } from './../../../core/domain/entities/Token';
import { useAuth } from './../../../hooks/useAuth';
import { useStripePayments } from './../../../hooks/useStripePayments';
import { useSignUpMutation } from './../../../react-query/queries/auth/authMutations';
import { useGetMeQuery } from './../../../react-query/queries/user/userQueries';
import { queryClient } from './../../../react-query/queryClient';
import { userFactory } from './../../../react-query/queries/queryFactory';
import { SubCard } from '../components/SubCard';
import React, { useState, useRef, useEffect } from 'react';

export const StripeSubscriptionScreen: React.FC = () => {
  const [textsHeight, setTextsHeight] = useState(0);
  const [tokens, setTokens] = useState<Token & FirebaseToken>({
    token: '',
    firebaseToken: '',
  });

  const { login, signup } = useAuth();
  const { data: me } = useGetMeQuery(false);
  const { createSubscription, isLoading: isStripeLoading } = useStripePayments();
  const { mutateAsync: signUpMutation, isPending } = useSignUpMutation();

  const textsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textsRef.current) {
      setTextsHeight(textsRef.current.getBoundingClientRect().height);
    }
  }, []);

  const subscriptions = [
    {
      productId: 'price_1RtUyf04Urg8zeEvskSULleK',
      price: '9.99',
      type: 'monthly',
    },
  ];

  const getSubscriptionPrice = (sub: typeof subscriptions[0]) => sub.price;

  const onSubscribeHandler = async (productId: string) => {
    try {
      let userTokens = tokens;
      if (!userTokens.firebaseToken || !userTokens.token) {
        if (!me?.id) {
          const { firebaseToken, token } = await signUpMutation();
          userTokens = { token, firebaseToken };
          setTokens(userTokens);
          await signup(token, firebaseToken);
        }
      }

      const result = await createSubscription({
        priceId: productId,
        metadata: { source: 'onboarding' },
      });

      if (result.success) {
        if (userTokens.firebaseToken && userTokens.token && !me?.id) {
          await login(userTokens.firebaseToken, userTokens.token);
        }
        await queryClient.invalidateQueries({
          queryKey: userFactory.getMe().queryKey,
        });
      } else {
        alert(result.error || 'Une erreur est survenue lors du paiement.');
      }
    } catch (error) {
      console.error('Erreur abonnement:', error);
      alert('Une erreur est survenue lors de l\'abonnement. Veuillez réessayer.');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundImage: `url(${IA.BG_CLEAN})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '36px 16px 24px',
        position: 'relative',
      }}
    >
      <div ref={textsRef} style={{ marginTop: 36, textAlign: 'center' }}>
        <CText color="pink700" isCentered size="md_bold" text="onboarding.pro" toUppercase />
        <CText
          mt={40}
          color="white"
          isCentered
          size="massive_black"
          text="onboarding.aboniments"
          toUppercase
        />
      </div>

      <div style={{ position: 'absolute', top: textsHeight + 36, left: '50%', transform: 'translateX(-50%)' }}>
        <CImage height={550} width={255} resizeMode="contain" source={IA.IPHONE} />
      </div>

      <div
        style={{
          display: 'flex',
          overflowX: 'auto',
          gap: '8px',
          padding: '0 24px',
          marginTop: textsHeight + 36,
        }}
      >
        {subscriptions.map((sub) => (
          <SubCard
            key={sub.productId}
            price={getSubscriptionPrice(sub)}
            starter={false}
            onPressHandler={() => onSubscribeHandler(sub.productId)}
          />
        ))}
      </div>

      {(isPending || isStripeLoading) && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.6)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
};
