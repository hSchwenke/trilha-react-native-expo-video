export interface VideoPlayerProps {
  video: { uri: string };
  isSaving: boolean;
  onShare: () => void;
  onSave: () => void;
  onDiscard: () => void;
}
