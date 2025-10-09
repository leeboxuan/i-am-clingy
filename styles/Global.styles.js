// styles/Global.styles.js
import { StyleSheet } from 'react-native';
import { Theme } from './Theme';

export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    paddingTop: Theme.spacing.xxl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.md,
    paddingTop: Theme.spacing.xxl,
    paddingBottom: Theme.spacing.md,
    backgroundColor: Theme.colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.surface,
  },
  headerTitle: {
    ...Theme.typography.h1,
    color: Theme.colors.text.primary,
  },
  section: {
    marginBottom: Theme.spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.md,
  },
  sectionTitle: {
    ...Theme.typography.h3,
    color: Theme.colors.text.primary,
  },
  card: {
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.md,
    marginHorizontal: Theme.spacing.md,
    ...Theme.shadows.sm,
  },
  button: {
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPrimary: {
    backgroundColor: Theme.colors.primary,
  },
  buttonSecondary: {
    backgroundColor: Theme.colors.secondary,
  },
  buttonText: {
    ...Theme.typography.body,
    color: Theme.colors.text.inverse,
    fontWeight: 'bold',
  },
  emptyState: {
    alignItems: 'center',
    padding: Theme.spacing.xl,
  },
  emptyStateText: {
    ...Theme.typography.h3,
    color: Theme.colors.text.secondary,
    marginBottom: Theme.spacing.xs,
  },
  emptyStateSubtext: {
    ...Theme.typography.caption,
    color: Theme.colors.text.light,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.colors.background,
  },
  loadingText: {
    ...Theme.typography.body,
    color: Theme.colors.text.secondary,
    marginTop: Theme.spacing.md,
  },
});