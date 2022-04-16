import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Theme } from '../src/models/Theme';
import { useEffect, useState } from 'react';
import Background from '../src/components/Background';
import Script from 'next/script';

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState<Theme>();

  useEffect(() => {
    process.env.API = process.env.API ?? 'http://localhost:3000/api'

    fetch(process.env.API + '/theme')
      .then(r => r.ok && r.json())
      .then(theme => setTheme(theme));
  }, []);
  
  return (
      <>
        <link rel="stylesheet" href="https://unpkg.com/minecraft-framework-css@1.1.6/css/main.css"/>
        <Script src="https://unpkg.com/minecraft-framework-css@1.1.6/css/assets/script.js" />
        <Background backgroundUri={theme?.background}/>
        <Component {...pageProps}/>
      </>
    )
}

export default MyApp
