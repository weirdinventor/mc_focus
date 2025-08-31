import { createContext, useContext } from 'react';

interface ReactionContextType {
  activePostId: string | null;
  setActivePostId: (postId: string | null) => void;
}

// 1. Create and export the context
export const ReactionContext = createContext<ReactionContextType>({
  activePostId: null,
  setActivePostId: () => null,
});

// 2. Create and export the custom hook
export const useReactionContext = () => useContext(ReactionContext);