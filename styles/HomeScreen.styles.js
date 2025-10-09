import { StyleSheet } from 'react-native';
import { GlobalStyles } from './Global.styles';
import { Theme } from './Theme';

export const HomeScreenStyles = StyleSheet.create({
  container: {
    ...GlobalStyles.container,
    backgroundColor: Theme.colors.background,
  },
  header: {
    ...GlobalStyles.header,
    backgroundColor: Theme.colors.background,
    borderBottomColor: Theme.colors.accent,
  },
  headerTitle: {
    ...GlobalStyles.headerTitle,
    color: Theme.colors.text.primary,
  },
  friendsButton: {
    padding: Theme.spacing.sm,
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.borderRadius.round,
    ...Theme.shadows.sm,
  },

  // Quick Actions
  quickActions: {
    flexDirection: 'row',
    padding: Theme.spacing.md,
    gap: Theme.spacing.sm,
  },
  mainAction: {
    flex: 2,
    padding: Theme.spacing.md,
    backgroundColor: Theme.colors.primary,
    borderRadius: Theme.borderRadius.lg,
    alignItems: 'center',
    ...Theme.shadows.md,
  },
  mainActionText: {
    ...GlobalStyles.buttonText,
    color: Theme.colors.text.inverse,
  },
  clingyAction: {
    flex: 1,
    padding: Theme.spacing.md,
    backgroundColor: Theme.colors.secondary,
    borderRadius: Theme.borderRadius.lg,
    alignItems: 'center',
    ...Theme.shadows.sm,
  },
  clingyActionText: {
    ...GlobalStyles.buttonText,
    fontSize: Theme.typography.caption.fontSize,
    color: Theme.colors.text.inverse,
  },

  // Quick Messages
  quickMessagesSection: {
    ...GlobalStyles.section,
    paddingHorizontal: Theme.spacing.md,
  },
  quickMessageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Theme.spacing.sm,
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.borderRadius.round,
    marginRight: Theme.spacing.sm,
    ...Theme.shadows.sm,
  },
  quickMessageEmoji: {
    fontSize: 16,
    marginRight: Theme.spacing.xs,
  },
  quickMessageText: {
    ...Theme.typography.small,
    color: Theme.colors.text.primary,
    fontWeight: '500',
  },

  // Friends Section
  friendsSection: {
    ...GlobalStyles.section,
    paddingHorizontal: Theme.spacing.md,
  },
  friendItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Theme.spacing.md,
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.borderRadius.lg,
    marginRight: Theme.spacing.sm,
    ...Theme.shadows.sm,
  },
  friendInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: Theme.borderRadius.round,
    marginRight: Theme.spacing.sm,
  },
  friendName: {
    ...Theme.typography.body,
    fontWeight: '600',
    color: Theme.colors.text.primary,
  },
  lastSeen: {
    ...Theme.typography.small,
    color: Theme.colors.text.secondary,
  },

  // Updates Section
  updatesSection: {
    flex: 1,
    paddingHorizontal: Theme.spacing.md,
  },
  updateItem: {
    ...GlobalStyles.card,
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.borderRadius.lg,
    marginBottom: Theme.spacing.sm,
  },
  updateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.sm,
  },
  userName: {
    ...Theme.typography.body,
    fontWeight: 'bold',
    color: Theme.colors.text.primary,
  },
  timestamp: {
    ...Theme.typography.small,
    color: Theme.colors.text.secondary,
  },
  updateImage: {
    width: '100%',
    height: 200,
    borderRadius: Theme.borderRadius.md,
    marginBottom: Theme.spacing.sm,
  },
  updateText: {
    ...Theme.typography.body,
    color: Theme.colors.text.primary,
    marginBottom: Theme.spacing.sm,
  },
  updateActions: {
    flexDirection: 'row',
    gap: Theme.spacing.md,
  },
  actionButton: {
    padding: Theme.spacing.xs,
  },

  emptyState: {
    ...GlobalStyles.emptyState,
  },
  emptyStateText: {
    ...GlobalStyles.emptyStateText,
  },
  emptyStateSubtext: {
    ...GlobalStyles.emptyStateSubtext,
  },
});
