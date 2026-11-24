import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";
import { Ionicons } from "@expo/vector-icons";

import { VideoPlayerProps } from "./props";
import { styles } from "./styles";

export default function VideoPlayer({
  video,
  isSaving,
  onShare,
  onSave,
  onDiscard,
}: VideoPlayerProps) {
  const player = useVideoPlayer(video.uri, (p) => {
    p.loop = true;
    p.play();
  });

  return (
    <View style={styles.container}>
      <VideoView
        style={styles.video}
        player={player}
        nativeControls
        contentFit="contain"
      />

      {/* Barra superior flutuante */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onDiscard}
          activeOpacity={0.7}
        >
          <Ionicons name="close" size={24} color="#ffffff" />
        </TouchableOpacity>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>Pré-visualização</Text>
        </View>

        <View style={styles.placeholder} />
      </View>

      {/* Barra de ações inferior flutuante */}
      <View style={styles.bottomControls}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={onShare}
          activeOpacity={0.7}
          disabled={isSaving}
        >
          <View style={[styles.actionIconContainer, styles.actionShare]}>
            <Ionicons name="share-social-outline" size={24} color="#ffffff" />
          </View>
          <Text style={styles.actionText}>Compartilhar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={onSave}
          activeOpacity={0.7}
          disabled={isSaving}
        >
          <View style={[styles.actionIconContainer, styles.actionSave]}>
            {isSaving ? (
              <ActivityIndicator color="#ffffff" size="small" />
            ) : (
              <Ionicons name="download-outline" size={24} color="#ffffff" />
            )}
          </View>
          <Text style={styles.actionText}>
            {isSaving ? "Salvando..." : "Salvar"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={onDiscard}
          activeOpacity={0.7}
          disabled={isSaving}
        >
          <View style={[styles.actionIconContainer, styles.actionDiscard]}>
            <Ionicons name="trash-outline" size={24} color="#ffffff" />
          </View>
          <Text style={styles.actionText}>Descartar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
