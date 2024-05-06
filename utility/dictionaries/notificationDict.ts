type Notifications = {
  [key: string]: {
    title: string;
    message: string;
    iconName: string;
    nextScreen: string;
  };
};
const notifications: Notifications = {
  challengeProgress: {
    title: "notifications.almost_finished",
    message: "notifications.view_progress",
    iconName: "badge_empty",
    nextScreen: "ChallengeDetails"
  },
  badgeEarned: {
    title: "notifications.earned_badges",
    message: "notifications.learn_more",
    iconName: "bird",
    nextScreen: "iNatStats"
  },
  challengeCompleted: {
    title: "notifications.challenge_completed",
    message: "notifications.view_challenges",
    iconName: "op",
    nextScreen: "ChallengeDetails"
  },
  newChallenge: {
    title: "notifications.new_challenge",
    message: "notifications.view_challenges",
    iconName: "badge_empty",
    nextScreen: "ChallengeDetails"
  }
};

export default notifications;
