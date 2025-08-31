import { useEffect } from "react";
import { useGetFeedPostsQuery } from "../../../../react-query/queries/feed/feedQueries";
import { useLocation } from "react-router-dom";
import { Post } from './Post';

interface FeedComponentProps {
    categoryId?: string | null;
    userId: string;
}

export const FeedComponent: React.FC<FeedComponentProps> = ({ categoryId, userId }) => {
    const { data, isPending, isFetchingNextPage, refetch } = useGetFeedPostsQuery({ categoryId: categoryId ?? undefined });

    const location = useLocation();

    useEffect(() => {
        refetch();
    }, [location, refetch]);

    useEffect(() => {
        refetch();
    }, [categoryId, refetch]);

    return (
        <div className="px-4 lg:px-8 py-4 lg:py-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4 lg:gap-6">
                    {data && data?.length > 0 
                        ? data.map((post) => (
                            <Post
                                id={post.id}
                                profilePicture={post.author.profilePicture}
                                username={post.author.username}
                                text={post.text}
                                mediaUrl={post.mediaUrl}
                                mediaType={post.mediaType}
                                thumbnailUrl={post?.thumbnail as string}
                                reactions={post?.reactions}
                                userId={userId}
                            />
                        ))
                        : <>
                            No Posts yet, please refresh
                        </>
                    }
                </div>
            </div>
        </div>
    );
}