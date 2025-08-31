import { MoreHorizontal } from "lucide-react";
import { Reaction } from "../../../../core/domain/entities/Post";

interface PostProps {
    id: string;
    username: string;
    text: string;
    mediaUrl: string | null;
    mediaType: string;
    profilePicture: string | null;
    thumbnailUrl: string | null;
    reactions?: Reaction[];
    userId: string;
}



export const Post: React.FC<PostProps> = ({ id,
    username,
    text,
    mediaUrl,
    mediaType,
    profilePicture,
    thumbnailUrl,
    reactions,
    userId, }) => {


    return (<div key={id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6 hover:shadow-lg transition-shadow duration-200">
        {/* Post Header */}
        <div className="flex items-center justify-between mb-3">
            <div className="flex items-center flex-1 min-w-0">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gray-300 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-gray-600 text-sm lg:text-base font-medium">
                        {username.charAt(0)}
                    </span>
                </div>
                <div className="min-w-0 flex-1">
                    <p className="text-gray-900 font-medium text-sm lg:text-base truncate">{username}</p>
                </div>
            </div>
            <div className="flex items-center space-x-2 flex-shrink-0">
                <span className="text-red-500 text-xs lg:text-sm">Signaler</span>
                <MoreHorizontal className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors" />
            </div>
        </div>

        {/* Post Content */}
        <div className="mb-3">
            <p className="text-gray-800 text-sm lg:text-base leading-relaxed whitespace-pre-line">
                {text}
            </p>
        </div>

        {/* Post Footer */}
        {/* {post.reactions && (
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <span className="text-sm lg:text-base">{post.reactions}</span>
                </div>
            </div>
        )} */}
    </div>);
}