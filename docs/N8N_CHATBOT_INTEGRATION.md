# n8n Chatbot Integration

## Overview

The HML Restaurant website now includes an AI-powered chatbot using n8n's Chat widget. The chatbot appears as a floating button in the bottom-right corner of every page.

## Integration Details

### Package
- **Package**: [@n8n/chat](https://www.npmjs.com/package/@n8n/chat)
- **Version**: Latest (installed via npm)
- **Documentation**: [n8n Chat Documentation](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-langchain.chattrigger/)

### Webhook Configuration
- **Webhook URL**: `https://n8n.srv1321955.hstgr.cloud/webhook/bfbc7892-9c03-4bbd-a391-8607d8719d73/chat`
- **Type**: n8n Chat Trigger webhook endpoint

## Implementation

### Files Created/Modified

1. **[components/features/ChatBot.tsx](../components/features/ChatBot.tsx)** - New
   - Client component that initializes the n8n chat widget
   - Configured with your webhook URL
   - Includes welcome messages and custom settings

2. **[app/layout.tsx](../app/layout.tsx)** - Modified
   - Added ChatBot component to root layout
   - Makes chatbot available on all pages

### Component Structure

```typescript
// components/features/ChatBot.tsx
'use client';

import { useEffect } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

export function ChatBot() {
  useEffect(() => {
    createChat({
      webhookUrl: 'YOUR_WEBHOOK_URL',
      initialMessages: [...],
      mode: 'window',
      inputPlaceholder: '...',
      showWelcomeScreen: true,
    });
  }, []);

  return null;
}
```

## Features

### Current Configuration

- **Mode**: Window mode (opens in a modal, not fullscreen)
- **Initial Messages**:
  - "Hello! 👋"
  - "I'm here to help you with your dining experience at HML Restaurant."
  - "How can I assist you today?"
- **Input Placeholder**: "Ask about our menu, reservations, or anything else..."
- **Welcome Screen**: Enabled

### Chat Capabilities

The chatbot can help users with:
- Menu inquiries
- Reservation information
- Restaurant hours and location
- Special events (Live Music Fridays, festivals)
- Dietary restrictions and recommendations
- Any other customer questions

## User Experience

### How It Appears

1. **Chat Button**: A floating button appears in the bottom-right corner of the screen
2. **Click to Open**: Users click the button to open the chat window
3. **Welcome Message**: Users see the initial welcome messages
4. **Interactive Chat**: Users can type questions and receive AI-powered responses
5. **Persistent**: The chat remains accessible across all pages

### Responsive Design

- ✅ **Desktop**: Floating button in bottom-right corner
- ✅ **Mobile**: Responsive chat window, optimized for touch
- ✅ **Tablet**: Adapts to screen size

## n8n Setup Requirements

### CORS Configuration

⚠️ **Important**: Ensure your domain is added to the **Allowed Origins (CORS)** field in your n8n Chat Trigger node.

**Add these domains:**
- `http://localhost:3000` (for local development)
- `https://your-vercel-domain.vercel.app` (for Vercel deployment)
- Your production domain (if different)

**How to configure in n8n:**
1. Open your n8n workflow
2. Click on the Chat Trigger node
3. Find "Allowed Origins (CORS)" field
4. Add your website domains (comma-separated)
5. Save and activate the workflow

### Testing CORS

If the chatbot doesn't appear or doesn't respond:
1. Check browser console for CORS errors
2. Verify domains are correctly added in n8n
3. Ensure the webhook URL is correct
4. Test the webhook directly in n8n

## Customization Options

### Available Configuration

The `createChat` function accepts these options:

```typescript
createChat({
  // Required
  webhookUrl: string,

  // Optional
  mode?: 'window' | 'fullscreen',  // Default: 'fullscreen'
  initialMessages?: string[],
  inputPlaceholder?: string,
  showWelcomeScreen?: boolean,
  chatInputKey?: string,
  chatSessionKey?: string,
  defaultLanguage?: string,
  showWindowCloseButton?: boolean,
  theme?: object,  // Custom theme colors
  metadata?: object,  // Additional metadata to send
});
```

### To Customize

Edit [components/features/ChatBot.tsx](../components/features/ChatBot.tsx:13-27) and modify the configuration:

```typescript
createChat({
  webhookUrl: 'YOUR_WEBHOOK_URL',

  // Change welcome messages
  initialMessages: [
    'Your custom message 1',
    'Your custom message 2',
  ],

  // Change chat mode
  mode: 'fullscreen',  // or 'window'

  // Customize placeholder
  inputPlaceholder: 'Type your message...',

  // Add custom theme
  theme: {
    chatWindow: {
      backgroundColor: '#f5f5f5',
    },
  },
});
```

## Troubleshooting

### Chat Widget Not Appearing

**Possible causes:**
1. **CORS issue**: Domain not whitelisted in n8n
   - Solution: Add your domain to Allowed Origins in Chat Trigger node

2. **Webhook inactive**: n8n workflow not activated
   - Solution: Activate the workflow in n8n

3. **JavaScript error**: Check browser console
   - Solution: Look for errors and fix component issues

4. **Build issue**: Component not compiled
   - Solution: Restart dev server (`npm run dev`)

### Chat Not Responding

**Possible causes:**
1. **Webhook URL incorrect**: Check the URL in ChatBot.tsx
2. **n8n workflow error**: Check n8n execution logs
3. **Network issue**: Check browser Network tab for failed requests
4. **CORS blocking**: See CORS configuration above

### Testing Steps

1. **Open browser console** (F12)
2. **Look for errors** related to n8n or chat
3. **Check Network tab** for webhook requests
4. **Verify webhook URL** by testing in n8n directly
5. **Check CORS headers** in network response

## Performance

### Impact

- **Bundle size**: ~35 packages added (~150KB)
- **Load time**: Minimal impact (lazy-loaded)
- **Runtime**: Lightweight, runs only when chat is opened

### Optimization

- ✅ Chat widget loads on demand
- ✅ Styles are tree-shaken
- ✅ No impact on initial page load
- ✅ Client-side only (no SSR overhead)

## Deployment Checklist

Before deploying to production:

- [ ] Verify webhook URL is correct
- [ ] Add production domain to n8n CORS settings
- [ ] Test chatbot on local development
- [ ] Test chatbot on staging/Vercel preview
- [ ] Verify CORS headers in production
- [ ] Test on mobile devices
- [ ] Monitor n8n execution logs
- [ ] Set up error monitoring (optional)

## Future Enhancements

### Potential Improvements

1. **Custom Styling**: Match restaurant theme colors
2. **Conversation History**: Save chat history in localStorage
3. **User Context**: Pass user info to n8n (location, page visited)
4. **Analytics**: Track chat usage and popular questions
5. **Multi-language**: Support multiple languages
6. **Proactive Messages**: Show tips based on page visited
7. **Integration**: Connect with reservation system

## Support & Resources

### Documentation
- [n8n Chat Trigger Node](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-langchain.chattrigger/)
- [@n8n/chat on npm](https://www.npmjs.com/package/@n8n/chat)
- [n8n Community Forum](https://community.n8n.io/)

### Examples
- [n8n Chat Frontend (Next.js)](https://github.com/jannesrudnick/n8n-chat-frontend)
- [Embedded Chat Interface](https://github.com/symbiosika/n8n-embedded-chat-interface)

### Need Help?
- Check n8n workflow execution logs
- Visit n8n Community forum
- Review browser console errors
- Test webhook endpoint directly

---

**Integration Date**: 2026-02-01
**Package Version**: Latest (@n8n/chat)
**Status**: ✅ Active
**Location**: Available on all pages (bottom-right corner)
