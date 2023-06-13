import Nav from '@components/Nav'
import Provider from '@components/Provider'
import '@styles/globals.css'

export const metadata = {
  title: 'Promptopia',
  description: 'Discover & Share AI Prompts',
  icons: [
    {
      rel: 'icon',
      type: 'image/svg',
      sizes: '32x32',
      url: '/assets/images/logo.svg',
    },
  ],
}

const RootLayout = ({ children }) => {
  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        <Provider>
          <div className='main'>
            <div className='gradient'></div>
          </div>
          <main className='app'>
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout
