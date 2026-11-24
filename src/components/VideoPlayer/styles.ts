import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  video: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  topBar: {
    position: "absolute",
    top: 54,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 10,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  badge: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
  },
  badgeText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "600",
  },
  placeholder: {
    width: 44,
    height: 44,
  },
  bottomControls: {
    position: "absolute",
    bottom: 36,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "rgba(18, 18, 18, 0.88)",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 24,
    zIndex: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  actionButton: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 70,
  },
  actionIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  actionShare: {
    backgroundColor: "#3b82f6",
  },
  actionSave: {
    backgroundColor: "#10b981",
  },
  actionDiscard: {
    backgroundColor: "#ef4444",
  },
  actionText: {
    color: "#f3f4f6",
    fontSize: 12,
    fontWeight: "600",
  },
});
