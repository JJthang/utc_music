import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from '../theme';


export const AppThemeProvider = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
    </ThemeProvider>
);