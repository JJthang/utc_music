import { createTheme, type ThemeOptions } from "@mui/material";

const themeOptions: ThemeOptions = {
    palette: {
        mode: 'dark',
        primary: {
            main: '#60A5FA',
        },
        background: {
            default: '#0F172A',
            paper: '#1E293B',
        },
        text: {
            primary: '#ffffff',
            secondary: 'rgba(255, 255, 255, 0.7)',
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                '*': {
                    WebkitAppearance: 'none', // loại bỏ các style mặc định của trình duyệt
                },
            },
        },
        MuiMenu: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#1E293B',
                    border: '1px solid #334155',
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        backgroundColor: '#334155',
                    },
                },
            },
        },
    },
    shape: { borderRadius: 8 },
    spacing: 8,
};

export const theme = createTheme(themeOptions);