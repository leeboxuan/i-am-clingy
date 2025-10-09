import { StyleSheet } from 'react-native';
import { GlobalStyles } from './Global.styles';
import { Theme } from './Theme';

export const ProfileScreenStyles = StyleSheet.create({
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
  backButtonText: {
    color: Theme.colors.primary,
  },
  profileHeader: {
    alignItems: 'center',
    padding: Theme.spacing.xl,
    backgroundColor: Theme.colors.surface,
    marginHorizontal: Theme.spacing.md,
    borderRadius: Theme.borderRadius.lg,
    marginBottom: Theme.spacing.lg,
    ...Theme.shadows.sm,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Theme.colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    ...Theme.typography.h1,
    color: Theme.colors.text.primary,
  },
  userBio: {
    ...Theme.typography.body,
    color: Theme.colors.text.secondary,
  },
  logoutButton: {
    backgroundColor: Theme.colors.primary,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.lg,
    alignItems: 'center',
    marginHorizontal: Theme.spacing.md,
    ...Theme.shadows.sm,
  },
  logoutText: {
    color: Theme.colors.text.inverse,
    fontWeight: 'bold',
  },
});
