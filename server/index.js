import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { jsPDF } from 'jspdf';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load env vars from .env.local
dotenv.config({ path: join(__dirname, '../.env.local') });

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER, // e.g. inymartlabs@gmail.com
    pass: process.env.SMTP_PASS, // e.g. app password
  },
});

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, subject, service, comments } = req.body;

    // Validation
    if (!name || !email || !phone || !comments) {
      return res.status(400).json({ status: 'error', message: 'Missing required fields' });
    }

    // 1. Generate PDF
    const doc = new jsPDF();
    const dateStr = new Date().toLocaleString();
    
    // Add PDF content
    doc.setFontSize(22);
    doc.setTextColor(255, 102, 0); // Inymart Orange
    doc.text('New Enquiry - Popup Form', 20, 20);
    
    doc.setFontSize(12);
    doc.setTextColor(30, 30, 30);
    
    const startY = 40;
    const lineHeight = 10;
    
    doc.text(`Date & Time: ${dateStr}`, 20, startY);
    doc.text(`Name: ${name}`, 20, startY + lineHeight);
    doc.text(`Email: ${email}`, 20, startY + lineHeight * 2);
    doc.text(`Phone: ${phone}`, 20, startY + lineHeight * 3);
    if (subject) doc.text(`Subject: ${subject}`, 20, startY + lineHeight * 4);
    if (service) doc.text(`Service: ${service}`, 20, startY + lineHeight * 5);
    
    doc.text('Comments / Message:', 20, startY + lineHeight * 7);
    
    // Handle long comments wrapping
    const splitComments = doc.splitTextToSize(comments, 170);
    doc.text(splitComments, 20, startY + lineHeight * 8);

    // Get PDF as buffer
    const pdfBuffer = Buffer.from(doc.output('arraybuffer'));

    // 2. Send Email
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: 'saravananbsccs2024@gmail.com',
      subject: `New Website Enquiry from ${name}`,
      text: `You have received a new enquiry from the website popup form.\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nPlease find the detailed enquiry attached as a PDF.`,
      attachments: [
        {
          filename: `Enquiry_${name.replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now()}.pdf`,
          content: pdfBuffer,
          contentType: 'application/pdf',
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    // 3. Return success
    return res.status(200).json({ status: 'success', message: 'Request sent successfully' });
  } catch (error) {
    console.error('Error handling contact form:', error);
    return res.status(500).json({ 
      status: 'error', 
      message: 'Failed to send request. Please try again later.' 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
