import { useEffect, useState } from "react"
import { Category } from "../../../core/domain/entities/Category"
import { useGetCategoriesQuery, useGetFeedPostsQuery } from "../../../react-query/queries/feed/feedQueries"
import { useGetMeQuery } from "../../../react-query/queries/user/userQueries"
import { Search, MessageCircle } from "lucide-react"
import { FeedComponent } from "../components/post/FeedPosts"


interface FeedScreenProps {
  ongoingLive?: any
  categories?: Category[]
  userId?: string
}

export const FeedScreen: React.FC<FeedScreenProps> = ({}) => {
  const { data: categories } = useGetCategoriesQuery();
  const { refetch: fetchMe } = useGetMeQuery(false);
  const [userId, setUserId] = useState<string>();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );
  const { fetchNextPage, hasNextPage } = useGetFeedPostsQuery({
    categoryId: selectedCategoryId || undefined,
  });

  const loadNext = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const handleCategoryPress = (id: string | null) => {
    setSelectedCategoryId(id);
  };

  useEffect(() => {
    const init = async () => {
      try {
        const { data: userData } = await fetchMe();
        const uid = userData?.id ?? '';
        setUserId(uid);
      } catch (error) {
        // noop
      }
    };

    init();
  }, [fetchMe]);

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-8">

      {/* Header */}
      <div className="bg-gradient-to-r from-purple-700 to-purple-800 px-4 lg:px-8 py-3 lg:py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
              <h1 className="text-white text-xl lg:text-2xl font-semibold">FEED</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Search className="w-6 h-6 text-white cursor-pointer hover:text-purple-200 transition-colors" />
              <MessageCircle className="w-6 h-6 text-white cursor-pointer hover:text-purple-200 transition-colors" />
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex px-4 lg:px-8 overflow-x-auto scrollbar-hide">
            {(categories ?? []).map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryPress(category.id)}
                className={`py-4 px-3 mr-6 text-sm lg:text-base font-medium border-b-2 transition-colors whitespace-nowrap ${
                  selectedCategoryId === category.id
                    ? "border-purple-600 text-purple-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <FeedComponent categoryId={selectedCategoryId} userId={userId ?? ''} />

      {/* Bottom Navigation - Hidden on desktop --- I DON'T KNOW WHAT IS THIS */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 md:hidden">
        <div className="flex justify-around">
          <div className="flex flex-col items-center py-2">
            <div className="w-6 h-6 bg-purple-600 rounded mb-1"></div>
            <span className="text-xs text-purple-600 font-medium">Feed</span>
          </div>
          <div className="flex flex-col items-center py-2">
            <div className="w-6 h-6 bg-gray-400 rounded mb-1"></div>
            <span className="text-xs text-gray-400">Live</span>
          </div>
          <div className="flex flex-col items-center py-2">
            <div className="w-6 h-6 bg-gray-400 rounded mb-1"></div>
            <span className="text-xs text-gray-400">Chat</span>
          </div>
          <div className="flex flex-col items-center py-2">
            <div className="w-6 h-6 bg-gray-400 rounded mb-1"></div>
            <span className="text-xs text-gray-400">Module</span>
          </div>
          <div className="flex flex-col items-center py-2">
            <div className="w-6 h-6 bg-gray-400 rounded mb-1"></div>
            <span className="text-xs text-gray-400">Profil</span>
          </div>
        </div>
      </div>

    </div>
  );
}