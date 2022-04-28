import { SessionProvider } from "next-auth/react"


import Navbar from '../components/Navbar'
import '../styles/globals.css'


export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
    <Navbar/>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

// function MyApp({ Component, pageProps }) {
//   return (
//     <SessionProvider>
//     <Navbar/>
//       <Component {...pageProps} />
//     </SessionProvider>
//   )
// }

// export default MyApp
