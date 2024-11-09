import httpProxy from 'http-proxy';
import dotenv from 'dotenv';

dotenv.config();

const proxy = httpProxy.createProxyServer({});
const BEARER_TOKEN = process.env.ASTRIA_API_KEY;

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  req.headers['Authorization'] = `Bearer ${BEARER_TOKEN}`;

  proxy.web(req, res, { target: 'https://api.astria.ai', changeOrigin: true }, (error) => {
    console.error('Proxy error:', error);
    res.status(500).end('Proxy error occurred.');
  });
}
