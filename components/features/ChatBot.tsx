'use client';

import { useEffect } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

/**
 * n8n ChatBot Component
 *
 * Embeds the n8n AI-powered chat widget into the website.
 * The chat appears as a floating button in the bottom-right corner.
 *
 * Configuration:
 * - Uses "Embedded Chat" mode in n8n Chat Trigger node
 * - Webhook URL is configured via NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL environment variable
 * - Ensure your domain is added to Allowed Origins (CORS) in n8n Chat Trigger node
 *
 * n8n Chat Trigger Settings Required:
 * - Mode: Embedded Chat
 * - Response Mode: "When Last Node Finishes" (recommended) or "Using response nodes"
 * - Allowed Origins: Add your domain (localhost:3000, your-domain.com)
 */
export function ChatBot() {
  useEffect(() => {
    // Get webhook URL from environment variable
    const webhookUrl = process.env.NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL;

    // Validate webhook URL exists
    if (!webhookUrl) {
      console.error('❌ N8N_CHAT_WEBHOOK_URL is not configured. Please add it to your .env file.');
      return;
    }

    console.log('🤖 ===== n8n Chat Widget Initialization =====');
    console.log('📡 Webhook URL:', webhookUrl);
    console.log('🔑 Chat Input Key: chatInput');
    console.log('🔑 Session Key: sessionId');
    console.log('==========================================\n');

    // Intercept fetch to log all n8n API calls
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const [url, options] = args;

      // Only log n8n webhook calls
      if (typeof url === 'string' && url.includes('n8n.srv1321955.hstgr.cloud')) {
        console.log('\n📤 ===== OUTGOING REQUEST TO N8N =====');
        console.log('🔗 URL:', url);
        console.log('📝 Method:', options?.method || 'GET');

        if (options?.body) {
          try {
            const body = JSON.parse(options.body as string);
            console.log('📦 Request Payload:', JSON.stringify(body, null, 2));
          } catch (e) {
            console.log('📦 Request Body (raw):', options.body);
          }
        }

        console.log('🔧 Headers:', options?.headers || {});
        console.log('======================================\n');

        try {
          const response = await originalFetch(...args);

          console.log('\n📥 ===== RESPONSE FROM N8N =====');
          console.log('✅ Status:', response.status, response.statusText);
          console.log('🔧 Headers:', Object.fromEntries(response.headers.entries()));

          // Clone response to read body without consuming it
          const clonedResponse = response.clone();
          const responseText = await clonedResponse.text();

          console.log('📦 Response Body (raw):', responseText);

          try {
            const responseJson = JSON.parse(responseText);
            console.log('📦 Response Body (parsed):', JSON.stringify(responseJson, null, 2));

            // Check for empty or missing output
            if (!responseJson.output || responseJson.output === '') {
              console.error('⚠️  WARNING: Response has empty "output" field!');
              console.error('⚠️  This is why you\'re seeing <Empty response>');
              console.error('⚠️  Check your n8n workflow configuration:');
              console.error('   1. Ensure Chat Trigger mode is set to "chat" not "webhook"');
              console.error('   2. Verify AI Agent is properly connected');
              console.error('   3. Check AI Agent output format');
            } else {
              console.log('✅ Output received:', responseJson.output);
            }
          } catch (e) {
            console.log('📦 Response is not JSON:', responseText);
          }

          console.log('================================\n');

          return response;
        } catch (error) {
          console.error('\n❌ ===== REQUEST FAILED =====');
          console.error('Error:', error);
          console.error('============================\n');
          throw error;
        }
      }

      // For non-n8n requests, use original fetch
      return originalFetch(...args);
    };

    // Initialize the n8n chat widget
    try {
      createChat({
        // n8n webhook URL from environment variable
        webhookUrl,

        // CRITICAL: These keys must match what n8n Chat Trigger expects
        chatInputKey: 'chatInput',
        chatSessionKey: 'sessionId',

        // Welcome messages
        initialMessages: [
          'Hello! 👋',
          'I\'m here to help you with your dining experience at HML Restaurant.',
          'How can I assist you today?'
        ],

        // Chat window mode
        mode: 'window',

        // Load previous session if available
        loadPreviousSession: false,

        // Custom theme to match restaurant design
        theme: {
          chatWindow: {
            width: '400px',
            height: '600px',
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
          },
          header: {
            backgroundColor: '#d4af37',
            color: '#ffffff',
            fontSize: '18px',
            fontWeight: '600',
            padding: '16px',
          },
          message: {
            bot: {
              backgroundColor: '#fefaf6',
              color: '#2c1810',
              borderRadius: '12px',
              padding: '12px 16px',
            },
            user: {
              backgroundColor: '#d4af37',
              color: '#ffffff',
              borderRadius: '12px',
              padding: '12px 16px',
            },
          },
          input: {
            backgroundColor: '#f5f5f5',
            borderColor: '#e0e0e0',
            borderRadius: '8px',
            color: '#2c1810',
            fontSize: '14px',
            padding: '12px',
          },
          sendButton: {
            backgroundColor: '#c85a3a',
            color: '#ffffff',
            borderRadius: '8px',
            padding: '10px 16px',
          },
          button: {
            backgroundColor: '#d4af37',
            color: '#ffffff',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            boxShadow: '0 4px 12px rgba(212, 175, 55, 0.4)',
          },
        },

        // Metadata to send with each message
        metadata: {
          source: 'website',
          page: typeof window !== 'undefined' ? window.location.pathname : '/',
        },
      });

      console.log('✅ n8n chat widget initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize n8n chat widget:', error);
    }

    // Cleanup: restore original fetch when component unmounts
    return () => {
      window.fetch = originalFetch;
    };
  }, []);

  return null;
}
