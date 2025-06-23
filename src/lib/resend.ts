"use server"

import {Resend} from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

type emailType = {
    name: string,
    email: string,
    message: string
}

export const sendEmail = async ({name,message,email}:emailType) => {
    await resend.emails.send({
        to:"nuniezajames10@gmail.com",
        from:"james-send <onboarding@resend.dev>",
        subject:name,
        html:`<div>Sender:${" "+email}</div><div>${message}</div>`
    })
}