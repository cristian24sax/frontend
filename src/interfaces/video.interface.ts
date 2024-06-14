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
  hasBeenPlayed: number;
}
