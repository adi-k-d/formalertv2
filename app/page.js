'use client'

import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: process.env.NEXT_PUBLIC_META_APP_ID,
        cookie: true,
        xfbml: true,
        version: 'v25.0',
      })

      window.FB.AppEvents.logPageView()
      console.log('Facebook SDK initialized')
    }

    if (!document.getElementById('facebook-jssdk')) {
      const script = document.createElement('script')
      script.id = 'facebook-jssdk'
      script.src = 'https://connect.facebook.net/en_US/sdk.js'
      script.async = true
      script.defer = true
      script.crossOrigin = 'anonymous'
      document.body.appendChild(script)
    }
  }, [])

  useEffect(() => {
    const handleMessage = (event) => {
      // Optional: lock this down further if needed
      if (!event.data) return

      console.log('Meta signup event:', event.data)

      // Meta embedded signup may send string or object payloads
      // If it is a JSON string, parse it safely
      if (typeof event.data === 'string') {
        try {
          const parsed = JSON.parse(event.data)
          console.log('Parsed Meta event:', parsed)
        } catch {
          // ignore non-JSON strings
        }
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  const handleMetaSignup = async () => {
    if (!window.FB) {
      alert('Facebook SDK not loaded yet')
      return
    }

    const configId = process.env.NEXT_PUBLIC_META_CONFIG_ID

    if (!configId) {
      console.error('Missing NEXT_PUBLIC_META_CONFIG_ID')
      alert('Missing Meta config id')
      return
    }

    window.FB.login(
      function (response) {
        console.log('FB login response:', response)

        // For embedded signup with response_type=code,
        // the authorization code is typically in response.authResponse.code
        const code = response?.authResponse?.code

        if (code) {
          console.log('Authorization code:', code)

          // Send this code to your backend to exchange it
          // Example:
          // fetch('/api/meta/exchange-code', {
          //   method: 'POST',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify({ code }),
          // })
        } else {
          console.log('No code returned')
        }
      },
      {
        config_id: configId,
        response_type: 'code',
        override_default_response_type: true,
        extras: {
          setup: {},
          sessionInfoVersion: '3',
        },
      }
    )
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Connect WhatsApp
        </h1>

        <p className="mb-6 text-sm text-gray-600">
          Sign up with Meta to connect your WhatsApp Business account and start
          sending messages.
        </p>

        <button
          onClick={handleMetaSignup}
          className="w-full rounded-lg bg-[#1877F2] px-4 py-3 font-medium text-white hover:opacity-90"
        >
          Continue with Facebook
        </button>

        <p className="mt-4 text-center text-xs text-gray-500">
          You’ll be redirected to Meta Embedded Signup to complete the setup.
        </p>
      </div>
    </main>
  )
}