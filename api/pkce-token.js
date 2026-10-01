export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const bodyData = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { code, client_id, redirect_uri, code_verifier } = bodyData || {};

    if (!code) {
      return res.status(400).json({ error: 'Missing code parameter' });
    }

    const payload = {
      client_id: client_id || process.env.GITHUB_CLIENT_ID || 'Ov23liAe14yMQXRZJ3nk',
      code,
      redirect_uri: redirect_uri || 'https://www.thefifthwallarchitecture.com/admin/'
    };

    if (code_verifier) {
      payload.code_verifier = code_verifier;
    }

    const clientSecret = process.env.GITHUB_CLIENT_SECRET || process.env.OAUTH_GITHUB_CLIENT_SECRET;
    if (clientSecret) {
      payload.client_secret = clientSecret;
    }

    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
