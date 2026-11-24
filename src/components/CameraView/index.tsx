import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { CameraView as ExpoCameraView } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";

import { CameraViewProps } from "./props";
import { styles } from "./styles";

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export default function CameraView({
  cameraRef,
  isRecording,
  recordingDuration,
  cameraType,
  isTorchOn,
  onRecord,
  onStopRecording,
  onToggleCameraType,
  onToggleTorch,
}: CameraViewProps) {
  return (
    <View style={styles.container}>
      <ExpoCameraView
        style={styles.camera}
        ref={cameraRef as any}
        facing={cameraType}
        mode="video"
        enableTorch={isTorchOn}
      >
        {/* Barra superior de controles */}
        <View style={styles.topBar}>
          <TouchableOpacity
            style={[styles.iconButton, isTorchOn && styles.iconButtonActive]}
            onPress={onToggleTorch}
            activeOpacity={0.7}
          >
            <Ionicons
              name={isTorchOn ? "flash" : "flash-off"}
              size={22}
              color={isTorchOn ? "#facc15" : "#ffffff"}
            />
          </TouchableOpacity>

          {isRecording ? (
            <View style={styles.timerBadge}>
              <View style={styles.recordingDot} />
              <Text style={styles.timerText}>
                REC {formatDuration(recordingDuration)}
              </Text>
            </View>
          ) : (
            <View style={styles.sideActionPlaceholder} />
          )}

          <TouchableOpacity
            style={styles.iconButton}
            onPress={onToggleCameraType}
            disabled={isRecording}
            activeOpacity={0.7}
          >
            <Ionicons
              name="camera-reverse-outline"
              size={24}
              color={isRecording ? "#888888" : "#ffffff"}
            />
          </TouchableOpacity>
        </View>

        {/* Barra inferior com botão de gravação */}
        <View style={styles.bottomBar}>
          <View style={styles.sideActionPlaceholder} />

          <TouchableOpacity
            onPress={isRecording ? onStopRecording : onRecord}
            style={[
              styles.recordButtonOuter,
              isRecording && styles.recordButtonOuterRecording,
            ]}
            activeOpacity={0.8}
          >
            <View
              style={[
                styles.recordButtonInner,
                isRecording && styles.recordButtonInnerRecording,
              ]}
            />
          </TouchableOpacity>

          <View style={styles.sideActionPlaceholder} />
        </View>
      </ExpoCameraView>
    </View>
  );
}
