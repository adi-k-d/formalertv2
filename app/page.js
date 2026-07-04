'use client'
import { useEffect } from "react"
async function signup(){
  const res = await fetch("/api/sign-up")
  console.log(res)
  return res.json()
  
  // console.log("signup")
}



export default function Home (){
  useEffect(()=>{
  window.fbAsyncInit = function() {
    FB.init({
      appId      : process.env.META_APP_ID,
      cookie     : true,
      xfbml      : true,
      version    : 'v25.0'
    });
      
    FB.AppEvents.logPageView();   
      
  };
  const script = document.createElement('script') 
  script.src = 'https://connect.facebook.net/en_US/sdk.js' 
  script.async = true 
  script.defer = true 
  document.body.appendChild(script)



},[])
  useEffect(()=>{
    if(!event.data) return
    console.log('Meta signup event:', event.data)


  },[])
  
  const handleMetaSignup=async()=>{
    if(!window.FB){
      alert("FB not loaded yet")
    }

    window.FB.login(
      function (response) {
        console.log('FB login response:', response)
      },
      {
        config_id: process.env.META_CONFIG_ID,
        response_type: 'code',
        override_default_response_type: true,
        extras: {
          setup: {},
          sessionInfoVersion: '3',
        },
      })
  }
  return  <><main className="min-h-screen flex items-center justify-center bg-gray-100 px-4"> 
  <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
     <h1 className="mb-2 text-3xl font-bold text-gray-900"> Connect WhatsApp </h1> 
     <p className="mb-6 text-sm text-gray-600"> Sign up with Meta to connect your WhatsApp Business account and start sending messages. </p> 
     <button onClick={handleMetaSignup} className="w-full rounded-lg bg-[#1877F2] px-4 py-3 font-medium text-white hover:opacity-90" > 
      Continue with Facebook 
      </button> 
     <p className="mt-4 text-center text-xs text-gray-500"> You’ll be redirected to Meta Embedded Signup to complete the setup. 
      </p> 
      </div> 
      </main> </>
  
}