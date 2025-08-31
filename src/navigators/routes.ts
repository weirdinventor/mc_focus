export const RootStackRoutes = {
  TAB_STACK: '',
  ONBOARDING_STACK: '/onboarding',
  PARAMETERS_STACK: '/parameters',
  MEETING_SCREEN: '/meeting',
  SEARCH_SCREEN: '/search',
  SOON_CONTENT_SCREEN: '/soon-content',
  CURRENT_CONTENT_SCREEN: '/current-content',
  REBROADCAST_CONTENT_SCREEN: '/rebroadcast-content',
  ANONCES_CONTENT_SCREEN: '/anonces-content',
  RESOURCES_CONTENT_SCREEN: '/resources-content',
  MY_MODULES_CONTENT_SCREEN: '/my-modules-content',
  ALL_MODULES_CONTENT_SCREEN: '/all-modules-content',
  SINGLE_MODULE_SCREEN: '/module/:id',
  MODULE_PURCHASE_SCREEN: '/module/:id/purchase',
  GROUP_DISCUSSION_SCREEN: '/group-discussion',
  CHAT_SCREEN: '/chat/:id',
  CHANGE_PASSWORD_SCREEN: '/change-password',
  MESSAGES_LIST_SCREEN: '/messages',
  SUB_SCREEN: '/subscribe',
  OTHER_USER_SCREEN: '/user/:username',
  FREE_USER_CHAT_SCREEN: '/free-user-chat',
} as const;

export const TabBarStackRoutes = {
  FEED: 'feed',
  LIVE: 'live',
  CHAT: 'chat',
  MODULE: 'module',
  PROFILE: 'profile',
} as const;

export const OnboardingStackRoutes = {
  FORGOT_PASS_STACK: 'forgot-password',
  LOGIN_SCREEN: 'login',
  TUTORIAL_SCREEN: 'tutorial',
  EMAIL_SCREEN: 'email',
  PASSWORD_SCREEN: 'password',
  USER_INFO_SCREEN: 'user-info',
  USERNAME_SCREEN: 'username',
  GENDER_SCREEN: 'gender',
  TAKE_PHOTO_SCREEN: 'take-photo',
  PHOTO_SCREEN: 'photo',
  SUB_SCREEN: 'subscribe',
} as const;

export const ParametersStackRoutes = {
  PARAMETERS: '',
  MANAGE_SUBSCRIPTION: 'manage-subscription',
} as const;

export const ForgotPassStackRoutes = {
  FORGOT_PASS_EMAIL: 'forgot-pass-email',
  FORGOT_OTP_CHECK: 'otp-check',
  FORGOT_NEW_PASS: 'new-password',
} as const;