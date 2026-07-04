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
      appId      : '1711287526569597',
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
      function(response){
        if (response.authResponse) { 
          // This gives you an access token for the logged-in Facebook user. // For Embedded Signup, Meta also sends a message event to the window. 
           } 
        else { 
          console.log('User cancelled login or did not authorize.') 
        }}

    )

  //   const res = await fetch("/api/sign-up")
  // console.log(res)
  // return res.json()
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