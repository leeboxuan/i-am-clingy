import { StyleSheet } from "react-native";
import { Theme } from "./Theme";

export const SidebarStyles = StyleSheet.create({
sidebar: {
  width: "80%",
  height: "100%",
  backgroundColor: "#231E1B",       // slightly lighter clay
  borderTopLeftRadius: 36,
  borderBottomLeftRadius: 36,
  paddingHorizontal: Theme.spacing.xl,
  paddingTop: Theme.spacing.xxl,
  justifyContent: "flex-start",
},
  closeButton: {
    alignSelf: "flex-end",
  },
  closeText: {
    color: "#C9BFB2",
    fontSize: 20,
  },
  avatarWrapper: {
    alignItems: "center",
    marginTop: Theme.spacing.lg,
  },
avatar: {
  width: 90,
  height: 90,
  borderRadius: 45,
  backgroundColor: "#1E1A17",
},
avatarBorder: {
  width: 110,
  height: 110,
  borderRadius: 55,
  borderWidth: 2.5,
  borderColor: "#A4896E",        // warm golden-clay tone
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#2A2521",    // inner background tone
  shadowColor: "#A4896E",
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0.5,
  shadowRadius: 6,
  elevation: 8,                  // Android soft glow
},
  changePhoto: {
    fontFamily: "Nunito",
    fontSize: 13,
    color: "#A4896E",
  },
  label: {
    color: "#C9BFB2",
    fontFamily: "PoppinsBold",
    marginTop: Theme.spacing.md,
  },
  input: {
    backgroundColor: "#1E1A17",
    color: "#F3EEE8",
    padding: 10,
    borderRadius: 10,
    marginTop: 4,
  },
  friendCode: {
    backgroundColor: "#1E1A17",
    color: "#C9BFB2",
    padding: 10,
    borderRadius: 10,
    marginTop: 4,
    fontFamily: "Nunito",
  },
  friendItem: {
    color: "#F3EEE8",
    marginTop: 6,
    fontFamily: "Nunito",
  },
  noFriends: {
    color: "#9C9185",
    fontFamily: "Nunito",
    marginTop: 8,
  },
});
