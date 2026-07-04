import { NextResponse } from "next/server"
export async function GET (req){
    const {searchParams} = new URL (req.url)
    console.log(req)
    const mode =searchParams.get("hub.mode")
    const challenge =searchParams.get("hub.challenge")
    const token =searchParams.get("hub.verify_token")
    const VERIFY_TOKEN = process.env.META_VERIFY_TOKEN

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
     return new Response(challenge, { status: 200 }) } 
    return NextResponse.json({ error: 'Verification failed' }, { status: 403 }) 
} 


export async function POST(req) { 
    const body = await req.json() 
    console.log('Webhook event:', JSON.stringify(body, null, 2)) 
return NextResponse.json({ received: true }, { status: 200 }) 
}