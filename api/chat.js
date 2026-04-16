export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body || {};

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "Tu es Echo, une intelligence qui accompagne avec clarté et bienveillance."
          },
          {
            role: "user",
            content: message || "Dis bonjour"
          }
        ]
      })
    });

    const data = await response.json();

    return res.status(200).json({
      reply: data.choices?.[0]?.message?.content || "Pas de réponse"
    });

  } catch (error) {
    return res.status(500).json({
      error: "Erreur serveur",
      details: error.message
    });
  }
}
