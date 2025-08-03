const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendSubscriptionEmail = async (toEmail) => {
  const mailOptions = {
    from: `"Grozy" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "💌 You’re in! Welcome to the Grozy family.",
    html: `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 24px; color: #333;">
    <h2 style="color:#16a34a;">Hey there, welcome to the Grozy family! 🌿</h2>
    
    <p>We’re genuinely thrilled to have you with us.</p>
    
    <p>You’ve just joined a little green corner of the world where nature meets care, and subscribers like you get first dibs on new arrivals, exclusive tips, and seasonal surprises.</p>

    <p>To say thanks, here’s a special gift from us — use the code <strong style="color:#16a34a;">WELCOME10</strong> and enjoy a little something on your next visit. 💚</p>
    
    <p>We promise not to spam — just thoughtful updates, cozy ideas, and plant love straight to your inbox.</p>

    <p style="margin-top: 24px;">Gratefully,</p>
    <p style="font-weight: bold;">— The Grozy Team 🌱</p>

    <hr style="margin-top: 30px; border: none; border-top: 1px solid #ddd;">
    <p style="font-size: 12px; color: #888;">You’re receiving this email because you subscribed to Grozy updates. We’re happy you’re here 💌</p>
  </div>
`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Mailer error:", error);
    return { success: false, error };
  }
};

module.exports = { sendSubscriptionEmail };
