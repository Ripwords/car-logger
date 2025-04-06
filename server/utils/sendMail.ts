export const sendEmail = async (body: {
  name: string
  from: string
  subject: string
  content: string
}) => {
  const config = useRuntimeConfig()
  console.log(config.brevoKey)
  return await $fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": config.brevoKey,
    },
    body: {
      sender: {
        email: "contact@jjteoh.com",
        name: "Car-Logger",
      },
      to: [{ email: "contact@jjteoh.com", name: "Car-Logger" }],
      replyTo: {
        name: body.name,
        email: body.from,
      },
      subject: body.subject,
      htmlContent: body.content,
    },
  })
}
