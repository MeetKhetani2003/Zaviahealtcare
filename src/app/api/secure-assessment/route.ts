import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db();
    
    // Save to inquiries collection instead of secure_assessments
    // so it shows up in the Admin Dashboard automatically
    const collection = db.collection('inquiries');

    const newInquiry = {
      name: body.name,
      email: body.email || '',
      phone: body.phone,
      age: body.age,
      concern: body.concern || 'Free Assessment Submission',
      type: 'Free Assessment',
      reports: body.reports, // contains physicalReportUrl and bloodReportUrl
      status: 'pending',
      createdAt: new Date(),
    };

    await collection.insertOne(newInquiry);

    // Send email using Nodemailer
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '465'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const mailOptions = {
        from: process.env.SMTP_USER,
        to: process.env.SMTP_USER, // Send to the admin
        subject: `New Free Assessment Inquiry from ${body.name}`,
        html: `
          <h2>New Free Assessment Submission</h2>
          <p><strong>Name:</strong> ${body.name}</p>
          <p><strong>Age:</strong> ${body.age}</p>
          <p><strong>Phone:</strong> ${body.phone}</p>
          <p><strong>Email:</strong> ${body.email || 'N/A'}</p>
          <p><strong>Concern:</strong> ${body.concern || 'N/A'}</p>
          <h3>Reports Attached:</h3>
          <ul>
            <li><a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}${body.reports?.physicalReportUrl}">Physical Report</a></li>
            <li><a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}${body.reports?.bloodReportUrl}">Blood Report</a></li>
          </ul>
        `,
      };

      await transporter.sendMail(mailOptions);
    }
    
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Error saving secure assessment:', error);
    return NextResponse.json(
      { error: 'Failed to submit secure assessment' },
      { status: 500 }
    );
  }
}
