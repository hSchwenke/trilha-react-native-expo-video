import React from "react";
import { CameraView as ExpoCameraView, CameraType } from "expo-camera";

export interface CameraViewProps {
  cameraRef: React.RefObject<ExpoCameraView | null>;
  isRecording: boolean;
  recordingDuration: number;
  cameraType: CameraType;
  isTorchOn: boolean;
  onRecord: () => void;
  onStopRecording: () => void;
  onToggleCameraType: () => void;
  onToggleTorch: () => void;
}
