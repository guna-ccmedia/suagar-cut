export interface ChallengeData {
  challengeType: number;
  currentStreak: number;
  isCheckedInToday: boolean;
  checkIn: () => void;
}