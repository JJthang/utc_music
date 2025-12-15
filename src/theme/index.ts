import { createTheme, type ThemeOptions } from "@mui/material";

const themeOptions: ThemeOptions = {
    palette: {
        mode: 'dark',
        primary: {
            main: '#60A5FA', // var(--color-purple)
        },
        background: {
            default: '#0F172A', // var(--color-outlet)
            paper: '#1E293B', // var(--color-bg-secondary)
        },
        text: {
            primary: '#ffffff', // var(--color-text-primary)
            secondary: 'rgba(255, 255, 255, 0.7)', // var(--color-text-secondary)
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
                    backgroundColor: '#1E293B', // var(--color-bg-secondary)
                    border: '1px solid #334155', // var(--color-bg-tertiary)
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        backgroundColor: '#334155', // var(--color-bg-tertiary)
                    },
                },
            },
        },
    },
    shape: { borderRadius: 8 },
    spacing: 8,
};

export const theme = createTheme(themeOptions);