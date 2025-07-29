import nodemailer from "nodemailer";
import {GMAIL_PASS,SENDER_EMAIL} from './env.js'

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: SENDER_EMAIL,      // Your Gmail address
    pass: GMAIL_PASS    // App password from Google
  }
});