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

      CRITICAL: You have the ability to navigate the user to specific sections of the website.
      If the user asks to see a specific section or if your answer refers to a specific section, append a navigation command to the end of your response.
      The command format is: [[NAVIGATE: target]]

      IMPORTANT: When navigating, act like a tour guide. Briefly explain what you are showing them before you take them there.
      - Instead of just "Here you go [[NAVIGATE: #projects]]", say "Here are Marwan's featured projects. You can see his work in AI and Web Development below. [[NAVIGATE: #projects]]"
      - Instead of "Contact him here [[NAVIGATE: /contact]]", say "I've taken you to the contact page. You can use the form below to send Marwan a message directly. [[NAVIGATE: /contact]]"

      Valid targets are:
      - #projects (for projects, work, portfolio)
      - #skills (for skills, technologies, stack)
      - #about (for about me, bio, background)
      - /contact (for contact, email, hire me)
      - / (for home, start)

      Example: "Sure! Let me show you Marwan's technical skills. He specializes in Next.js and AI integration. [[NAVIGATE: #skills]]"
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
