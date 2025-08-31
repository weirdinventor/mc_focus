import { RootStackRoutes } from './../../navigators/routes'; // Assuming routes are compatible
import { useGetMeQuery } from './../../react-query/queries/user/userQueries';
import { Section, TransformedMessage } from './../../utils/transformChatData';
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageBubble } from './MessageBubble';
import { SectionChatHeader } from './SectionChatHeader';

interface SectionChatListProps {
  sectionListData: Section[];
  isGroup?: boolean;
}

export const SectionChatList = ({
  sectionListData,
  isGroup,
}: SectionChatListProps) => {
  const { data: me } = useGetMeQuery();
  const navigate = useNavigate(); // Replaces useNavigation
  const listRef = useRef<HTMLDivElement>(null);

  // The 'inverted' prop in React Native renders items from bottom to top.
  // We replicate this with flex-direction: column-reverse.
  // This useEffect scrolls the container to the "bottom" (which is visually the top
  // because of column-reverse) when the component mounts. You might adjust this
  // behavior depending on your needs.
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, []);

  const onIconPressHandler = (item: TransformedMessage) => {
    if (!isGroup || !item.createdAt || item.senderId === me?.id) return;

    // Navigation using React Router
    // The state is passed along with the navigation action.
    navigate(RootStackRoutes.OTHER_USER_SCREEN, {
      state: {
        id: item.senderId,
        username: item.username,
        profilePicture: item.profilePicture,
        createdAt: item.createdAt,
      },
    });
  };

  // SectionList is replaced by mapping over the sections array.
  // The outer div uses 'column-reverse' to mimic the 'inverted' prop.
  return (
    <div ref={listRef} style={styles.container}>
      <div style={styles.contentContainer}>
        {sectionListData.map((section) => (
          <React.Fragment key={section.title}>
            {/* The inverted list renders items first, then the header/footer. */}
            {section.data.map((item) => (
              <MessageBubble
                key={item.uid}
                onIconPress={() => onIconPressHandler(item)}
                profilePicture={item.profilePicture}
                username={item.username}
                text={item.text}
              />
            ))}
            {/* renderSectionFooter becomes the header in our reversed list */}
            <SectionChatHeader title={section.title} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

// For performance with very long lists, consider using a virtualization library
// like 'react-virtualized' or 'react-window' as a replacement for SectionList's optimizations.

const styles: { [key: string]: React.CSSProperties } = {
  // Styles from the original 'container' are applied here.
  container: {
    width: '100%',
    paddingLeft: '24px',
    paddingRight: '24px',
    marginTop: '16px',
    // The following styles help replicate the scrollable and inverted behavior
    display: 'flex',
    flexDirection: 'column-reverse', // Mimics 'inverted'
    overflowY: 'auto', // Enables scrolling
  },
  // Styles from the original 'contentContainer' are applied here.
  contentContainer: {
    display: 'flex',
    flexDirection: 'column', // Items within the list flow normally top-to-bottom
    gap: '24px',
  },
};