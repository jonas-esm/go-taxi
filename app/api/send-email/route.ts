import { createTransport } from 'nodemailer'

import type SMTPTransport from 'nodemailer/lib/smtp-transport'

import { reservationMailTemplate } from '@/utils/mailing'

const transporterOptions: SMTPTransport.Options = {
  host: process.env.EMAIL_HOST!,
  port: +process.env.EMAIL_PORT!,
  secure: true, // true for port 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASS || ''
  }
}

const transporter = createTransport(transporterOptions)

// SMTP Server Address: smtp.gmail.com

// Use Authentication: yes

// Secure Connection: TLS/SSL based on your mail client/website SMTP plugin

// SMTP Username: your Gmail account (xxxx@gmail.com)

// SMTP Password: your Gmail password

// Gmail SMTP port: 465 (SSL) or 587 (TLS)

// const transporter = createTransport({
//   host: process.env.EMAIL_HOST,
//   port: process.env.EMAIL_PORT,
//   secure: false, // Use TLS
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// })

export async function POST(req: Request) {
  const { customerName, fromCoordinates, notes, phoneNumber, toCoordinates, date, time } = await req.json()

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.RECEPCIONIST_EMAIL,
    subject: 'GOTAXI New Order',

    // text: message,
    html: reservationMailTemplate({
      customerName,
      fromCoordinates,
      notes,
      phoneNumber,
      toCoordinates,
      date,
      time
    })
  }

  try {
    const info = await transporter.sendMail(mailOptions)

    console.log('Message sent: %s', info.messageId)

    return Response.json({ message: 'Email sent successfully' })
  } catch (error) {
    console.error('Error sending email:', error)

    return Response.json({ error: 'Failed to send email' })
  }
}
