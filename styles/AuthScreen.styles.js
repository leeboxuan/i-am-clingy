import { StyleSheet } from "react-native";
import { Theme } from "./Theme";

export const AuthScreenStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    justifyContent: "center",
    alignItems: "center",
    padding: Theme.spacing.lg,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  mascot: {
    width: 200,
    height: 200,
    marginRight: Theme.spacing.sm,
  },
  mascotContainer: {
    alignItems: "center",
    marginBottom: -30, // overlap into the card
    zIndex: 2,
  },
authCard: {
    width: "70%",
},
  backgroundAnimation: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
    opacity: 0.15, // soft and subtle
  },
  container: {
    zIndex: 1,
    backgroundColor: "rgba(255,255,255,0.92)",
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.xl,
    ...Theme.shadows.sm,
  },

  title: {
    ...Theme.typography.h1,
    color: "#5b4636",
    textAlign: "center",
    marginBottom: Theme.spacing.lg,
  },

  input: {
    ...Theme.typography.body,
    backgroundColor: "#fff",
    borderColor: "#cfe3dc",
    borderWidth: 1,
    borderRadius: Theme.borderRadius.md,
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
    color: "#c89f9c",
  },

  button: {
    backgroundColor: "#b89b84",
    paddingVertical: Theme.spacing.md,
    borderRadius: Theme.borderRadius.lg,
    alignItems: "center",
    marginTop: Theme.spacing.sm,
    ...Theme.shadows.sm,
  },

  buttonText: {
    ...Theme.typography.h3,
    color: "#ffffff",
    fontWeight: "700",
  },

  switchText: {
    ...Theme.typography.caption,
    textAlign: "center",
    color: "#7b6a5c",
    marginTop: Theme.spacing.md,
  },
  highlightLink: {
    color: "#5b4636",
    fontWeight: "600",
    textDecorationLine: "underline", // optional for clickability
  },
  error: {
    ...Theme.typography.small,
    textAlign: "center",
    color: "#d97777",
    marginBottom: Theme.spacing.sm,
  },
});
