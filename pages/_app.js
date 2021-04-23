import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { pink, teal } from "@material-ui/core/colors";
import Navbar from "../components/navbar/Navbar";
import '../scss/globals.scss';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: teal[500]
    },
    secondary: {
      main: pink[500]
    }
  }
})

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />

      <div className='app'>
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}

export default MyApp
