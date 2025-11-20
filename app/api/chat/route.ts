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

      If asked about something not in this list, politely say you don't have that information but they can contact Marwan directly.
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
