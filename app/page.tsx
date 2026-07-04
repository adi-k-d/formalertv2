'use client'
async function signup(){
  const res = await fetch("/api/sign-up")
  console.log(res)
  return res.json()
  
  // console.log("signup")
}

export default function Home (){
  return (
    <>
    <h1>Sign up with Facebook</h1>
    <button onClick={()=>signup()}>Sign up</button>
    </>
  )
}