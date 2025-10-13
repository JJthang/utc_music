import { createTheme, type ThemeOptions } from "@mui/material";

const themeOptions: ThemeOptions = {
    components: {
        MuiCssBaseline: {
          styleOverrides: {
            '*': {
              WebkitAppearance: 'none', // loại bỏ các style mặc định của trình duyệt
            },
          },
        },
      },
    shape: { borderRadius: 8 },
    spacing: 8,
    
  };

export const theme = createTheme(themeOptions);