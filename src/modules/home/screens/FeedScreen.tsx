import { useEffect, useState } from "react"
import { Category } from "../../../core/domain/entities/Category"
import { useGetCategoriesQuery, useGetFeedPostsQuery } from "../../../react-query/queries/feed/feedQueries"
import { useGetMeQuery } from "../../../react-query/queries/user/userQueries"
import { Search, MessageCircle, ArrowLeft, Mail } from "lucide-react"
import FeedComponent from "../components/post/FeedPosts"
import { useNavigate } from "react-router-dom"
import { RootStackRoutes } from "../../../navigators/routes"

interface FeedScreenProps {
  ongoingLive?: any
  categories?: Category[]
  userId?: string
  onBack?: () => void
}

export const FeedScreen: React.FC<FeedScreenProps> = ({ onBack }) => {
  const { data: categories } = useGetCategoriesQuery();
  const { refetch: fetchMe } = useGetMeQuery(false);
  const [userId, setUserId] = useState<string>();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );
  const { fetchNextPage, hasNextPage } = useGetFeedPostsQuery({
    categoryId: selectedCategoryId || undefined,
  });

  const navigate = useNavigate();

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
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1">
        {/* Header with Gradient */}
        <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #000000 0%, #000000 25%, #1a1a1a 35%, #2a3a2a 45%, #405c57ff 55%, #E79C1C 75%, #6BE1DF 100%)' }}>
          {/* Decorative background */}
          <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
            <div className="w-full h-full bg-white/20 rounded-full transform translate-x-16 -translate-y-16"></div>
          </div>
          
          {/* Header Content */}
          <div className="relative px-6 py-4">
            <div className="flex items-center justify-between mx-auto">
              <div className="flex items-center space-x-4">
                {/* <button 
                  onClick={onBack} 
                  className="text-purple hover:bg-white/10 p-2 rounded-lg transition-all duration-200"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button> */}
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
                  <h1 className="text-white text-2xl font-black uppercase tracking-wider">
                    FEED
                  </h1>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Search className="w-6 h-6 text-white cursor-pointer hover:text-purple-200 transition-colors" 
                  onClick={() => navigate(RootStackRoutes.SEARCH_SCREEN)}/>
                <Mail className="w-6 h-6 text-white cursor-pointer hover:text-purple-200 transition-colors" 
                  onClick={() => navigate(RootStackRoutes.MESSAGES_LIST_SCREEN)}/>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Navigation */}
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="mx-auto">
            <div className="flex px-6 overflow-x-auto scrollbar-hide">
              {(categories ?? []).map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryPress(category.id)}
                  className={`py-4 px-4 mr-6 text-sm font-semibold border-b-3 transition-all whitespace-nowrap ${
                    selectedCategoryId === category.id
                      ? "border-purple-600 text-purple-700 bg-purple-50/50"
                      : "border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Feed Content */}
        <FeedComponent categoryId={selectedCategoryId} userId={userId ?? ''} />
      </div>
    </div>
  );
}