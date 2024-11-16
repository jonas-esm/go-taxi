import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const amount = body?.amount

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card'] // Apple Pay falls under 'card'
    })

    return Response.json({ clientSecret: paymentIntent.client_secret })
  } catch (error: any) {
    return Response.json({ error: `${error}` }, { status: error?.status || 400 })
  }
}
