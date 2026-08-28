const http = require('http');
const fs = require('fs');
const path = require('path');

function post(url, data, headers = {}) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const bodyStr = JSON.stringify(data);
    const req = http.request({
      hostname: u.hostname,
      port: u.port,
      path: u.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json, text/event-stream',
        'Content-Length': Buffer.byteLength(bodyStr),
        ...headers
      }
    }, (res) => {
      let buf = '';
      res.on('data', chunk => buf += chunk);
      res.on('end', () => {
        resolve({ status: res.statusCode, headers: res.headers, body: buf });
      });
    });
    req.on('error', reject);
    req.write(bodyStr);
    req.end();
  });
}

async function main() {
  const initRes = await post('http://127.0.0.1:3845/mcp', {
    jsonrpc: '2.0',
    id: 1,
    method: 'initialize',
    params: {
      protocolVersion: '2024-11-05',
      capabilities: {},
      clientInfo: { name: 'test-client', version: '1.0.0' }
    }
  });

  const sessionId = initRes.headers['mcp-session-id'] || initRes.headers['x-mcp-session-id'];
  const reqHeaders = {};
  if (sessionId) reqHeaders['mcp-session-id'] = sessionId;

  await post('http://127.0.0.1:3845/mcp', {
    jsonrpc: '2.0',
    method: 'notifications/initialized'
  }, reqHeaders);

  console.log('Calling get_screenshot for nodeId: 579:60...');
  const res = await post('http://127.0.0.1:3845/mcp', {
    jsonrpc: '2.0',
    id: 2,
    method: 'tools/call',
    params: {
      name: 'get_screenshot',
      arguments: {
        fileKey: 'uEEpFhi9jjIgmZF6lxLuE3',
        nodeId: '579:60'
      }
    }
  }, reqHeaders);

  console.log('Result preview:', res.body.slice(0, 500));
  const parsed = JSON.parse(res.body.replace(/^event: message\s*data: /, ''));
  if (parsed.result && parsed.result.content) {
    for (const c of parsed.result.content) {
      if (c.type === 'image' && c.data) {
        const buf = Buffer.from(c.data, 'base64');
        const outputDir = path.join(__dirname, '../src/temp_figma');
        if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
        fs.writeFileSync(path.join(outputDir, 'full_figma_page.png'), buf);
        console.log('Saved full_figma_page.png. Size:', buf.length);
      }
    }
  }
}

main().catch(console.error);
