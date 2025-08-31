import React from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Replaced useNavigation
import { useAppDispatch, useAppSelector } from '../../store/index';
import { HeaderActions } from '../../store/headerSlice';
import { FiChevronLeft } from 'react-icons/fi'; // 2. Replaced react-native-easy-icon

// Assuming your Colors object is available for the web.
// If not, you can use hex codes directly.
import { Colors } from '../../constants/Colors';

interface BackButtonProps {
  color?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ color = Colors.white }) => {
  const navigate = useNavigate(); // 1. useNavigate is the hook for web navigation
  const dispatch = useAppDispatch();
  const { headerTitle } = useAppSelector((state) => state.header);

  const onBackHandler = () => {
    if (headerTitle) {
      dispatch(HeaderActions.resetHeaderTitle());
    }
    navigate(-1); // 1. navigate(-1) is the equivalent of navigation.goBack()
  };

  return (
    // 3. Replaced Pressable with <button> and onPress with onClick
    <button onClick={onBackHandler} style={styles.button}>
      <FiChevronLeft size={20} color={color} />
    </button>
  );
};

// Basic styling to make the button look like an icon-only button
const styles = {
  button: {
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};