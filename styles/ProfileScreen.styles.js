// styles/ProfileScreen.styles.js
import { StyleSheet } from "react-native";
import { Theme } from "./Theme";

export const ProfileScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1A17",
    padding: Theme.spacing.lg,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginTop: Theme.spacing.xl,
    marginBottom: Theme.spacing.md,
  },
  changePhotoText: {
    color: "#C9BFB2",
    textAlign: "center",
    fontFamily: "Poppins",
  },
  label: {
    color: "#F3EEE8",
    marginTop: Theme.spacing.lg,
    fontFamily: "PoppinsBold",
  },
  input: {
    backgroundColor: "#2A2521",
    color: "#F3EEE8",
    padding: 10,
    borderRadius: Theme.borderRadius.md,
    marginTop: 4,
  },
  button: {
    backgroundColor: "#A4896E",
    borderRadius: Theme.borderRadius.lg,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: "flex-start",
    marginTop: Theme.spacing.sm,
  },
  buttonText: {
    color: "#1E1A17",
    fontFamily: "PoppinsBold",
  },
  friendCode: {
    backgroundColor: "#2A2521",
    color: "#C9BFB2",
    padding: 8,
    borderRadius: Theme.borderRadius.md,
    marginTop: 4,
    fontFamily: "Nunito",
  },
  addFriendRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    gap: 8,
  },
  friendItem: {
    color: "#C9BFB2",
    backgroundColor: "#2A2521",
    padding: 10,
    borderRadius: Theme.borderRadius.md,
    marginTop: 6,
  },
});
