export interface Video {
  succeeded: boolean;
  message: string;
  errors: any[];
  data: VideoData[];
}

export interface VideoData {
  id: number;
  name: string;
  htmlContent: string;
  formattedDuration: string;
  playOrder: number;
  hasBeenPlayed: boolean;
  isLastVideoSeen: boolean;
  secondsElapsed: number;
}

export interface Evaluation {
  id: number | null;
  name: string;
  url: string;
}

export interface Survey {
  id: number | null;
  name: string;
  url: string;
}