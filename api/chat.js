export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body || {};

  return res.status(200).json({
    reply: message
      ? `Echo a bien reçu : ${message}`
      : "Echo est connecté, mais aucun message n’a été envoyé."
  });
}
