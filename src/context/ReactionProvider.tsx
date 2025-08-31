import React, { useState } from 'react';
import { ReactionContext } from './ReactionContext'; // Import the context

export const ReactionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activePostId, setActivePostId] = useState<string | null>(null);

  return (
    <ReactionContext.Provider value={{ activePostId, setActivePostId }}>
      {children}
    </ReactionContext.Provider>
  );
};