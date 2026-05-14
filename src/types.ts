export enum Emotion {
  Neutral = 'neutral',
  Happy = 'happy',
  Sad = 'sad',
  Angry = 'angry',
  Fearful = 'fearful',
  Disgusted = 'disgusted',
  Surprised = 'surprised',
}

export type LearningState = 'focused' | 'bored' | 'confused' | 'happy';

export const mapEmotionToLearningState = (emotion: Emotion): LearningState => {
  switch (emotion) {
    case Emotion.Happy:
      return 'happy'; // give harder content
    case Emotion.Sad:
    case Emotion.Neutral:
      return 'bored'; // might be bored, show interactive quiz
    case Emotion.Angry:
    case Emotion.Fearful:
    case Emotion.Disgusted:
    case Emotion.Surprised:
      return 'confused'; // show easy explanation
    default:
      return 'focused'; // continue lesson
  }
};
