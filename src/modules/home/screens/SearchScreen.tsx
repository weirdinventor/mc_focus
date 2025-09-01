import type React from "react"
import { useState } from "react"
import { useDebounce } from 'use-debounce';
import { ArrowLeft, Search, MessageCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useSearchUserByUsernameQuery } from "../../../react-query/queries/user/userQueries";
import { RootStackRoutes } from "../../../navigators/routes";


export const SearchScreen: React.FC = () => {
  const [searchInput, setSearchInput] = useState("")

  const navigate = useNavigate();

  const [value] = useDebounce(searchInput, 350);

  const { data: searchResult } = useSearchUserByUsernameQuery(value);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-700 to-purple-800 px-4 lg:px-8 py-3 lg:py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <button onClick={() => navigate(-1)} className="text-white hover:bg-purple-600 p-2 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 lg:w-6 lg:h-6" />
            </button>
            <div className="flex-1 relative max-w-xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                placeholder="Search users..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-10 pr-4 py-2 lg:py-3 bg-white rounded-lg text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
            </div>
            {/* <div className="hidden md:flex items-center space-x-4">
              <MessageCircle className="w-6 h-6 text-white cursor-pointer hover:text-purple-200 transition-colors" />
            </div> */}
          </div>
        </div>
      </div>

      {/* Search Results */}
      {searchResult && searchResult.length > 0 && (
        <div className="px-4 lg:px-8 py-4 lg:py-6">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4 lg:mb-6">Search Suggestions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-4">
              {searchResult.map((user) => (
                <div
                  key={user.id}
                  onClick={() => {
                    navigate(RootStackRoutes.OTHER_USER_SCREEN.replace(':username', user.username),
                      { state: { user: user } })
                  }}
                  className="flex items-center space-x-3 p-3 lg:p-4 bg-white rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:bg-gray-50 hover:shadow-md transition-all duration-200"
                >
                  <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-gray-600 font-medium text-sm lg:text-base">
                      {user.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="font-medium text-gray-900 text-sm lg:text-base truncate">{user.username}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

