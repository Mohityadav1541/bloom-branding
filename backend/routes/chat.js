const express = require('express');
const router = express.Router();
// const OpenAI = require('openai'); // Uncomment if you have an API key

// Initialize OpenAI (Optional)
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY, 
// });

router.post('/', async (req, res) => {
    const { message } = req.body;

    try {
        // --- OPTION 1: REAL AI (Uncomment below if you have OpenAI Key) ---
        /*
        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: "You are a helpful AI assistant for Bloom Studio, a creative digital agency. You are polite, professional, and concise." },
                { role: "user", content: message }
            ],
            model: "gpt-3.5-turbo",
        });
        
        return res.json({ reply: completion.choices[0].message.content });
        */

        // --- OPTION 2: SIMULATED AI (Rule-based Fallback) ---
        // This acts as a placeholder until you add an API key.
        const lowerMsg = message.toLowerCase();
        let reply = "I'm not sure about that. Could you please contact our team directly?";

        if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
            reply = "Hello! Welcome to Bloom Studio. How can I assist you with your digital needs today?";
        } else if (lowerMsg.includes('service') || lowerMsg.includes('work') || lowerMsg.includes('offer')) {
            reply = "We offer a range of services including Branding, Web Design, Digital Marketing, and Content Creation. You can check our Services page for more details!";
        } else if (lowerMsg.includes('price') || lowerMsg.includes('cost') || lowerMsg.includes('quote')) {
            reply = "Our pricing is tailored to each project's unique requirements. Please fill out the Contact form or email us at hello@bloombranding.com for a custom quote.";
        } else if (lowerMsg.includes('contact') || lowerMsg.includes('email') || lowerMsg.includes('phone')) {
            reply = "You can reach us at hello@bloombranding.com or call us at +91 98765 43210.";
        } else if (lowerMsg.includes('location') || lowerMsg.includes('address') || lowerMsg.includes('where')) {
            reply = "We are based in Mumbai, Maharashtra, India.";
        }

        // Simulate network delay for realism
        setTimeout(() => {
            res.json({ reply });
        }, 1000);

    } catch (error) {
        console.error("Chat API Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
