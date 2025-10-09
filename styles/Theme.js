export const Theme = {
  colors: {
    primary: '#E9AFA3',       // blush pink
    secondary: '#A9C9C2',     // muted sage teal
    accent: '#F2D0A4',        // warm honey beige
    background: '#f5e8d0',    // cozy cream
    surface: '#FFFFFF',
    text: {
      primary: '#c89f9c',
      secondary: '#b48a86',
      light: '#B7A7A7',
      inverse: '#fffaf3',
    },
    status: {
      online: '#A3C9A8',      // pastel mint green
      away: '#F6C28B',        // soft amber
      offline: '#C7C7C7',
    },
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
  },

  borderRadius: {
    sm: 6,
    md: 10,
    lg: 16,
    xl: 20,
    round: 50,
  },

typography: {
  h1: { fontSize: 26, fontFamily: 'PoppinsBold' },
  h2: { fontSize: 22, fontFamily: 'Poppins' },
  h3: { fontSize: 18, fontFamily: 'Poppins' },
  body: { fontSize: 16, fontFamily: 'Nunito' },
  caption: { fontSize: 14, fontFamily: 'Nunito' },
  small: { fontSize: 12, fontFamily: 'Nunito' },
},

  shadows: {
    sm: {
      shadowColor: '#E4D0CA',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 2,
    },
    md: {
      shadowColor: '#E4D0CA',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.25,
      shadowRadius: 6,
      elevation: 4,
    },
  },
};
