import { Colors } from './../../constants/Colors';
import React, { useMemo, useRef, useState } from 'react';
// Step 1: Import the specific icon from the 'react-icons' library
import { IoSend } from 'react-icons/io5'; // Using Ionicons 5 pack

type TextInputStatuses = 'disabled' | 'error' | 'focused';

export type CustomTextInputProps = {
  state?: TextInputStatuses;
  onSendMessage: (message: string) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'placeholder'>;

export const MessageInput = ({
  state,
  onSendMessage,
  ...textInputProps
}: CustomTextInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [message, setMessage] = useState('');

  const disabled = textInputProps.disabled || state === 'disabled';

  const focusTextInput = () => {
    if (disabled) return;
    inputRef.current?.focus();
  };

  const generateInputWrapperStyle = useMemo(
    () => ({
      ...styles.inputWrapper,
      ...(isFocused && { backgroundColor: Colors.backgroundWhite }),
    }),
    [isFocused],
  );

  const generateInputStyle = useMemo(
    () => ({
      ...styles.input,
      ...styles.text,
      ...(disabled && { color: Colors.primaryBlack }),
    }),
    [disabled],
  );

  const handleSend = (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault(); // Prevent form submission if it's in a form
    if (!message.trim()) return;
    onSendMessage(message);
    setMessage('');
    inputRef.current?.focus(); // Keep the input focused after sending
  };

  return (
    <div
      aria-disabled={disabled}
      role="button"
      onClick={focusTextInput}
      style={styles.container}
    >
      <div style={generateInputWrapperStyle}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Message"
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect="off"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          style={generateInputStyle}
          onKeyDown={(e) => e.key === 'Enter' && handleSend(e)}
        />
        <button
          disabled={!message.trim()}
          onClick={handleSend}
          style={{
            ...styles.sendContainer,
            ...(!message.trim() && styles.sendContainerDisabled),
          }}
        >
          {/* Step 2: Use the imported icon component */}
          <IoSend size={16} color="white" />
        </button>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: { flex: 1 },
  inputWrapper: {
    height: '44px',
    overflow: 'hidden',
    borderRadius: '100px',
    backgroundColor: Colors.textInput.light.main,
    borderColor: Colors.grey3,
    borderWidth: '1px',
    borderStyle: 'solid',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '12px',
    paddingRight: '6px',
    gap: '8px',
  },
  input: {
    flex: 1,
    height: '100%',
    padding: '0',
    border: 'none',
    backgroundColor: 'transparent',
    outline: 'none',
  },
  sendContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '32px',
    width: '32px',
    borderRadius: '50%',
    backgroundColor: Colors.seance600,
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    // The original style had 'paddingLeft: 4' to align the icon.
    // With react-icons, the icon is usually centered, but you can add this back if needed.
    // paddingLeft: '4px'
  },
  text: {
    color: Colors.black,
    fontFamily: 'CabinetGrotesk-Regular', // Ensure this font is loaded in your project
    fontSize: '16px',
  },
  sendContainerDisabled: {
    backgroundColor: Colors.seance400,
    cursor: 'default',
  },
};