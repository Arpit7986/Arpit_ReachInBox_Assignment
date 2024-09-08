const { GoogleGenerativeAI } = require("@google/generative-ai");
import { config } from './config';

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

export const categorizeEmail = async (subject: string, content: string): Promise<string> => {
  try {
    const model=genAI.getGenerativeModel({model:"gemini-pro"});
    const prompt = `You are an AI assistant that categorizes emails. Categorize the email as either 'Action Required', 'Information', or 'Follow-up Needed'. Respond with only the category.\n\nSubject: ${subject}\n\nContent: ${content}`;
    
    const result = await model.generateContent(prompt);
    const response=await result.response;
    const text=response.text()
    const category =text.trim() || 'Uncategorized';  // Access the content correctly
    
    console.log('Categorized as:', category);
    return category;
  } catch (error) {
    console.error('Error in categorizeEmail:', error);
    return 'Uncategorized';
  }
};

export const generateResponse = async (category: string, subject: string, content: string): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `You are a helpful assistant responding to emails. Provide a concise, professional response that addresses the content of the email. Your response should be in the tone of a human assistant.\n\nCategory: ${category}\nSubject: ${subject}\n\nContent: ${content}\n\nGenerate a response:`;
    const result = await model.generateContent(prompt);
    const response=await result.response;
    const text=response.text()
    const generatedResponse =text.trim() || 'No response generated';  // Access the content 
    console.log('Generated response:', generatedResponse);
    return generatedResponse;
  } catch (error) {
    console.error('Error in generateResponse:', error);
    return 'No response generated';
  }
};
