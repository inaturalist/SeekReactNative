/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/?config=dynamic
 */

import type { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native";
import type { DrawerScreenProps } from "@react-navigation/drawer";
import type { StackScreenProps } from "@react-navigation/stack";

// Note from the documentation:
// The type containing the mapping must be a type alias. It cannot be an interface.
export type DrawerParamList = {
  Home: undefined;
  Achievements: undefined;
  Challenges: undefined;
  ChallengeDetails: undefined;
  Observations: undefined;
  iNatStats: undefined;
  About: undefined;
  Settings: undefined;
  Match: undefined;
  DebugEmailScreen: undefined;
  Species: undefined;
  SeekYearInReview: undefined;
  SeekYearInReviewMapScreen: undefined;
  Notifications: undefined;
};

// Note from the documentation:
// The type containing the mapping must be a type alias. It cannot be an interface.
export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Camera: undefined;
  Drawer: NavigatorScreenParams<DrawerParamList>;
  Post: undefined;
  PostStatus: undefined;
  LoginOrSignup: undefined;
  Login: undefined;
  Forgot: undefined;
  PasswordEmail: undefined;
  Age: undefined;
  Parent: undefined;
  ParentCheck: undefined;
  LicensePhotos: undefined;
  Signup: undefined;
  LoginSuccess: undefined;
  Social: undefined;
  TermsOfService: undefined;
  Privacy: undefined;
  CommunityGuidelines: undefined;
  RangeMap: undefined;
  Wikipedia: undefined;
  CameraHelp: undefined;
  Donation: undefined;
  PostingHelp: undefined;
  FullAnnouncement: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = StackScreenProps<RootStackParamList, T>;

export type DrawerStackScreenProps<T extends keyof DrawerParamList> =
  CompositeScreenProps<
    DrawerScreenProps<DrawerParamList, T>,
    RootStackScreenProps<"Drawer">
  >;

// https://reactnavigation.org/docs/typescript/?config=dynamic#specifying-default-types-for-usenavigation-link-ref-etc
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

