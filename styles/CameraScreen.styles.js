import { StyleSheet } from 'react-native';
import { Theme } from './Theme';

export const CameraScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    position: 'absolute',
    top: Theme.spacing.xxl,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.md,
    zIndex: 10,
  },
  flashButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controls: {
    position: 'absolute',
    bottom: Theme.spacing.xl,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Theme.colors.surface,
    borderWidth: 4,
    borderColor: Theme.colors.accent,
  },
  sendButton: {
    backgroundColor: Theme.colors.primary,
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.lg,
    borderRadius: Theme.borderRadius.lg,
  },
  sendText: {
    color: Theme.colors.text.inverse,
    fontWeight: 'bold',
  },
});
