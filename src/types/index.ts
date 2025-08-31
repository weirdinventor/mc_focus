export interface RouteParams {
  groupId?: string
  type?: "reglement" | "presentation" | "vosChiffres" | "temoi"
  title?: string
  conversationId?: string
  participant?: User
  isGroup?: boolean
  voiceRoomId?: string
}

export interface User {
  id: string
  username: string
  profilePicture?: string
}

export interface Live {
  id: string
  title: string
  description: string
  coverImage?: string
  accessLevel: "free" | "premium"
  airsAt: string
  owner: User
}

export interface Resource {
  id: string
  title: string
  description?: string
  tag?: string
  isContentScreen?: boolean
}

export interface Discussion {
  id: string
  name: string
  coverImage?: string
  thumbnail?: string
  members?: number
  voiceRoomId?: string
}

export interface Conversation {
  id: string
  participant: User
  latestMessage?: {
    text: string
  }
}

export interface Message {
  id: string
  text: string
  username?: string
  timestamp: string
}
