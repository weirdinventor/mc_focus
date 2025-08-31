import type { JSX } from "react"

// --- Custom Component & Hook Imports ---
import { HLSContainer } from "../components/HLSContainer"
import { Screen } from "../../../components/New/ui/screen"

interface MeetingScreenProps {
  onBack?: () => void
}

/**
 * A meeting screen that provides video conferencing functionality.
 * Converted from React Native to web with colorful styling.
 */
export const MeetingScreen = ({ onBack }: MeetingScreenProps): JSX.Element => {
  return (
    <Screen className="bg-gradient-to-br from-primary/5 to-accent/5">
      <h1 className="text-2xl font-bold p-4">Meeting Room</h1>
      <div className="flex-1 bg-gradient-to-b from-background to-muted/20 rounded-lg overflow-hidden">
        <HLSContainer />
      </div>
    </Screen>
  );
};
