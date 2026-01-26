import { NextResponse } from "next/server";
// import nodemailer from "nodemailer";
import nodemailer from "nodemailer";

console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_PASS);


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      contactMethod,
      mpesaNumber,
      serviceName,
      total,
    } = body;

    // 1. SEND INTERNAL EMAIL ALERT
    // Configure your transporter (Use Gmail App Passwords for Gmail)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Everything.co.ke" <${process.env.EMAIL_USER}>`,
      to: "your-admin-email@gmail.com", // Where you want to receive orders
      subject: `New Order: ${serviceName} - ${name}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
          <h2 style="color: #0F172A;">New Service Request</h2>
          <p><strong>Service:</strong> ${serviceName}</p>
          <p><strong>Amount:</strong> KES ${total}</p>
          <hr />
          <p><strong>Customer:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Preferred Contact:</strong> ${contactMethod}</p>
          <p><strong>M-Pesa Number Used:</strong> ${mpesaNumber}</p>
        </div>
      `,
    };

    // Send email asynchronously so it doesn't block the M-Pesa push
    const emailPromise = transporter.sendMail(mailOptions);

    // 2. INITIATE DARAJA STK PUSH
    // Note: You'll need to implement your Daraja credentials/logic here
    const mpesaPromise = fetch(
      "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.DARAJA_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          BusinessShortCode: process.env.MPESA_PAYBILL,
          Password: "...", // Generated password
          Timestamp: "...", // Current timestamp
          TransactionType: "CustomerPayBillOnline",
          Amount: total,
          PartyA: mpesaNumber.replace("+", ""), // Format: 2547XXXXXXXX
          PartyB: process.env.MPESA_PAYBILL,
          PhoneNumber: mpesaNumber.replace("+", ""),
          CallBackURL: "https://yourdomain.com/api/mpesa-callback",
          AccountReference: serviceName.substring(0, 12),
          TransactionDesc: `Payment for ${serviceName}`,
        }),
      }
    );

    // Wait for both to finish (or at least attempt)
    await Promise.all([emailPromise, mpesaPromise]);

    return NextResponse.json(
      { message: "Checkout initiated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Checkout Error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
