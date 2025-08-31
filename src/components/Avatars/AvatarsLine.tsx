import React from 'react';
import { CText } from '../CText'; // Assuming CText renders a web element like <span> or <p>
import { SingleAvatar } from './SingleAvatar';

// Define the type for our style objects
type Styles = {
  [key: string]: React.CSSProperties;
};

// empty interface Dakhel React.FC M3ntha component does not accept any props
// c'est pas logic u must find wch yaccepti
// interface AvatarsLineProps {
//   // Props can be defined here if needed
// }

type AvatarsLineProps = Record<string, never>; // this temporary

export const AvatarsLine: React.FC<AvatarsLineProps> = () => {
  return (
    <div style={styles.container}>
      <SingleAvatar />
      <SingleAvatar />
      <div style={styles.additionalMembersContainer}>
        {/* CText should render a web tag like <p> or <span> */}
        <CText size="xs_medium">+2</CText>
      </div>
      <CText size="xs_medium" text="live.paricipants" />
    </div>
  );
};

// Styles are now plain JavaScript objects with CSS properties
const styles: Styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // 'gap' is supported in modern browsers. For overlap, we use negative margin.
    // We apply it to the children instead of using 'gap'.
  },
  additionalMembersContainer: {
    backgroundColor: '#F7F4F2', // Assuming Colors.whiteSand50 is a hex code
    justifyContent: 'center',
    alignItems: 'center',
    width: 26,
    height: 26,
    borderRadius: '50%', // Use '50%' for a perfect circle
    border: '2px solid #FFFFFF', // Assuming Colors.white is a hex code
    marginRight: 8,
    marginLeft: -6, // To create the overlap effect
    boxSizing: 'border-box', // Ensures padding and border are included in the element's total width and height
  },
};