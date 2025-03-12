import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  
  palette: {
    mode: 'light',
    primary: { main: '#0081FF' },
    secondary: { main: '#FFC107' },
    background: { default: '#0081FF', paper: '#ffffff' },
    text: { primary: '#333333', secondary: '#555555' },
  },
  typography: {
    fontFamily:'Sans SemiBold,sans-serif',
    h1: { fontSize: '42px', fontWeight: 500, letterSpacing: '-0.5px' , lineHeight:'52px'},
    h2: { fontSize: '36px', fontWeight: 400, letterSpacing: '-0.5px' },
    h3: { fontSize: '30px', fontWeight: 300 },
    h4: { fontSize: '24px', fontWeight: 250 },
    h5: { fontSize: '18px', fontWeight: 200 },
    h6: { fontSize: '16px', fontWeight: 100 },
    body1: { fontSize: '14px', lineHeight: 1.6 },
    body2: { fontSize: '12px', lineHeight: 1.6 },
    button: { textTransform: 'none', fontWeight: 500 },
    p1: { fontSize: '14px', lineHeight: 1.8, fontWeight: 400, color: '#444' }, // Paragraph style 1
    p2: { fontSize: '12px', lineHeight: 1.7, fontWeight: 400, color: '#666' }, // Paragraph style 2
  },
  
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '10px 16px',
          transition: 'all 0.3s ease-in-out',
          '&:hover': { opacity: 0.85 },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          padding: '16px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: { backgroundColor: '#099162' },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: { backgroundColor: '#099162', color: 'white' },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: { borderRadius: '8px', overflow: 'hidden' },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: { fontWeight: 600, backgroundColor: '#f0f0f0' },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: { fontSize: '14px', backgroundColor: '#333' },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: { borderRadius: '12px', padding: '16px' },
      },
    },
  }


});

export default theme;
