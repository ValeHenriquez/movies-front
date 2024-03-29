'use client'
import { ApolloProvider } from '@apollo/client'
import './globals.css'
import { Inter } from 'next/font/google'
import client from '../config/apollo-client'
import { ThemeProvider } from '@material-tailwind/react'
import { Provider } from 'react-redux'
import { store } from '@/store/store'
import SideBar from '@/components/SideBar'
import { usePathname } from 'next/navigation'
import { AuthContextProvider } from '@/context/AuthContext'


const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();

  const showSideBar = pathname !== '/auth/login' && pathname !== '/auth/signup';

  return (
    <html lang="en"
      className="h-full bg-white"
    >

      <body className='flex h-full row'>
        <ThemeProvider>
          <Provider store={store}>
            <ApolloProvider client={client}>
              <AuthContextProvider>
                {showSideBar && <SideBar />}
                {children}
              </AuthContextProvider>
            </ApolloProvider>
          </Provider>
        </ThemeProvider>

      </body>
    </html>
  )
}
