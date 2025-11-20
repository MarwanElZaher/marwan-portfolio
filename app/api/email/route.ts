import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const { name, contact, message } = await req.json();

        // Validate input
        if (!name || !contact || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Check for credentials
        const user = process.env.EMAIL_USER;
        const pass = process.env.EMAIL_PASS;

        if (!user || !pass) {
            console.warn('Missing Gmail credentials. Email simulation mode.');
            // Simulate success for demo purposes if no keys are present
            return NextResponse.json({ success: true, simulated: true });
        }

        // Configure transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user,
                pass,
            },
        });

        // Send email
        await transporter.sendMail({
            from: user,
            to: 'marawanmzaher@gmail.com', // Your email
            subject: `Portfolio Message from ${name}`,
            text: `
                Name: ${name}
                Contact: ${contact}

                Message:
                ${message}
                            `,
            html: `
                <h3>New Message from Portfolio</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Contact:</strong> ${contact}</p>
                <br/>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Email error:', error);
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
}
