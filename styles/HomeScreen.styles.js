import { StyleSheet } from "react-native";
import { Theme } from "./Theme";

export const HomeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent", // ⬅️ this lets the animation show
    paddingHorizontal: Theme.spacing.lg,
    paddingTop: Theme.spacing.xl,
    zIndex: 1,
  },

  // HEADER
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Theme.spacing.lg,
    marginTop: Theme.spacing.xxl,
  },
  greeting: {
    fontFamily: "PoppinsBold",
    fontSize: 22,
    color: "#F3EEE8",
    letterSpacing: 0.3,
  },
  greetingHighlight: {
    fontFamily: "Poppins",
    color: "#C9BFB2",
  },
  headerActions: {
    flexDirection: "row",
    gap: 12,
  },
  iconButton: {
    fontSize: 22,
    color: "#C9BFB2",
  },

  // GROUPS SECTION
  sectionTitle: {
    fontFamily: "PoppinsBold",
    fontSize: 17,
    color: "#F3EEE8",
    marginBottom: Theme.spacing.sm,
  },
  groupCard: {
    backgroundColor: "#2A2521",
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.md,
    marginRight: Theme.spacing.md,
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.08)",
  },
  groupName: {
    fontFamily: "Poppins",
    fontSize: 15,
    color: "#F3EEE8",
    marginBottom: Theme.spacing.xs,
  },
  memberRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  memberAvatar: {
    width: 35,
    height: 35,
    borderRadius: 14,
    opacity: 0.85,
  },
  memberCount: {
    fontFamily: "Nunito",
    fontSize: 12,
    color: "#9C9185",
    marginLeft: 6,
  },
screen: {
  flex: 1,
  backgroundColor: "#1E1A17", // keep base color for safe fallback
  position: "relative",       // allow layering
  overflow: "hidden",         // ensure animation doesn’t bleed outside
},

  backgroundAnimation: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
    opacity: 0.1, // subtle motion
  },

  // EMPTY GROUP STATE
  emptyGroupContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Theme.spacing.xl,
  },
  emptyGroupImage: {
    width: 160,
    height: 160,
    opacity: 0.85,
  },
  emptyGroupTitle: {
    fontFamily: "PoppinsBold",
    fontSize: 16,
    color: "#F3EEE8",
    marginTop: Theme.spacing.md,
  },
  emptyGroupSubtitle: {
    fontFamily: "Nunito",
    fontSize: 14,
    color: "#C9BFB2",
    marginTop: 4,
  },
  createGroupButton: {
    backgroundColor: "#A4896E",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: Theme.borderRadius.lg,
    marginTop: Theme.spacing.md,
  },
  createGroupText: {
    fontFamily: "PoppinsBold",
    color: "#1E1A17",
  },

  // FEED / MOMENTS
  updateCard: {
    backgroundColor: "#2A2521",
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.06)",
  },
  userName: {
    fontFamily: "PoppinsBold",
    fontSize: 14,
    color: "#F3EEE8",
  },
  updateText: {
    fontFamily: "Nunito",
    fontSize: 15,
    color: "#C9BFB2",
    marginTop: 2,
  },

  emptyMoments: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Theme.spacing.xl,
  },
  emptyMomentsTitle: {
    fontFamily: "PoppinsBold",
    fontSize: 15,
    color: "#C9BFB2",
  },
  emptyMomentsSubtitle: {
    fontFamily: "Nunito",
    fontSize: 13,
    color: "#9C9185",
    marginTop: 2,
  },

  // LOADING
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1E1A17",
  },
  loadingText: {
    marginTop: Theme.spacing.md,
    color: "#9C9185",
    fontFamily: "Nunito",
  },
});
