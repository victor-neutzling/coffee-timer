
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { Timer } from './timer';

const theme = createTheme();

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Timer />
        </ThemeProvider>
    )
}