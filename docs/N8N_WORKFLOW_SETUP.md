# n8n Workflow Setup Guide for Chat Widget

## The Problem

Your chatbot shows errors because the n8n workflow isn't configured correctly. The AI Agent node can't find the user's message (it's looking for `chatInput` field).

**Error message:**
```
Expected to find the prompt in an input field called 'chatInput'
```

## Solution: Fix n8n Workflow Configuration

### Step 1: Chat Trigger Node Configuration

1. **Open your n8n workflow**
2. **Click on the Chat Trigger node** (first node)
3. **Configure these settings:**

```
Node Name: Chat Trigger
Mode: Chat
Public: Yes (or configure authentication if needed)

Options:
├── Allowed Origins (CORS): http://localhost:3000, https://your-vercel-domain.vercel.app
├── Response Mode: Text (NOT Streaming for now)
└── Session ID Field: sessionId
```

4. **Save the node**

### Step 2: AI Agent Node Configuration

1. **Click on your AI Agent node** (or Chat Model node)
2. **Find the "Chat Input" or "Prompt" field**
3. **Configure it to use the Chat Trigger's output:**

**Option A: Use Expression (Recommended)**
```javascript
{{ $json.chatInput }}
```

**Option B: Use the dropdown**
- Select: `Chat Trigger` → `chatInput`

**Important Settings:**
```
Prompt/Chat Input: {{ $json.chatInput }}
Streaming: No (disable for now)
```

### Step 3: Connect Nodes Properly

Your workflow should look like this:

```
┌─────────────────┐
│  Chat Trigger   │ ← Entry point (webhook)
└────────┬────────┘
         │
         │ Outputs: { chatInput: "user message", sessionId: "xxx" }
         ▼
┌─────────────────┐
│   AI Agent      │ ← Reads {{ $json.chatInput }}
└────────┬────────┘
         │
         │ Outputs: { output: "AI response" }
         ▼
    [Response sent back automatically]
```

### Step 4: Test the Workflow

1. **Activate the workflow** (toggle ON)
2. **Click "Test Workflow"** in n8n
3. **Use the manual input:**
   ```json
   {
     "chatInput": "Hello",
     "sessionId": "test-123"
   }
   ```
4. **Execute**
5. **Verify** you get a proper response

## Complete Workflow Example

### Minimal Working Configuration:

#### Node 1: Chat Trigger
```
Type: Chat Trigger
Settings:
  - Mode: Chat
  - Allowed Origins: http://localhost:3000
  - Response Mode: Text
```

#### Node 2: AI Agent (or OpenAI node)
```
Type: AI Agent
Settings:
  - Prompt: {{ $json.chatInput }}
  - System Message: "You are a helpful assistant for HML Restaurant..."
  - Streaming: No
```

#### Connection
```
Chat Trigger → AI Agent
```

That's it! No additional nodes needed.

## Alternative: Using OpenAI Chat Model Directly

If using OpenAI Chat Model instead of AI Agent:

```
Node 1: Chat Trigger
Node 2: OpenAI Chat Model
  - User Message: {{ $json.chatInput }}
  - System Message: "You are HML Restaurant's assistant..."
```

## Common Mistakes to Avoid

### ❌ Wrong: Using `$input` instead of `$json`
```javascript
{{ $input.chatInput }}  // WRONG
```

### ✅ Correct: Using `$json`
```javascript
{{ $json.chatInput }}   // CORRECT
```

### ❌ Wrong: Not connecting Chat Trigger output
If your AI Agent isn't reading from the Chat Trigger, it won't have the user's message.

### ✅ Correct: Direct connection
Chat Trigger → AI Agent (no intermediate nodes unless needed)

## Testing from Command Line

After fixing your workflow, test it:

```bash
node test-webhook.js
```

**Expected output:**
```json
{
  "type": "text",
  "output": "Hello! Welcome to HML Restaurant..."
}
```

**NOT this:**
```json
{
  "type": "error",
  "content": "Expected to find the prompt..."
}
```

## Streaming vs Non-Streaming

### For Now: Use Non-Streaming

1. **AI Agent node**: Set `Streaming: No`
2. **Chat Trigger node**: Set `Response Mode: Text`

This will return clean responses:
```
"Hello! Welcome to HML Restaurant. How can I help you?"
```

### Later: Enable Streaming (Optional)

Once non-streaming works, you can enable streaming:

1. **AI Agent**: Set `Streaming: Yes`
2. **Chat Trigger**: Set `Response Mode: Streaming`
3. The @n8n/chat widget will handle the streaming format

## Verify CORS is Configured

Make sure your Chat Trigger has:

```
Allowed Origins (CORS):
  - http://localhost:3000
  - https://your-vercel-domain.vercel.app
  - https://yourdomain.com
```

Without this, the browser will block requests.

## Example System Message for Your Restaurant

```
You are a helpful AI assistant for HML Restaurant, an authentic Indian restaurant in Bangalore. You help customers with:

- Menu information and recommendations
- Reservation inquiries (direct them to call or use the reservation button)
- Restaurant hours and location
- Special events (Live Music Fridays from 7-10 PM)
- Dietary preferences and allergen information

Be friendly, professional, and enthusiastic about Indian cuisine. If you don't know something specific, politely suggest they contact the restaurant directly.
```

## Full Test Checklist

After configuring your workflow:

- [ ] Chat Trigger node has CORS configured
- [ ] AI Agent reads from `{{ $json.chatInput }}`
- [ ] Workflow is activated (toggle ON)
- [ ] Test workflow in n8n with manual input works
- [ ] Run `node test-webhook.js` - gets proper response
- [ ] Open http://localhost:3000
- [ ] Click chat button
- [ ] Send "Hello"
- [ ] Receive proper text response (not error, not JSON)

## Still Having Issues?

### Debug Steps:

1. **Check n8n execution logs**
   - Go to n8n dashboard
   - Click "Executions"
   - View the latest execution
   - Check what data each node received/sent

2. **Test each node individually**
   - Click "Test Step" on AI Agent node
   - Manually provide input: `{ "chatInput": "test" }`
   - Verify it generates a response

3. **Verify webhook URL**
   - In Chat Trigger node, check the "Webhook URLs"
   - Copy the chat URL
   - Update `ChatBot.tsx` if it changed

4. **Check API keys**
   - If using OpenAI, verify API key is valid
   - Check n8n credentials are configured

## Expected Working State

When everything is configured correctly:

1. **User sends:** "Hi"
2. **Webhook receives:**
   ```json
   {
     "action": "sendMessage",
     "sessionId": "...",
     "message": "Hi"
   }
   ```
3. **Chat Trigger outputs:**
   ```json
   {
     "chatInput": "Hi",
     "sessionId": "..."
   }
   ```
4. **AI Agent receives:** `chatInput: "Hi"`
5. **AI Agent outputs:**
   ```json
   {
     "output": "Hello! Welcome to HML Restaurant..."
   }
   ```
6. **User sees:** "Hello! Welcome to HML Restaurant..."

---

**This should fix your issue!** The key is making sure the AI Agent node reads from `{{ $json.chatInput }}` from the Chat Trigger's output.
