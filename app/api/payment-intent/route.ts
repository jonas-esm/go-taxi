import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  try {
    const body: { items: { id: string; amount: number }[] } | undefined = await req.json()

    const amount = body?.items?.[0]?.amount

    if (amount) {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,

        currency: 'usd',
        payment_method_types: ['card'] // Apple Pay falls under 'card'
        //   payment_method:
      })

      return Response.json({ clientSecret: paymentIntent.client_secret })
    } else return Response.json({ error: 'There is no amount.' })
  } catch (error: any) {
    return Response.json({ error: `${error}` }, { status: error?.status || 400 })
  }
}
