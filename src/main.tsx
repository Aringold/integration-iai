import '@rainbow-me/rainbowkit/styles.css'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { WagmiConfig } from 'wagmi'

import { App } from './App'
import { chains, config } from './wagmi'
import RefContextProvider from './contexts/RefContextProvider'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiConfig config={config}>
      <RainbowKitProvider chains={chains}>
        <RefContextProvider>
          <App />
        </RefContextProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>,
)
