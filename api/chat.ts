/**
 * Serverless API Endpoint: /api/chat
 * Secure server-side proxy for Google Gemini API integration.
 * Compatible with Vercel Serverless Functions, Netlify Functions, and Node edge runtimes.
 *
 * Environment Variable: GEMINI_API_KEY (stored securely in serverless dashboard, NEVER bundled in client)
 */

interface ChatRequestBody {
  message?: string;
}

const SYSTEM_PROMPT = `You are Adarsh Panda's official AI Portfolio Assistant. Answer in first-person as Adarsh Panda or as Adarsh's trusted representative. Be concise, polite, professional, and enthusiastic.

About Adarsh Panda:
- Degree: B.Tech in Computer Science and Engineering (2021–2025) from CV Raman Global University, Bhubaneswar, Odisha (CGPA: 7.6 / 10).
- Specialization: Full-Stack Web Development, React.js, Node.js, Express.js, Python, MySQL, REST APIs.
- E-Commerce: WordPress & WooCommerce backend architecture, custom checkout workflows, PHP.
- Production Projects:
  1. Rabindra Medical Hall (Live E-Pharmacy at https://rabindramedicalhall.in) — Responsive pharmacy storefront on WooCommerce, prescription upload verification, WhatsApp order notifications, MySQL.
  2. FORGE Fitness (AI-Powered Health Platform) — Workout tracking, nutrition analytics, contextual AI fitness coaching, persistent data models with REST APIs.
- Certifications:
  • Practical Cyber Security for Cyber Security Practitioners — NPTEL, IIT Kanpur
  • Industrial Training in Data Science — LearnWik Solutions Pvt. Ltd.
  • Cloud Security Fundamentals — Palo Alto Networks via Coursera
  • Foundations of User Experience (UX) Design — Google via Coursera
- Location: Bhubaneswar, Odisha, India.
- Availability: Immediately available for Full-Stack, Frontend (React), Backend (Node.js/Python), or Software Engineer roles.
- Contact: Email: ada203880@gmail.com | Phone/WhatsApp: +91 9861054025 | LinkedIn: linkedin.com/in/adarsh-panda-5181b9214 | GitHub: github.com/ada203880-boop

Keep replies direct, informative, and under 3-4 sentences whenever possible.`;

// In-memory sliding window rate limiter
const ipRequestCounts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 12;

export default async function handler(req: Request): Promise<Response> {
  // CORS Headers
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed. Use POST.' }), {
      status: 405,
      headers,
    });
  }

  // Rate Limiting by client IP
  const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown-client';
  const now = Date.now();
  const rateRecord = ipRequestCounts.get(clientIp);

  if (rateRecord && now < rateRecord.resetTime) {
    if (rateRecord.count >= MAX_REQUESTS_PER_WINDOW) {
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded. Please wait a minute before asking again.' }),
        { status: 429, headers }
      );
    }
    rateRecord.count++;
  } else {
    ipRequestCounts.set(clientIp, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
  }

  try {
    const body: ChatRequestBody = await req.json();
    const userMessage = (body.message || '').trim();

    // Input Validation
    if (!userMessage) {
      return new Response(JSON.stringify({ error: 'Missing message parameter.' }), {
        status: 400,
        headers,
      });
    }

    if (userMessage.length > 400) {
      return new Response(
        JSON.stringify({ error: 'Prompt exceeds maximum allowed length of 400 characters.' }),
        { status: 400, headers }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({
          error: 'Server configuration notice: GEMINI_API_KEY is not set on the server environment.',
        }),
        { status: 503, headers }
      );
    }

    // Call Google Gemini API securely from backend
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    const payload = {
      contents: [
        {
          role: 'user',
          parts: [{ text: `${SYSTEM_PROMPT}\n\nVisitor Question: ${userMessage}` }],
        },
      ],
      generationConfig: {
        maxOutputTokens: 250,
        temperature: 0.6,
      },
    };

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000); // 12-second timeout

    const geminiRes = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!geminiRes.ok) {
      return new Response(
        JSON.stringify({ error: `Gemini API responded with status ${geminiRes.status}` }),
        { status: 502, headers }
      );
    }

    const data = await geminiRes.json();
    const replyText =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I'm ready to answer any questions about Adarsh's portfolio and software engineering work!";

    return new Response(JSON.stringify({ reply: replyText }), {
      status: 200,
      headers,
    });
  } catch (err: unknown) {
    const isTimeout = err instanceof Error && err.name === 'AbortError';
    return new Response(
      JSON.stringify({
        error: isTimeout
          ? 'AI generation timed out. Please try again.'
          : 'Internal server error while processing request.',
      }),
      { status: 500, headers }
    );
  }
}

