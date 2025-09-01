import { useState } from "react"
import { SearchScreen } from "./SearchScreen"
import { CurrentContentScreen } from "./CurrentContentScreen"
import { RebroadcastContentScreen } from "./RebroadcastContentScreen"
import { SoonContentScreen } from "./SoonContentScreen"
import { FeedScreen } from "./FeedScreen"
import { Button } from "../../../components/New/ui/button"

export default function DisplayHomeScreens() {
 const [currentScreen, setCurrentScreen] = useState("search")

  const renderScreen = () => {
    switch (currentScreen) {
      case "Home":
        return <FeedScreen />
      case "search":
        return <SearchScreen onBack={() => setCurrentScreen("current")} />
      case "current":
        return <CurrentContentScreen />
      case "rebroadcast":
        return <RebroadcastContentScreen />
      case "soon":
        return <SoonContentScreen />
      default:
        return <SearchScreen />
    }
  }

  return (
    <div className="w-full bg-white">
      <div className="mb-4 p-4 bg-gray-100 flex gap-2 flex-wrap justify-center">
        <Button 
          onClick={() => setCurrentScreen("Home")}
          className={`px-4 py-2 rounded text-sm lg:text-base text-blue-900 ${currentScreen === "Home" ? "bg-gradient-to-br from-black via-[#405c57ff] via-[#E79C1C] via-[#E79C1C] to-[#6BE1DF]" : "bg-white hover:bg-gray-50"} transition-colors`}
        >
          Home
        </Button>
        <Button 
          onClick={() => setCurrentScreen("search")}
          className={`px-4 py-2 rounded text-sm lg:text-base text-blue-900 ${currentScreen === "search" ? "bg-gradient-to-br from-black via-[#405c57ff] via-[#E79C1C] via-[#E79C1C] to-[#6BE1DF]" : "bg-white hover:bg-gray-50"} transition-colors`}
        >
          Search
        </Button>
        <Button 
          onClick={() => setCurrentScreen("current")}
          className={`px-4 py-2 rounded text-sm lg:text-base text-blue-900 ${currentScreen === "current" ? "bg-gradient-to-br from-black via-[#405c57ff] via-[#E79C1C] via-[#E79C1C] to-[#6BE1DF] text-white" : "bg-white hover:bg-gray-50"} transition-colors`}
        >
          Live Now
        </Button>
        <Button 
          onClick={() => setCurrentScreen("rebroadcast")}
          className={`px-4 py-2 rounded text-sm lg:text-base text-blue-900 ${currentScreen === "rebroadcast" ? "bg-gradient-to-br from-black via-[#405c57ff] via-[#E79C1C] via-[#E79C1C] to-[#6BE1DF] text-white" : "bg-white hover:bg-gray-50"} transition-colors`}
        >
          Rebroadcast
        </Button>
        <Button 
          onClick={() => setCurrentScreen("soon")}
          className={`px-4 py-2 rounded text-sm lg:text-base text-blue-900 ${currentScreen === "soon" ? "bg-gradient-to-br from-black via-[#405c57ff] via-[#E79C1C] via-[#E79C1C] to-[#6BE1DF] text-white" : "bg-white hover:bg-gray-50"} transition-colors`}
        >
          Coming Soon
        </Button>
      </div>
      {renderScreen()}
    </div>
  )
}