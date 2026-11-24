import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  CameraView as ExpoCameraView,
  CameraType,
  CameraRecordingOptions,
  useCameraPermissions,
  useMicrophonePermissions,
} from "expo-camera";
import { shareAsync, isAvailableAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library/legacy";
import { Ionicons } from "@expo/vector-icons";

import VideoPlayer from "./src/components/VideoPlayer";
import CameraView from "./src/components/CameraView";

export default function App() {
  const cameraRef = useRef<ExpoCameraView>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [cameraType, setCameraType] = useState<CameraType>("back");
  const [isTorchOn, setIsTorchOn] = useState(false);
  const [video, setVideo] = useState<{ uri: string } | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [microphonePermission, requestMicrophonePermission] =
    useMicrophonePermissions();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState<
    boolean | null
  >(null);

  const checkMediaPermissions = useCallback(async () => {
    try {
      const perm = await MediaLibrary.getPermissionsAsync(true);
      setHasMediaLibraryPermission(perm.granted);
    } catch {
      // No Expo Go Android, permissões completas de galeria são restritas pelo próprio Expo Go.
      // Definimos como true para não bloquear a câmera e gravação do usuário.
      setHasMediaLibraryPermission(true);
    }
  }, []);

  useEffect(() => {
    checkMediaPermissions();
  }, [checkMediaPermissions]);

  const hasCameraPermission = cameraPermission?.granted ?? null;
  const hasMicrophonePermission = microphonePermission?.granted ?? null;

  const requestAllPermissions = useCallback(async () => {
    try {
      if (!cameraPermission?.granted) await requestCameraPermission();
      if (!microphonePermission?.granted) await requestMicrophonePermission();
      try {
        const perm = await MediaLibrary.requestPermissionsAsync(true);
        setHasMediaLibraryPermission(perm.granted);
      } catch {
        setHasMediaLibraryPermission(true);
      }
    } catch (error) {
      console.error("Erro ao solicitar permissões:", error);
      Alert.alert(
        "Erro de Permissões",
        "Ocorreu um erro ao tentar obter as permissões necessárias."
      );
    }
  }, [
    cameraPermission,
    microphonePermission,
    requestCameraPermission,
    requestMicrophonePermission,
  ]);

  useEffect(() => {
    if (
      cameraPermission &&
      !cameraPermission.granted &&
      cameraPermission.canAskAgain
    ) {
      requestCameraPermission();
    }
    if (
      microphonePermission &&
      !microphonePermission.granted &&
      microphonePermission.canAskAgain
    ) {
      requestMicrophonePermission();
    }
  }, [
    cameraPermission,
    microphonePermission,
    requestCameraPermission,
    requestMicrophonePermission,
  ]);

  // Cronômetro de gravação
  useEffect(() => {
    let timer: any = null;
    if (isRecording) {
      setRecordingDuration(0);
      timer = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);
    } else {
      if (timer) clearInterval(timer);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRecording]);

  const toggleCameraType = () => {
    if (isRecording) return;
    setCameraType((current) => (current === "back" ? "front" : "back"));
  };

  const toggleTorch = () => {
    setIsTorchOn((prev) => !prev);
  };

  const recordVideo = async () => {
    if (!cameraRef.current || isRecording) return;

    try {
      setIsRecording(true);

      const options: CameraRecordingOptions = {
        maxDuration: 60,
      };

      const recorded = await cameraRef.current.recordAsync(options);
      if (recorded && recorded.uri) {
        setVideo(recorded);
      }
    } catch (error) {
      console.error("Erro ao gravar vídeo:", error);
      Alert.alert("Erro", "Não foi possível gravar o vídeo.");
    } finally {
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (cameraRef.current && isRecording) {
      cameraRef.current.stopRecording();
      setIsRecording(false);
    }
  };

  const saveVideo = async () => {
    if (!video) return;

    try {
      setIsSaving(true);
      await MediaLibrary.saveToLibraryAsync(video.uri);
      Alert.alert(
        "Vídeo Salvo!",
        "O vídeo foi gravado e salvo com sucesso na sua galeria.",
        [
          {
            text: "OK",
            onPress: () => {
              setVideo(null);
            },
          },
        ]
      );
    } catch (error) {
      console.warn("Restrição do Expo Go ao salvar na galeria:", error);
      Alert.alert(
        "Salvar Vídeo",
        "No ambiente do Expo Go (Android 13+), o salvamento direto é restrito pelo aplicativo hospedeiro. Você pode salvar ou enviar facilmente tocando em 'Compartilhar'.",
        [
          { text: "Fechar", style: "cancel" },
          {
            text: "Compartilhar Agora",
            onPress: () => shareVideo(),
          },
        ]
      );
    } finally {
      setIsSaving(false);
    }
  };

  const shareVideo = async () => {
    if (!video) return;

    try {
      const isAvailable = await isAvailableAsync();
      if (!isAvailable) {
        Alert.alert(
          "Compartilhamento Indisponível",
          "O compartilhamento de arquivos não é suportado neste dispositivo."
        );
        return;
      }

      await shareAsync(video.uri, {
        mimeType: "video/mp4",
        dialogTitle: "Compartilhar vídeo",
      });
    } catch (error) {
      console.error("Erro ao compartilhar vídeo:", error);
      Alert.alert("Erro", "Ocorreu um erro ao tentar compartilhar o vídeo.");
    }
  };

  const discardVideo = () => {
    Alert.alert(
      "Descartar Vídeo",
      "Tem certeza de que deseja descartar este vídeo e gravar outro?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Descartar",
          style: "destructive",
          onPress: () => setVideo(null),
        },
      ]
    );
  };

  // Carregando verificação de permissões
  if (
    hasCameraPermission === null ||
    hasMicrophonePermission === null ||
    hasMediaLibraryPermission === null
  ) {
    return (
      <SafeAreaView style={styles.permissionContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={styles.permissionText}>Verificando permissões...</Text>
        <StatusBar style="light" />
      </SafeAreaView>
    );
  }

  // Permissões negadas
  if (!hasCameraPermission || !hasMicrophonePermission) {
    return (
      <SafeAreaView style={styles.permissionContainer}>
        <View style={styles.permissionCard}>
          <Ionicons name="videocam-outline" size={56} color="#ef4444" />
          <Text style={styles.permissionTitle}>Permissões Necessárias</Text>
          <Text style={styles.permissionDescription}>
            Para utilizar o aplicativo de gravação de vídeos, conceda acesso à
            câmera e ao microfone.
          </Text>

          <View style={styles.statusList}>
            <View style={styles.statusItem}>
              <Ionicons
                name={hasCameraPermission ? "checkmark-circle" : "close-circle"}
                size={22}
                color={hasCameraPermission ? "#10b981" : "#ef4444"}
              />
              <Text style={styles.statusLabel}>Câmera (gravação de vídeo)</Text>
            </View>
            <View style={styles.statusItem}>
              <Ionicons
                name={
                  hasMicrophonePermission ? "checkmark-circle" : "close-circle"
                }
                size={22}
                color={hasMicrophonePermission ? "#10b981" : "#ef4444"}
              />
              <Text style={styles.statusLabel}>Microfone (áudio do vídeo)</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.permissionButton}
            onPress={requestAllPermissions}
            activeOpacity={0.8}
          >
            <Text style={styles.permissionButtonText}>Conceder Permissões</Text>
          </TouchableOpacity>
        </View>
        <StatusBar style="light" />
      </SafeAreaView>
    );
  }

  // Reprodução e ações do vídeo gravado
  if (video) {
    return (
      <>
        <StatusBar style="light" />
        <VideoPlayer
          video={video}
          isSaving={isSaving}
          onShare={shareVideo}
          onSave={saveVideo}
          onDiscard={discardVideo}
        />
      </>
    );
  }

  // Câmera ativa para gravação
  return (
    <>
      <StatusBar style="light" />
      <CameraView
        cameraRef={cameraRef}
        isRecording={isRecording}
        recordingDuration={recordingDuration}
        cameraType={cameraType}
        isTorchOn={isTorchOn}
        onRecord={recordVideo}
        onStopRecording={stopRecording}
        onToggleCameraType={toggleCameraType}
        onToggleTorch={toggleTorch}
      />
    </>
  );
}

const styles = StyleSheet.create({
  permissionContainer: {
    flex: 1,
    backgroundColor: "#0f172a",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  permissionCard: {
    backgroundColor: "#1e293b",
    borderRadius: 24,
    padding: 28,
    alignItems: "center",
    width: "100%",
    maxWidth: 400,
  },
  permissionTitle: {
    color: "#f8fafc",
    fontSize: 22,
    fontWeight: "700",
    marginTop: 16,
    marginBottom: 8,
    textAlign: "center",
  },
  permissionDescription: {
    color: "#94a3b8",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 24,
  },
  statusList: {
    width: "100%",
    marginBottom: 24,
  },
  statusItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  statusLabel: {
    color: "#e2e8f0",
    fontSize: 14,
    marginLeft: 10,
  },
  permissionButton: {
    backgroundColor: "#3b82f6",
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 14,
    width: "100%",
    alignItems: "center",
  },
  permissionButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  permissionText: {
    color: "#94a3b8",
    fontSize: 15,
    marginTop: 16,
  },
});
