export default async function handler(req, res) {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: "Missing token." });
  }

  const verifyURL = "https://www.google.com/recaptcha/api/siteverify";

  try {
    const params = new URLSearchParams();
    params.append("secret", process.env.RECAPTCHA_SECRET_KEY);
    params.append("response", token);
    
    const recaptchaRes = await fetch(verifyURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const data = await recaptchaRes.json();

    if (!data.success) {
      return res.status(400).json({ error: "Recaptcha failed" });
    }

    // Check minimum score (recommended >= 0.5)
    if (data.score < 0.5) {
      return res.status(403).json({ error: `Low score: ${data.score}` });
    }

    return res.status(200).json({ message: "Recaptcha successful", success: true });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Verification error" });
  }
}
