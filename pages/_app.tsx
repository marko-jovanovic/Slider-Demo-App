import { ApolloProvider } from '@apollo/client';
import { AppProps } from 'next/app'
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { pink, teal } from "@material-ui/core/colors";
import Navbar from "../components/navbar/Navbar";
import apolloClient from '../apolloClient';
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
});

function MyApp ({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <Navbar />

        <div className='app'>
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default MyApp;
