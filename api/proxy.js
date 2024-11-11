import httpProxy from 'http-proxy';
import dotenv from 'dotenv';

dotenv.config();

const proxy = httpProxy.createProxyServer({});
const BEARER_TOKEN = process.env.ASTRIA_API_KEY;

const allowedMethods = ['GET', 'POST', 'OPTIONS', 'DELETE'];

export default async function handler(req, res) {
  // Handle CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', allowedMethods.join(', '));
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  // Ensure the Authorization header is set correctly
  req.headers['Authorization'] = `Bearer ${BEARER_TOKEN}`;

  // Modify the target API URL to include the path from the request URL
  const targetUrl = `https://api.astria.ai${req.url.replace('/api/proxy', '')}`;

  // Proxy the request to the target API
  try {
    proxy.web(req, res, { target: targetUrl, changeOrigin: true });
  } catch (error) {
    console.error('Proxy error:', error);
    // Sending a more detailed error message
    res.status(500).json({ error: 'Failed to proxy request', details: error.message });
  }
}
