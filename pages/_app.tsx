import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Theme } from '../src/models/Theme';
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState<Theme>();
  pageProps.theme = theme;

  useEffect(() => {
    fetch(process.env.API + '/theme')
      .then(r => r.ok && r.json())
      .then(theme => setTheme(theme));
  }, []);
  
  return <Component {...pageProps}/>
}

process.env.API = process.env.API ?? 'http://localhost:3000/api'

export default MyApp
