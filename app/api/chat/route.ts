import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, AIMessage, SystemMessage } from "@langchain/core/messages";
import { portfolioData } from "@/app/content/portfolio-data";

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();
        const apiKey = process.env.GOOGLE_API_KEY;

        if (!apiKey) {
            return Response.json({ error: "Google API Key not found" }, { status: 500 });
        }

        const model = new ChatGoogleGenerativeAI({
            apiKey: apiKey,
            model: "gemini-2.5-flash",
            maxOutputTokens: 500,
        });

        // Construct the context from portfolio data
        const context = `
      You are an AI assistant for Marwan ElZaher's portfolio website.
      Your goal is to answer visitor questions about Marwan based ONLY on the following information.
      Be friendly, professional, and concise.

      Profile:
      Name: ${portfolioData.personal.name}
      Title: ${portfolioData.personal.title}
      Tagline: ${portfolioData.personal.tagline}
      Description: ${portfolioData.personal.description}
      Location: ${portfolioData.personal.location}
      Email: ${portfolioData.personal.email}

      Skills:
      ${portfolioData.skills.map(s => `- ${s.category}: ${s.items.join(", ")}`).join("\n")}

      Projects:
      ${portfolioData.projects.map(p => `- ${p.title} (${p.category}): ${p.description}. Tech: ${p.technologies.join(", ")}`).join("\n")}

      CRITICAL: You have access to the following TOOLS. Use them when appropriate.

      1. NAVIGATION:
      Command: [[NAVIGATE: target]]
      Targets: #projects, #skills, #about, /contact, /
      Description: Navigate the user to a specific section.
      Example: "Let me show you the projects. [[NAVIGATE: #projects]]"

      2. SCHEDULING:
      Command: [[SCHEDULE_MEETING]]
      Description: Open the scheduling calendar (Calendly) for the user to book a meeting.
      Trigger: Use this when the user asks to "book a call", "schedule a meeting", "interview you", etc.
      Example: "I'd love to chat! You can pick a time on my calendar here. [[SCHEDULE_MEETING]]"

      3. EMAIL:
      Command: [[SEND_EMAIL: {"name": "...", "contact": "...", "message": "..."}]]
      Description: Send an email to Marwan.
      Trigger: Use this when the user wants to leave a message, contact Marwan, or hire him.
      IMPORTANT: You MUST collect the user's Name, Contact Info (Email/Phone), and Message BEFORE using this tool.
      If you don't have this info, ask for it first.
      Example: "Thanks John! I've sent your message to Marwan. [[SEND_EMAIL: {"name": "John", "contact": "john@example.com", "message": "Hi, I want to hire you."}]]"

      IMPORTANT: When navigating or using tools, act like a tour guide. Briefly explain what you are doing.
    `;

        // Convert frontend messages to LangChain format
        const history = messages.map((m: any) =>
            m.role === 'user' ? new HumanMessage(m.content) : new AIMessage(m.content)
        );

        // Prepend system message
        const fullHistory = [new SystemMessage(context), ...history];

        const response = await model.invoke(fullHistory);

        return Response.json({ content: response.content });
    } catch (error) {
        console.error("Chat error:", error);
        return Response.json({ error: "Failed to generate response" }, { status: 500 });
    }
}
