import { Screen } from "../../../components/New/ui/screen"
import { CurrentLiveArea } from "../components/ComponentLive/CurrentLiveArea"
import { ComingSoonFeed } from "../components/ComingSoonFeed"


export const LiveScreen = () => {

  return (
    <Screen >
      <CurrentLiveArea />
      <ComingSoonFeed />
    </Screen>
  )
}
