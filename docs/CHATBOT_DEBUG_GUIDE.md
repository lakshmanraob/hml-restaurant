# Chatbot Debugging Guide

This guide will help you diagnose and fix the `<Empty response>` issue using the console logs.

## What to Look For in Console

When you open http://localhost:3000 and interact with the chatbot, check your browser's Developer Tools console (F12 → Console tab).

### 1. Initialization Messages

You should see:
```
🤖 ===== n8n Chat Widget Initialization =====
📡 Webhook URL: https://n8n.srv1321955.hstgr.cloud/webhook/...
🔑 Chat Input Key: chatInput
🔑 Session Key: sessionId
==========================================
```

✅ **If you see this**: Widget is initializing correctly
❌ **If you don't see this**: Check that NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL is set in .env

---

### 2. Outgoing Request to n8n

When you send a message (e.g., "Hi"), you should see:
```
📤 ===== OUTGOING REQUEST TO N8N =====
🔗 URL: https://n8n.srv1321955.hstgr.cloud/webhook/bfbc7892-9c03-4bbd-a391-8607d8719d73/chat
📝 Method: POST
📦 Request Payload:
{
  "action": "sendMessage",
  "sessionId": "...",
  "chatInput": "Hi",
  "metadata": {
    "source": "website",
    "page": "/"
  }
}
```

✅ **If payload contains `chatInput`**: Request format is correct
❌ **If payload is missing or different**: There's an issue with the @n8n/chat library configuration

---

### 3. Response from n8n

The critical part - check the response:

#### ✅ **Good Response (Working):**
```
📥 ===== RESPONSE FROM N8N =====
✅ Status: 200 OK
📦 Response Body (parsed):
{
  "output": "Hello! Welcome to HML Restaurant. How can I help you today?"
}
✅ Output received: Hello! Welcome to HML Restaurant...
```

#### ❌ **Bad Response 1: Empty Output (Current Issue)**
```
📥 ===== RESPONSE FROM N8N =====
✅ Status: 200 OK
📦 Response Body (parsed):
{
  "output": ""
}
⚠️  WARNING: Response has empty "output" field!
⚠️  This is why you're seeing <Empty response>
```

**Cause**: n8n workflow is executing but not returning the AI Agent output properly.

**Fix**:
1. In n8n, open your workflow
2. Click on "When chat message received" (Chat Trigger) node
3. **Change Mode from "webhook" to "chat"** (or select "Embedded Chat")
4. Click on "OpenAI Chat Model" node
5. Change model from "gpt-4.1-mini" to "gpt-4o-mini"
6. Save and activate workflow
7. Test again

#### ❌ **Bad Response 2: Array Instead of Object**
```
📦 Response Body (parsed):
[
  {
    "output": "Hello! Welcome to HML Restaurant..."
  }
]
```

**Cause**: n8n is returning an array of outputs instead of a single output object.

**Fix**:
1. In n8n, click the "AI Agent" node
2. Look for "Return Single Result" or similar option
3. Enable it to return a single object instead of an array
4. OR add a "Set" node after AI Agent to extract the first item: `{{ $json[0] }}`

#### ❌ **Bad Response 3: Wrong Field Name**
```
📦 Response Body (parsed):
{
  "text": "Hello! Welcome to HML Restaurant...",
  "response": "..."
}
```

**Cause**: n8n is using a different field name instead of "output".

**Fix**:
1. Add a "Set" node after the AI Agent
2. Map the response to "output" field:
   - Field name: `output`
   - Value: `{{ $json.text }}` (or whatever field name you see)

#### ❌ **Bad Response 4: Error from n8n**
```
📦 Response Body (parsed):
{
  "type": "error",
  "message": "Expected to find the prompt in an input field called 'chatInput'"
}
```

**Cause**: AI Agent can't find the user's message in the expected field.

**Fix**:
1. Verify Chat Trigger is in "chat" mode (not "webhook")
2. Check AI Agent is directly connected to Chat Trigger
3. If using custom nodes between them, ensure they pass the `chatInput` field

---

### 4. Error Responses

#### CORS Error:
```
❌ Access to fetch at 'https://n8n.srv1321955.hstgr.cloud/...' from origin 'http://localhost:3000'
has been blocked by CORS policy
```

**Fix**:
1. In n8n Chat Trigger node settings
2. Find "Allowed Origins (CORS)"
3. Add: `http://localhost:3000,https://*.vercel.app`
4. Save and activate

#### 404 Not Found:
```
📥 ===== RESPONSE FROM N8N =====
❌ Status: 404 Not Found
```

**Fix**:
1. Check the webhook URL is correct
2. Ensure the n8n workflow is **activated** (toggle ON)
3. Verify the webhook ID in the URL matches your workflow

---

## Step-by-Step Fix for Empty Response

Based on the console logs, here's what to do:

### Step 1: Check Request is Correct
Look for:
```
📦 Request Payload:
{
  "chatInput": "your message here"
}
```

✅ If `chatInput` is present → Good, move to Step 2
❌ If missing → There's an issue with the ChatBot component (contact support)

### Step 2: Check Response Status
```
✅ Status: 200 OK
```

✅ If 200 → Good, move to Step 3
❌ If 404 → Workflow not found or not activated
❌ If 403 → CORS issue
❌ If 500 → n8n workflow error

### Step 3: Check Response Body
This is where the issue is. Look for the warning:
```
⚠️  WARNING: Response has empty "output" field!
```

If you see this, the problem is in your n8n workflow configuration.

### Step 4: Fix n8n Workflow

**Option A: Import the Fixed Workflow (Recommended)**
1. Go to n8n dashboard
2. Click "Import from File"
3. Select: `C:\Users\lakshman\Downloads\hml-workflow-FIXED.json`
4. Activate the workflow
5. Test again

**Option B: Manual Fix**
1. Open your workflow in n8n
2. Click "When chat message received" node
3. **Critical**: Change Mode to "chat" (look for dropdown that says "Mode" or "Trigger Mode")
   - Current (wrong): "webhook"
   - Correct: "chat" OR "Embedded Chat"
4. In Allowed Origins: `http://localhost:3000,https://*.vercel.app`
5. Click "OpenAI Chat Model" node
6. Change model from "gpt-4.1-mini" to "gpt-4o-mini"
7. Verify AI Agent is connected properly:
   - Chat Trigger → AI Agent (main connection)
   - OpenAI Chat Model → AI Agent (ai_languageModel connection)
   - Simple Memory → AI Agent (ai_memory connection)
8. Save and activate

### Step 5: Test Again
1. Refresh http://localhost:3000
2. Open Developer Tools → Console
3. Click the chat button
4. Send "Hi"
5. Watch the console logs

You should now see:
```
✅ Output received: Hello! Welcome to HML Restaurant...
```

---

## Common Issues and Solutions

### Issue 1: "Mode is already set to chat, still getting empty response"

Check the **Response Mode** setting in Chat Trigger:
1. Click Chat Trigger node
2. Look for "Response Mode" or "Options"
3. Set to: **"When Last Node Finishes"** (not "Using response nodes")
4. Save and test

### Issue 2: "Getting array response like [{ output: '...' }]"

Add a **Set** node after AI Agent:
1. Add new "Set" node between AI Agent and Chat Trigger output
2. Set the output:
   - Remove all fields
   - Add field: `output` = `{{ $json[0].output }}`
3. Connect: AI Agent → Set node → (end of workflow)

### Issue 3: "Everything looks correct but still empty"

Try the **Basic Agent** instead of AI Agent:
1. Delete the "AI Agent" node
2. Add "Basic LLM Chain" or "OpenAI Chat Model" directly
3. Configure system message
4. Connect: Chat Trigger → OpenAI Chat Model
5. Test

### Issue 4: "Response works in n8n test, but not from website"

Check CORS configuration:
1. Chat Trigger → Options → Allowed Origins
2. Must include your frontend domain
3. For localhost: `http://localhost:3000`
4. For production: Your Vercel domain

---

## Expected Working Flow

When everything is correct, your console should show:

```
🤖 ===== n8n Chat Widget Initialization =====
📡 Webhook URL: https://n8n.srv1321955.hstgr.cloud/...
==========================================

📤 ===== OUTGOING REQUEST TO N8N =====
📦 Request Payload: { "chatInput": "Hi", "sessionId": "...", ... }
======================================

📥 ===== RESPONSE FROM N8N =====
✅ Status: 200 OK
📦 Response Body: { "output": "Hello! Welcome to HML Restaurant..." }
✅ Output received: Hello! Welcome to HML Restaurant...
================================
```

And in the chat widget, you'll see the bot's response instead of `<Empty response>`.

---

## Still Having Issues?

1. **Export your workflow**:
   - In n8n, click "..." → "Export"
   - Save as `my-workflow-current.json`
   - Compare with `hml-workflow-FIXED.json`

2. **Check n8n execution logs**:
   - In n8n dashboard, click "Executions"
   - Find the latest execution
   - Check what each node received/sent

3. **Test the webhook directly**:
   ```bash
   node test-webhook.js
   ```
   This will show you the raw n8n response

---

## Key Takeaway

The `<Empty response>` issue happens when:
- n8n workflow executes successfully ✅
- But returns `{ "output": "" }` or wrong format ❌

**The fix is always in the n8n workflow configuration, specifically the Chat Trigger mode.**

Change from "webhook" mode to "chat" mode and it should work!
