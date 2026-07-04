export async function GET (req){
    const params = new URL (req.url)
    const mode =params.get("hub.mode")
    const challenge =params.get("hub.challenge")
    const token =params.get("hub.verify_token")
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