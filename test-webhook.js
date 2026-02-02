// Test script to check n8n webhook response format
// Run with: node test-webhook.js

const https = require('https');

const webhookUrl = 'https://n8n.srv1321955.hstgr.cloud/webhook/bfbc7892-9c03-4bbd-a391-8607d8719d73/chat';

// Test payload matching @n8n/chat format
// IMPORTANT: The key names must match what n8n Chat Trigger expects:
// - chatInput: The user's message (this is what n8n looks for by default)
// - sessionId: The session identifier
const payload = JSON.stringify({
  action: 'sendMessage',
  sessionId: 'test-session-' + Date.now(),
  chatInput: 'Hello, test message'  // Changed from 'message' to 'chatInput'
});

console.log('Testing n8n webhook...');
console.log('URL:', webhookUrl);
console.log('Payload:', payload);
console.log('\n--- Sending Request ---\n');

const url = new URL(webhookUrl);

const options = {
  hostname: url.hostname,
  path: url.pathname,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload),
    'Origin': 'http://localhost:3000'
  }
};

const req = https.request(options, (res) => {
  console.log('Status Code:', res.statusCode);
  console.log('Headers:', JSON.stringify(res.headers, null, 2));
  console.log('\n--- Response Body ---\n');

  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
    console.log('Chunk received:', chunk.toString());
  });

  res.on('end', () => {
    console.log('\n--- Complete Response ---\n');
    console.log(data);

    // Try to parse as JSON
    try {
      const parsed = JSON.parse(data);
      console.log('\n--- Parsed JSON ---\n');
      console.log(JSON.stringify(parsed, null, 2));
    } catch (e) {
      console.log('\n--- Not valid JSON ---');
      console.log('Raw response:', data);
    }
  });
});

req.on('error', (e) => {
  console.error('Error:', e.message);
});

req.write(payload);
req.end();
