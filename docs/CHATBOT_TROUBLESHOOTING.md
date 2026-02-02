# n8n Chatbot Troubleshooting Guide

## Issue 1: Raw JSON/Metadata Showing in Chat

### Problem
The chatbot displays raw JSON metadata instead of just the message:
```
{"type":"begin","metadata":{...}}
{"type":"item","content":"Hello","metadata":{...}}
{"type":"end","metadata":{...}}
```

### Root Cause
Your n8n workflow is using **streaming mode** which sends response tokens individually with metadata. The @n8n/chat widget should parse this automatically, but if the format doesn't match expectations, it will display the raw response.

### Solution: Fix in n8n Workflow

#### Option 1: Disable Streaming (Recommended)

1. **Open your n8n workflow**
2. **Find the AI Agent node** (or Chat Model node)
3. **Look for "Streaming" or "Stream Response" option**
4. **Set it to `false` or disable it**
5. **Save and test the workflow**

This will send the complete response at once instead of streaming tokens.

#### Option 2: Configure Proper Streaming Format

If you need streaming, ensure your n8n workflow outputs the response in the correct format:

1. **After the AI Agent node**, add a **Code node** or **Set node**
2. **Format the response** to return only the text content:

```javascript
// Code node example
return [
  {
    json: {
      output: $json.output, // Just the text content
    }
  }
];
```

3. **Ensure the Chat Trigger node** is configured to handle streaming properly
4. **Test with a simple message**

#### Option 3: Update Chat Trigger Settings

1. Open the **Chat Trigger** node in your workflow
2. Check **"Response Mode"** setting
3. Try changing between:
   - **Simple** - Returns plain text
   - **Streaming** - Sends tokens incrementally
   - **Structured** - Returns formatted JSON

4. For simple use cases, choose **"Simple"** mode

### Expected Response Format

The chatbot should receive:
```json
{
  "output": "Hello! Welcome to HML Restaurant. How can I assist you today?"
}
```

NOT the streaming metadata format.

---

## Issue 2: Theme Not Matching Website

### Problem
Chatbot colors don't match the restaurant's design (gold, terracotta theme).

### Solution: Already Fixed!

The ChatBot component has been updated with custom theme colors:

- **Primary Gold** (`#d4af37`) - Header, chat button, user messages
- **Terracotta** (`#c85a3a`) - Send button
- **Cream/Parchment** (`#fefaf6`) - Bot message background
- **White** (`#ffffff`) - Chat window background

The theme now matches your restaurant's design tokens!

### If Theme Still Doesn't Apply

**Clear browser cache:**
```bash
# Hard refresh
Ctrl + Shift + R (Windows/Linux)
Cmd + Shift + R (Mac)
```

**Check browser console (F12):**
- Look for CSS errors
- Verify `@n8n/chat/style.css` is loaded
- Check if custom theme is being applied

**Restart dev server:**
```bash
# Stop current server (Ctrl+C)
npm run dev
```

---

## Issue 3: Chatbot Not Appearing

### Possible Causes

1. **CORS not configured in n8n**
   - Add `http://localhost:3000` to Allowed Origins
   - Add your Vercel domain when deployed

2. **Webhook URL incorrect**
   - Verify the URL in `ChatBot.tsx`
   - Test the webhook directly in n8n

3. **JavaScript error**
   - Open browser console (F12)
   - Look for errors related to @n8n/chat
   - Check Network tab for failed requests

### Solutions

**Verify CORS in n8n:**
1. Open Chat Trigger node
2. Find "Allowed Origins (CORS)"
3. Add: `http://localhost:3000, https://yourdomain.com`
4. Save and activate workflow

**Test webhook directly:**
```bash
# Test with curl
curl -X POST \
  https://n8n.srv1321955.hstgr.cloud/webhook/bfbc7892-9c03-4bbd-a391-8607d8719d73/chat \
  -H "Content-Type: application/json" \
  -d '{"action": "sendMessage", "sessionId": "test", "message": "Hello"}'
```

---

## Issue 4: Chatbot Loads Slowly

### Causes
- Large bundle size
- Network latency to n8n server
- Slow webhook response time

### Solutions

**Optimize bundle:**
- The @n8n/chat package is loaded on demand
- Already using client-side component
- Theme styles are minimal

**Reduce latency:**
- Ensure n8n server is performant
- Consider using edge functions (Vercel)
- Optimize n8n workflow (reduce AI tokens)

**Add loading indicator:**
```typescript
// Optional: Add loading state
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  createChat({
    // ... config
    onOpen: () => setIsLoading(false),
  });
}, []);
```

---

## Issue 5: Messages Not Sending

### Check These

1. **Network tab (F12)**
   - Look for POST requests to n8n webhook
   - Check response status (should be 200)
   - View response body for errors

2. **n8n workflow logs**
   - Open n8n dashboard
   - Check execution history
   - Look for errors in workflow

3. **CORS headers**
   - Response should include CORS headers
   - `Access-Control-Allow-Origin` should match your domain

### Common Fixes

**n8n workflow not active:**
- Go to n8n dashboard
- Click workflow
- Toggle "Active" switch to ON

**Webhook path changed:**
- Verify webhook URL matches Chat Trigger
- Update `webhookUrl` in ChatBot.tsx if needed

**API rate limits:**
- Check if n8n has rate limiting
- Monitor usage in n8n dashboard

---

## Testing Checklist

After fixing the streaming issue:

- [ ] Open http://localhost:3000
- [ ] Chat button appears (bottom-right, gold color)
- [ ] Click chat button - window opens
- [ ] See welcome messages (not raw JSON)
- [ ] Type "Hi" - bot responds with text (not metadata)
- [ ] Messages are styled correctly (gold, terracotta, cream)
- [ ] Chat window has restaurant theme colors
- [ ] No console errors (F12)
- [ ] Network requests succeed (200 status)
- [ ] n8n workflow executes successfully

---

## Best Practices

### For n8n Workflow

1. **Keep it simple** - Start with basic Q&A before complex logic
2. **Test locally** - Use n8n's test mode before deploying
3. **Monitor executions** - Check logs for errors
4. **Optimize prompts** - Shorter prompts = faster responses
5. **Handle errors** - Add error handling nodes in workflow

### For Chat Integration

1. **Test CORS early** - First thing to configure
2. **Use development mode** - Test on localhost first
3. **Monitor console** - Watch for JavaScript errors
4. **Check network** - Verify webhook calls succeed
5. **Clear cache** - Hard refresh after code changes

---

## Quick Fix Summary

### To Fix Raw JSON Display:

1. Go to n8n workflow
2. Find AI Agent or Chat Model node
3. Disable "Streaming" option
4. Or set Chat Trigger to "Simple" response mode
5. Save, activate, and test

### To Fix Theme:

Already fixed in code! Just:
1. Hard refresh browser (Ctrl+Shift+R)
2. Clear cache if needed
3. Restart dev server

### To Test Everything:

```bash
# Terminal 1: Dev server
npm run dev

# Terminal 2: Test webhook
curl -X POST https://n8n.srv1321955.hstgr.cloud/webhook/bfbc7892-9c03-4bbd-a391-8607d8719d73/chat \
  -H "Content-Type: application/json" \
  -d '{"sessionId":"test","message":"Hello"}'

# Browser:
# Visit http://localhost:3000
# Open chat, send message
# Check for clean response (no JSON)
```

---

## Additional Resources

- [n8n Chat Trigger Docs](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-langchain.chattrigger/)
- [@n8n/chat Package](https://www.npmjs.com/package/@n8n/chat)
- [n8n Community Forum](https://community.n8n.io/)

## Need More Help?

If issues persist:
1. Check n8n execution logs for errors
2. Verify webhook URL is correct
3. Test workflow in n8n directly
4. Check browser console for errors
5. Review CORS configuration

---

**Last Updated**: 2026-02-01
**Status**: Troubleshooting Guide for Common Issues
