import { onRequest } from "firebase-functions/v2/https";
import { GoogleGenAI } from "@google/genai";
import { systemPrompt } from "./systemPrompt";
import { retrieveRelevantKnowledge } from "./retrieval";

const ai = new GoogleGenAI({});

export const portfolioChat = onRequest(
  {
    cors: true,
    secrets: ["GEMINI_API_KEY"],
    region: "asia-northeast1",
  },
  async (req, res) => {
    try {
      if (req.method !== "POST") {
        res.status(405).json({ error: "Method not allowed" });
        return;
      }

      const message = req.body?.message;

      if (!message || typeof message !== "string") {
        res.status(400).json({ error: "Message is required" });
        return;
      }

      if (message.length > 1000) {
        res.status(400).json({ error: "Message is too long" });
        return;
      }

      const relevantKnowledge = retrieveRelevantKnowledge(message);

      if (relevantKnowledge.length === 0) {
        res.json({
          reply:
            "I don't have enough information about that. Please contact Tun through the portfolio contact links.",
        });
        return;
      }

      const contextText = relevantKnowledge
        .map((item) => {
          return `Title: ${item.title}\nContent: ${item.content}`;
        })
        .join("\n\n---\n\n");

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `
${systemPrompt}

Portfolio knowledge:
${contextText}

Visitor question:
${message}

Answer using only the portfolio knowledge.
                `.trim(),
              },
            ],
          },
        ],
      });

      res.json({
        reply: response.text,
        sources: relevantKnowledge.map((item) => ({
          id: item.id,
          title: item.title,
        })),
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        error: "AI chat failed",
      });
    }
  }
);