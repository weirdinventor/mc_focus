import { useEffect } from "react";
import { useGetFeedPostsQuery } from "../../../../react-query/queries/feed/feedQueries";
import { useLocation } from "react-router-dom";
import { Post } from './Post';
import { MessageCircle } from "lucide-react";
import { de } from "date-fns/locale";

interface FeedComponentProps {
    categoryId?: string | null;
    userId: string;
}

const FeedComponent: React.FC<FeedComponentProps> = ({ categoryId, userId }) => {
    const { data, isPending, isFetchingNextPage, refetch } = useGetFeedPostsQuery({ categoryId: categoryId ?? undefined });

    // Mock data for demonstration
    const mockPosts = [
        {
            id: '1',
            author: {
                username: 'George',
                profilePicture: null,
                role: 'Founder'
            },
            text: 'J-3 avant le prochain Moula Challenge',
            mediaUrl: 'https://youtu.be/79byPjpx8lP?si-DrmC,92z',
            mediaType: 'link',
            thumbnail: null,
            reactions: [],
            createdAt: '2024-01-15'
        },
        {
            id: '2', 
            author: {
                username: 'George',
                profilePicture: null,
                role: 'Founder'
            },
            text: 'Rejoignez notre groupe de discussion, on va parler français ! 😊\n\n💬 Parlons entre créateurs de contenu !\nLorem ipsum dolor sit amet consectetur. In tincidunt molestie sollicitudin tempor nulla sed blandit lacus. Fermentum...\n\n#astuce #rpmviral',
            mediaUrl: null,
            mediaType: null,
            thumbnail: null,
            reactions: [],
            createdAt: '2024-01-15'
        },
        {
            id: '3',
            author: {
                username: 'George', 
                profilePicture: null,
                role: 'Founder'
            },
            text: 'Que le Q4 commence....',
            mediaUrl: null,
            mediaType: null,
            thumbnail: null,
            reactions: [],
            createdAt: '2024-01-14'
        },
        {
            id: '4',
            author: {
                username: 'George',
                profilePicture: null,
                role: 'Founder'
            },
            text: 'La bonne surprise... J\'étends la boutique sur un nouveau marché et le taux de conversion continue d\'exploser\n\nPour savoir comment tu peux atteindre 15K€ dans les 30 prochains jours en ecom, ajoute un 😊 en réaction pour qu\'on lance la formation',
            mediaUrl: null,
            mediaType: null,
            thumbnail: null,
            reactions: [],
            createdAt: '2024-01-14'
        }
    ];

    useEffect(() => {
        refetch();
    }, [categoryId, refetch]);

    const displayData = data && data?.length > 0 ? data : mockPosts;

    return (
        <div className="px-6 py-8">
            <div className="mx-auto">
                <div className="space-y-6">
                    {displayData.length > 0 
                        ? displayData.map((post) => (
                            <StyledPost
                                key={post.id}
                                id={post.id}
                                profilePicture={post.author.profilePicture}
                                username={post.author.username}
                                role={typeof post.author.role === "number" ? String(post.author.role) : post.author.role}
                                text={post.text}
                                mediaUrl={post.mediaUrl}
                                mediaType={post.mediaType}
                                thumbnailUrl={post?.thumbnail as string}
                                reactions={post?.reactions}
                                userId={userId}
                                createdAt={post.createdAt}
                            />
                        ))
                        : (
                            <div className="flex flex-col items-center justify-center py-16 text-center">
                                <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mb-6">
                                    <MessageCircle className="w-12 h-12 text-purple-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                                    Aucun post pour le moment
                                </h3>
                                <p className="text-gray-500 text-lg max-w-md">
                                    Actualisez la page ou essayez une autre catégorie
                                </p>
                                <button 
                                    onClick={() => refetch()}
                                    className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 font-semibold"
                                >
                                    Actualiser
                                </button>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}


interface StyledPostProps {
    id: string;
    profilePicture?: string | null;
    username: string;
    role?: string;
    text: string;
    mediaUrl?: string | null;
    mediaType?: string | null;
    thumbnailUrl?: string;
    reactions?: any[];
    userId: string;
    createdAt?: string;
}

const StyledPost: React.FC<StyledPostProps> = ({
    id,
    profilePicture,
    username,
    role,
    text,
    mediaUrl,
    mediaType,
    thumbnailUrl,
    reactions,
    userId,
    createdAt
}) => {
    const formatText = (text: string) => {
        const parts = text.split('\n');
        return parts.map((part, index) => (
            <span key={index}>
                {part}
                {index < parts.length - 1 && <br />}
            </span>
        ));
    };

    const formatLink = (url: string) => {
        if (url.includes('youtu.be') || url.includes('youtube.com')) {
            return url.replace('?si-DrmC,92z', '?si=DrmC92z');
        }
        return url;
    };

    return (
        <div className="bg-white text-left rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-black via-[#405c57ff] via-[#E79C1C] via-[#E79C1C] to-[#6BE1DF] rounded-full flex items-center justify-center shadow-md">
                        <span className="text-white text-lg font-bold">
                            {username.charAt(0).toUpperCase()}
                        </span>
                    </div>
                    <div>
                        <div className="flex items-center space-x-2">
                            <h3 className="font-bold text-gray-900 text-lg">{username}</h3>
                            {role && (
                                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                    {role}
                                </span>
                            )}
                        </div>
                        {createdAt && (
                            <p className="text-sm text-gray-500">
                                {new Date(createdAt).toLocaleDateString('fr-FR')}
                            </p>
                        )}
                    </div>
                </div>
                <button className="text-pink-500 bg-pink-50 hover:bg-pink-100 px-3 py-1 rounded-full text-sm font-semibold transition-colors">
                    Signaler
                </button>
            </div>

            {/* Content */}
            <div className="mb-4">
                <p className="text-gray-800 text-base leading-relaxed whitespace-pre-wrap">
                    {formatText(text)}
                </p>
            </div>

            {/* Media */}
            {mediaUrl && (
                <div className="mb-4">
                    {mediaType === 'link' ? (
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                            <a 
                                href={formatLink(mediaUrl)} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-purple-600 hover:text-purple-700 underline break-all text-sm"
                            >
                                {formatLink(mediaUrl)}
                            </a>
                        </div>
                    ) : (
                        <div className="rounded-lg overflow-hidden">
                            {mediaType === 'image' ? (
                                <img src={mediaUrl} alt="" className="w-full h-auto" />
                            ) : mediaType === 'video' ? (
                                <video controls className="w-full h-auto">
                                    <source src={mediaUrl} />
                                </video>
                            ) : null}
                        </div>
                    )}
                </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors">
                        <div className="w-8 h-8 rounded-full bg-gray-100 hover:bg-purple-50 flex items-center justify-center">
                            ❤️
                        </div>
                        <span className="text-sm font-medium">J'aime</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors">
                        <div className="w-8 h-8 rounded-full bg-gray-100 hover:bg-purple-50 flex items-center justify-center">
                            💬
                        </div>
                        <span className="text-sm font-medium">Commenter</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors">
                        <div className="w-8 h-8 rounded-full bg-gray-100 hover:bg-purple-50 flex items-center justify-center">
                            📤
                        </div>
                        <span className="text-sm font-medium">Partager</span>
                    </button>
                </div>
                <div className="text-sm text-gray-500">
                    {reactions?.length || 0} réactions
                </div>
            </div>
        </div>
    );
};

export default FeedComponent;