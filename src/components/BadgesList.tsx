import React from 'react';
import { format, parseISO } from 'date-fns';
import {
  useGetMeQuery,
  useGetUserBadgesQuery,
} from './../react-query/queries/user/userQueries'; // This hook remains the same

// Import the web versions of your components
import { CText } from './../components/CText';

// --- Mock Data (replace with your actual constants) ---
const Colors = {
  black: '#000000',
  wildSand950: '#1a1a1a',
  grey6: '#888888',
};
// --- Mock Entities (for TypeScript) ---
interface Badge {
  id: string;
  name: string;
  pictureUrl: string;
  earnedTimestamp: string;
}

// --- Styles CSS which replace StyleSheet ---
const componentStyles = `
  .badges-list-container {
    width: 100%;
    padding-top: 32px;
  }
  .badges-list-title {
    margin-left: 24px;
    margin-bottom: 16px; /* Added for spacing */
  }
  .badges-list-scroll-container {
    display: flex;
    overflow-x: auto; /* Enables horizontal scrolling */
    padding-bottom: 16px; /* Makes space for scrollbar if visible */
    scrollbar-width: none; /* Hides scrollbar in Firefox */
    -ms-overflow-style: none;  /* Hides scrollbar in IE/Edge */
  }
  .badges-list-scroll-container::-webkit-scrollbar {
    display: none; /* Hides scrollbar in Chrome/Safari */
  }
  .badges-list-content {
    display: flex;
    flex-direction: row;
    padding: 0 24px;
    gap: 12px; /* Replaces ItemSeparatorComponent */
  }
  .badge-item {
    width: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 8px;
    flex-shrink: 0; /* Prevents items from shrinking */
  }
  .badge-image {
    width: 80px;
    height: 80px;
    object-fit: contain; /* Equivalent to resizeMode="contain" */
  }
  .badge-text-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 4px;
    margin-top: 4px;
  }
  .badges-state-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 24px;
    min-height: 100px;
  }
  /* Simple CSS Loading Spinner */
  .loader {
    border: 4px solid #f3f3f3;
    border-top: 4px solid ${Colors.black};
    border-radius: 50%;
    width: 24px;
    height: 24px;
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// --- Interface for Props ---
interface BadgesListProps {
  type: 'personal' | 'external';
  userId?: string;
}

export const BadgesList = ({ type, userId }: BadgesListProps) => {
  // --- Data Fetching Logic (remains identical) ---
  const { data, isFetching: isFetchingUser } = useGetMeQuery(
    type === 'personal',
  );
  const { data: userBadges, isFetching: isFetchingUserBadges } =
    useGetUserBadgesQuery(
      { userId: userId ?? '' },
      type === 'external' && !!userId,
    );

  // --- Helper Functions (remain identical) ---
  const formatDate = (dateString: string) => {
    try {
      const date = parseISO(dateString);
      return format(date, 'MMM d, yyyy');
    } catch (error) {
      return dateString; // Fallback for invalid dates
    }
  };

  const isFetching = (type === 'personal' && isFetchingUser) || (type === 'external' && isFetchingUserBadges);
  const badgesData = type === 'personal' ? data?.badges : userBadges;
  const isEmpty = !badgesData || badgesData.length === 0;

  return (
    <>
      <style>{componentStyles}</style>
      <section className="badges-list-container">
        <CText
          text="Badges"
          color="black"
          size="lg_extraBold"
          className="badges-list-title"
        />

        {isFetching ? (
          <div className="badges-state-container">
            <div className="loader" />
          </div>
        ) : isEmpty ? (
          <div className="badges-state-container">
            <CText
              text="No badges earned yet."
              color="black"
              size="sm_medium"
            />
          </div>
        ) : (
          <div className="badges-list-scroll-container">
            <div className="badges-list-content">
              {badgesData.map((item: Badge) => (
                <div key={item.id} className="badge-item">
                  <img
                    src={item.pictureUrl}
                    className="badge-image"
                    alt={item.name} // Alt text is crucial for accessibility
                  />
                  <div className="badge-text-container">
                    <CText size="xs_medium" color="grey">
                      {formatDate(item.earnedTimestamp)}
                    </CText>
                    <CText color="black" size="sm_medium">
                      {item.name}
                    </CText>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
};