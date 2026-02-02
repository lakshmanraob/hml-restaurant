# n8n Embedded Chat Setup Guide

## Understanding Chat Modes

Based on [n8n's official documentation](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-langchain.chattrigger/), the Chat Trigger node has two modes:

### 1. Hosted Chat
- Chat interface served directly by n8n
- n8n hosts the chat page
- Good for quick testing

### 2. Embedded Chat (What We're Using) ✅
- **You create your own chat interface** (we're using @n8n/chat widget)
- **Your website calls the n8n webhook URL**
- **Full control over styling and behavior**
- This is the correct mode for embedding chat in your restaurant website

## Your Current Setup

Your workflow uses **Embedded Chat** mode, which is correct for the @n8n/chat widget integration.

## n8n Workflow Configuration

### Chat Trigger Node Settings

In your n8n workflow, the "When chat message received" node should be configured as:

```
Mode: Embedded Chat (NOT Hosted Chat)

Options:
├── Public: Yes
├── Allowed Origins (CORS):
│   └── http://localhost:3000
│   └── https://your-vercel-app.vercel.app
│   └── https://yourdomain.com
└── Authentication: None (or configure if needed)
```

### AI Agent Node Configuration

The AI Agent node in your workflow should automatically receive the chat input from the Chat Trigger. Based on your workflow:

```json
{
  "options": {
    "systemMessage": "You are a helpful assistant for HML Restaurant...",
    "enableStreaming": false  // Keep this FALSE for now
  }
}
```

**Important:** With **Embedded Chat** mode and the Chat Trigger node, the AI Agent automatically receives the user's message. You don't need to manually configure a prompt field.

## How Embedded Chat Works

```
┌─────────────────────────┐
│  Your Website           │
│  (localhost:3000)       │
│                         │
│  ┌──────────────────┐  │
│  │  @n8n/chat       │  │ 1. User sends message
│  │  Widget          │──┼────────────────────────┐
│  └──────────────────┘  │                        │
└─────────────────────────┘                        │
                                                   ▼
                                    ┌──────────────────────────┐
                                    │  n8n Server              │
                                    │  Chat Trigger (Embedded) │
                                    │                          │
                                    │  2. Receives POST request│
                                    │  3. Passes to AI Agent   │
                                    │  4. AI responds          │
                                    │  5. Sends back response  │
                                    └──────────────────────────┘
```

## Environment Variable Configuration

### .env File

Your webhook URL is now configured via environment variable:

```env
# n8n Chat Webhook URL
NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL=https://n8n.srv1321955.hstgr.cloud/webhook/bfbc7892-9c03-4bbd-a391-8607d8719d73/chat
```

**Why NEXT_PUBLIC_ prefix?**
- Next.js requires `NEXT_PUBLIC_` prefix for client-side environment variables
- The ChatBot component runs in the browser, so it needs access to this URL

### To Change the Webhook URL

1. **Get the URL from n8n:**
   - Open your n8n workflow
   - Click on "When chat message received" node
   - Look for "Chat URL" field
   - Copy the full URL

2. **Update .env file:**
   ```env
   NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL=your-new-webhook-url-here
   ```

3. **Restart dev server:**
   ```bash
   # Stop current server (Ctrl+C)
   npm run dev
   ```

## Troubleshooting "Expected to find chatInput" Error

If you're getting this error, it means the AI Agent isn't receiving the chat input properly.

### Solution for Embedded Chat Mode:

The Chat Trigger node in **Embedded Chat** mode outputs data in a specific format. The AI Agent should automatically receive this.

**Check these in n8n:**

1. **Chat Trigger node is set to "Embedded Chat"** (not "Hosted Chat")
2. **AI Agent is directly connected** to Chat Trigger node
3. **OpenAI Chat Model is connected** to AI Agent via the AI Language Model connection
4. **Memory node is connected** (optional, but you have it)
5. **Workflow is activated** (toggle ON)

### If Still Not Working:

The issue might be with how the AI Agent reads the input. Try this in n8n:

1. **Test the workflow manually:**
   - Click "Test Workflow" in n8n
   - Provide manual input to simulate the Chat Trigger
   - See what data format it expects

2. **Check execution logs:**
   - Go to n8n dashboard → Executions
   - Click on failed executions
   - See what data each node received

3. **Verify the connection:**
   - Make sure the wire from Chat Trigger → AI Agent is solid (not dotted)
   - The AI Agent should have access to the chat input automatically

## Testing Your Setup

### Step 1: Test the Webhook

```bash
node test-webhook.js
```

**Expected output (success):**
```json
{
  "output": "Hello! Welcome to HML Restaurant..."
}
```

**If you see an error:**
```json
{
  "type": "error",
  "content": "Expected to find the prompt..."
}
```

This means your AI Agent configuration in n8n needs adjustment.

### Step 2: Test in Browser

1. Visit http://localhost:3000
2. Open browser console (F12)
3. Look for: `"Initializing n8n chat widget with webhook: ..."`
4. Click the gold chat button (bottom-right)
5. Type "Hi"
6. Check the Network tab for the POST request
7. Verify you get a proper response

## Streaming vs Non-Streaming

### Current Setup: Non-Streaming ✅

Your workflow has:
```json
"enableStreaming": false
```

This is correct for now. It sends complete responses.

### If You Want Streaming Later:

1. **In n8n AI Agent node:**
   - Set `enableStreaming: true`

2. **In ChatBot.tsx:**
   - No changes needed! The @n8n/chat widget handles streaming automatically

Streaming will show the AI response word-by-word as it's generated, like ChatGPT.

## Common Issues

### Issue 1: "CORS Error" in Browser Console

**Solution:**
- Add your domain to "Allowed Origins" in Chat Trigger node
- Use: `http://localhost:3000,https://*.vercel.app`
- NOT: `*` (too permissive)

### Issue 2: Empty Response

**Causes:**
- Streaming enabled but widget doesn't parse it
- AI Agent not receiving input
- OpenAI API key invalid

**Solution:**
- Disable streaming in AI Agent
- Check OpenAI credentials in n8n
- Verify Chat Trigger → AI Agent connection

### Issue 3: Raw JSON Showing

**Causes:**
- Streaming format not compatible with widget version

**Solution:**
- Set `enableStreaming: false` in AI Agent
- Update @n8n/chat to latest: `npm install @n8n/chat@latest`

## Deployment Checklist

Before deploying to Vercel:

- [ ] Set environment variable in Vercel:
  ```
  NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL=your-webhook-url
  ```
- [ ] Add Vercel domain to n8n CORS settings:
  ```
  https://your-app.vercel.app
  ```
- [ ] Test on Vercel preview deployment
- [ ] Verify chatbot works in production

## Additional Resources

- [n8n Chat Trigger Documentation](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-langchain.chattrigger/)
- [@n8n/chat npm Package](https://www.npmjs.com/package/@n8n/chat)
- [n8n Community Forum](https://community.n8n.io/)
- [n8n Chat Hub](https://docs.n8n.io/advanced-ai/chat-hub/)

---

**Mode Confirmed:** Embedded Chat ✅
**Widget:** @n8n/chat ✅
**Configuration:** Environment Variable ✅
**Ready for Production:** Almost there! Fix the AI Agent connection and you're set.
