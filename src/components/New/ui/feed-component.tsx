"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"
import { Heart, MessageCircle, Share, MoreHorizontal } from "lucide-react"

interface Post {
  id: string
  content: string
  author: {
    username: string
    profilePicture: string
  }
  createdAt: string
  likes: number
  comments: number
  isLiked?: boolean
}

interface FeedComponentProps {
  categoryId?: string | null
  userId: string
  onPostInteraction?: (postId: string | null) => void
}

export const FeedComponent: React.FC<FeedComponentProps> = ({ categoryId, userId, onPostInteraction }) => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(false)

  // Mock posts data - replace with actual API call
  useEffect(() => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      const mockPosts: Post[] = [
        {
          id: "1",
          content: "Just finished an amazing workout session! Feeling energized and ready to take on the day. 💪",
          author: {
            username: "fitness_guru",
            profilePicture: "/placeholder.svg?height=40&width=40",
          },
          createdAt: "2024-01-15T10:30:00Z",
          likes: 24,
          comments: 8,
          isLiked: false,
        },
        {
          id: "2",
          content: "New training program launching next week! Get ready for some intense HIIT sessions.",
          author: {
            username: "coach_mike",
            profilePicture: "/placeholder.svg?height=40&width=40",
          },
          createdAt: "2024-01-15T09:15:00Z",
          likes: 42,
          comments: 15,
          isLiked: true,
        },
      ]
      setPosts(mockPosts)
      setLoading(false)
    }, 1000)
  }, [categoryId])

  const handleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post,
      ),
    )
    onPostInteraction?.(postId)
  }

  const formatTimeAgo = (dateString: string) => {
    const now = new Date()
    const postDate = new Date(dateString)
    const diffInHours = Math.floor((now.getTime() - postDate.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    return `${Math.floor(diffInHours / 24)}d ago`
  }

  if (loading) {
    return (
      <div className="p-4 space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="p-4 space-y-4">
      {posts.map((post) => (
        <Card key={post.id}>
          <CardContent className="p-4">
            {/* Post header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <img
                  src={post.author.profilePicture || "/placeholder.svg"}
                  alt={post.author.username}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-medium text-gray-900">{post.author.username}</h4>
                  <p className="text-sm text-gray-500">{formatTimeAgo(post.createdAt)}</p>
                </div>
              </div>

              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>

            {/* Post content */}
            <p className="text-gray-800 mb-4 leading-relaxed">{post.content}</p>

            {/* Post actions */}
            <div className="flex items-center gap-6 pt-2 border-t">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleLike(post.id)}
                className={`flex items-center gap-2 ${post.isLiked ? "text-red-500" : "text-gray-600"}`}
              >
                <Heart className={`h-4 w-4 ${post.isLiked ? "fill-current" : ""}`} />
                <span>{post.likes}</span>
              </Button>

              <Button variant="ghost" size="sm" className="flex items-center gap-2 text-gray-600">
                <MessageCircle className="h-4 w-4" />
                <span>{post.comments}</span>
              </Button>

              <Button variant="ghost" size="sm" className="flex items-center gap-2 text-gray-600">
                <Share className="h-4 w-4" />
                <span>Share</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
