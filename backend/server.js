const { Resend } = require('resend');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', "https://katlehomyeza.github.io");
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { email, first_name, last_name, subject, message } = req.body;

    try {
      const data = await resend.emails.send({
        from: `${email} <onboarding@resend.dev>`,
        to: "ksjmyeza@gmail.com",
        subject: subject || 'New message from your portfolio site',
       html: `
        <!DOCTYPE html>
        <html>
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Message</title>
        <style>
            body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f4f4f7;
            margin: 0;
            padding: 0;
            }
            .container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 10px;
            box-shadow: 0 8px 24px rgba(0,0,0,0.1);
            overflow: hidden;
            }
            .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #ffffff;
            padding: 30px;
            text-align: center;
            }
            .header h1 {
            margin: 0;
            font-size: 28px;
            }
            .content {
            padding: 30px;
            color: #333333;
            line-height: 1.6;
            }
            .content h2 {
            font-size: 22px;
            margin-bottom: 10px;
            color: #2c3e50;
            }
            .info-box {
            background: #f8f9fa;
            border-left: 5px solid #667eea;
            padding: 20px;
            margin: 20px 0;
            border-radius: 5px;
            }
            .info-box p {
            margin: 5px 0;
            font-size: 16px;
            }
            .message-box {
            background: #eef2f7;
            padding: 20px;
            border-radius: 5px;
            margin-top: 20px;
            font-size: 16px;
            color: #2c3e50;
            }
            .footer {
            text-align: center;
            padding: 20px;
            background: #f4f4f7;
            font-size: 12px;
            color: #999999;
            }
        </style>
        </head>
        <body>
        <div class="container">
            <div class="header">
            <h1>📬 New Message Received</h1>
            </div>
            <div class="content">
            <h2>Message from ${first_name} ${last_name}</h2>
            <div class="info-box">
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject || 'No subject provided'}</p>
            </div>
            <div class="message-box">
                ${message || 'No message content.'}
            </div>
            </div>
            <div class="footer">
            This message was sent via your portfolio contact form.
            </div>
        </div>
        </body>
        </html>
        `

      });

      res.status(200).json({ success: true, data });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: err.message });
    }
    return;
  }

  res.status(404).json({ error: 'Not found' });
};
