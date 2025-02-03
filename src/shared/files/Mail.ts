import nodemailer from 'nodemailer'
import config from '../../config'

type FormValues = {
  email: string
  token: string
}

const sendForgotOTPMail = async (data: FormValues): Promise<boolean> => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: config.MAIL_USER,
      pass: config.MAIL_PASS
    }
  })

  const mailOptions = {
    from: config.MAIL_USER,
    to: data.email,
    subject: 'Reset Password',
    html: `
    <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Forgot Password</title>
<style>
  body { 
    font-family: Arial, sans-serif; 
    background-color: #f4f4f4; 
    margin: 0; 
    padding: 0; 
  }
  .email-container {
    max-width: 600px; 
    margin: 20px auto; 
    background: #ffffff; 
    padding: 20px; 
    border-radius: 8px; 
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }
  .button {
    display: inline-block;
    padding: 10px 20px;
    margin: 20px 0;
    background-color: #007BFF;
    color: #ffffff;
    text-decoration: none;
    border-radius: 5px;
  }
</style>
</head>
<body>
  <div class="email-container">
    <h2>Reset Your Password</h2>
    <p>Hi there,</p>
    <p>You recently requested to reset your password for your account. Click the button below to reset it:</p>
    <a href="${process.env.ROOT_URL}/reset-password?token=${data.token}" class="button">Reset Password</a>
    <p>If you did not request a password reset, please ignore this email or contact support if you have questions.</p>
    <p>Thanks,<br>Your Team</p>
  </div>
</body>
</html>

    `
  }

  try {
    await transporter.sendMail(mailOptions)
    return true
  } catch (error) {
    console.error('Error sending email:', error)
    return false
  }
}



export { sendForgotOTPMail }

