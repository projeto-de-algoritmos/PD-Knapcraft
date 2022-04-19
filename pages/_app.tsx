import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Theme } from '../src/models/Theme';
import { useEffect, useState } from 'react';
import Background from '../src/components/Background';
import Script from 'next/script';
import { API } from '../assets/consts'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <link rel="stylesheet" href="https://unpkg.com/minecraft-framework-css@1.1.6/css/main.css" />
      <Script src="https://unpkg.com/minecraft-framework-css@1.1.6/css/assets/script.js" />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
