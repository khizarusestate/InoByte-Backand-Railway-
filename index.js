import express from 'express'
import nodemailer from 'nodemailer';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors({
  allowedHeaders:["Content-Type"],
  origin:"https://ino-byte.vercel.app",
  methods:["POST"]
}))
app.post("/help",async(req,res)=>{
      const { email, help } = req.body;
      const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL,
        pass: process.env.PASSWORD
      }
  });

  try {
    // Email to company
     await transport.sendMail({
      to: process.env.GMAIL,
      from: process.env.GMAIL,
      subject: `A Request From InoByte`,
      text: `From: ${email}. Request: ${help}`
    });

    // Email to user
    await transport.sendMail({
      to: email,
      from: process.env.GMAIL,
      subject: `Hi ${email}! Your Request was Sent to InoByte`,
      text: `Please wait for our response. Thanks for your patience!`
    });

    console.log("Email Sent");
    res.status(201).json({ message: "Emails sent successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error sending emails" });
}})

app.listen(process.env.PORT||5000,console.log("Server is Running at ",process.env.PORT))


