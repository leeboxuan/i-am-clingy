export const Theme = {
  colors: {
    primary: '#E8B4A2',       
    secondary: '#C4D7B2',    
    accent: '#EADBC8',       
    background: '#f5e8d0',    
    surface: '#FFFFFF',
    text: {
      primary: '#2E2E2E',
      secondary: '#6E6E6E',
      light: '#A9A9A9',
      inverse: '#FFFFFF',
    },
    status: {
      online: '#A8C686',      
      away: '#E7C97F',        
      offline: '#C8C8C8',
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

  borderRadius: { sm: 8, md: 12, lg: 16, xl: 20, round: 50 },


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
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.05,
      shadowRadius: 6,
      elevation: 4,
    },
  },
};
