const axios = require("axios");
require("dotenv").config();

const generatePlantTips = async (plantName) => {
  const prompt = `
Give 5–6 concise, beginner-friendly care tips for the indoor plant: ${plantName}.
Each tip should be short (1–2 lines) and start with a relevant emoji (e.g., ☀️ for sunlight, 💧 for watering, leaf emoji , pot emoji etc.) and relevenant tip name like sunlight ,watering.
Use bullet points (•) or dashes (-). Keep language very simple.
Do NOT merge all tips into a single paragraph.
`;


  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 200,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const text = response.data.choices[0].message.content;
    return formatCareTips(text);
  } catch (error) {
    console.error("OpenAI API error:", error.response?.data || error.message);
    throw new Error("Plant care tip generation failed.");
  }
};

const formatCareTips = (text) => {
  return text
    .split("\n")
    .map((line) => line.trim().replace(/^[-*•]\s*/, ""))
    .filter(Boolean);
    
};

const getPlantCareTips = async (req, res) => {
  const { plantName } = req.body;

  if (!plantName) {
    return res.status(400).json({
      error: "Plant name is required.",
    });
  }

  try {
    const careTips = await generatePlantTips(plantName);
    res.status(200).json({
      plantName,
      careTips,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to generate plant care tips. Please try again later.",
    });
  }
};

module.exports = { getPlantCareTips };
