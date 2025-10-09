import { StyleSheet } from 'react-native';
import { GlobalStyles } from './Global.styles';
import { Theme } from './Theme';

export const FriendsScreenStyles = StyleSheet.create({
  container: {
    ...GlobalStyles.screenContainer,
    backgroundColor: Theme.colors.background,
  },
  header: {
    ...GlobalStyles.header,
    backgroundColor: Theme.colors.background,
  },
  title: {
    ...GlobalStyles.headerTitle,
    color: Theme.colors.text.primary,
  },
  backButton: {
    padding: Theme.spacing.sm,
  },
  backButtonText: {
    ...Theme.typography.h3,
    color: Theme.colors.primary,
  },
  searchContainer: {
    paddingHorizontal: Theme.spacing.md,
    marginBottom: Theme.spacing.lg,
  },
  searchInput: {
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.borderRadius.round,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    color: Theme.colors.text.primary,
    ...Theme.shadows.sm,
  },
  friendCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.md,
    marginHorizontal: Theme.spacing.md,
    marginBottom: Theme.spacing.sm,
    ...Theme.shadows.sm,
  },
  friendAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Theme.colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.md,
  },
  friendAvatarText: {
    ...Theme.typography.h3,
    color: Theme.colors.text.inverse,
  },
  friendName: {
    ...Theme.typography.h3,
    color: Theme.colors.text.primary,
  },
  addFriendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.primary,
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.md,
    ...Theme.shadows.sm,
  },
  addFriendText: {
    ...GlobalStyles.buttonText,
    marginLeft: Theme.spacing.sm,
  },
  pendingBadge: {
    backgroundColor: Theme.colors.accent,
    borderRadius: Theme.borderRadius.round,
    paddingHorizontal: Theme.spacing.sm,
  },
  pendingBadgeText: {
    ...Theme.typography.small,
    color: Theme.colors.text.inverse,
    fontWeight: 'bold',
  },
});
