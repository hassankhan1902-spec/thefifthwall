export default function handler(req, res) {
  const host = req.headers.host || 'www.thefifthwallarchitecture.com';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID || process.env.GITHUB_CLIENT_ID;

  if (!clientId) {
    return res.status(500).send('Missing GITHUB_CLIENT_ID in Vercel environment variables.');
  }

  const redirectUri = `${protocol}://${host}/api/callback`;
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=repo,user`;

  return res.redirect(302, githubAuthUrl);
}
