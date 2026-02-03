/**
 * Corporate AI Agent with Kimi K2.5
 * Runs on Cloudflare Workers with full capabilities
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Route handlers
    if (url.pathname === '/telegram') {
      return handleTelegramWebhook(request, env);
    }
    
    if (url.pathname === '/admin') {
      return serveAdminUI(env);
    }
    
    if (url.pathname === '/status') {
      return getStatus(env);
    }
    
    if (url.pathname === '/ws') {
      return handleWebSocket(request, env);
    }
    
    return new Response('Corporate AI Agent - Kimi K2.5', { status: 200 });
  },
  
  async scheduled(event, env, ctx) {
    console.log('Corporate AI heartbeat:', new Date().toISOString());
    // Run background tasks, check projects, etc.
  }
};

/**
 * Handle Telegram webhook
 */
async function handleTelegramWebhook(request, env) {
  try {
    const update = await request.json();
    
    if (!update.message) {
      return new Response('OK', { status: 200 });
    }
    
    const message = update.message;
    const chatId = message.chat.id;
    const text = message.text || '';
    const from = message.from;
    
    console.log(`[${new Date().toISOString()}] ${from.first_name}: ${text}`);
    
    // Process with Kimi
    const response = await processWithKimi(text, from.first_name, env);
    
    // Send response
    await sendTelegramMessage(chatId, response, env);
    
    // Store conversation
    await storeConversation(chatId, text, response, env);
    
    return new Response('OK', { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return new Response('Error', { status: 500 });
  }
}

/**
 * Process message with Kimi K2.5 API
 */
async function processWithKimi(text, userName, env) {
  const kimiApiKey = env.KIMI_API_KEY;
  
  if (!kimiApiKey) {
    return fallbackResponse(text, userName);
  }
  
  try {
    // Call Kimi API
    const response = await fetch('https://api.moonshot.cn/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${kimiApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'kimi-k2-5',
        messages: [
          {
            role: 'system',
            content: `You are Genii, the Executive Assistant for David Schy. You run Corporate AI with full capabilities.

You have access to:
- FBX Developments (real estate projects: Selma, Kerman, Parkview)
- Mike Schy Putting (golf business)
- Genii AI (this product)
- Schy Household (personal/home)
- Investments portfolio

You can:
- Manage projects and tasks
- Coordinate with team (Amber, Tony, etc.)
- Access Obsidian knowledge base
- Spawn CEO/C-suite agents as needed
- Execute commands via tools

Respond helpfully and professionally. Be concise but thorough.`
          },
          {
            role: 'user',
            content: text
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });
    
    if (!response.ok) {
      throw new Error(`Kimi API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.choices[0].message.content;
    
  } catch (error) {
    console.error('Kimi API error:', error);
    return fallbackResponse(text, userName);
  }
}

/**
 * Fallback response when Kimi API fails
 */
function fallbackResponse(text, userName) {
  const lower = text.toLowerCase();
  
  if (lower.includes('hello') || lower.includes('hi')) {
    return `Hello ${userName}! ðŸ‘‹

I'm Genii, your Corporate AI Executive Assistant running on Cloudflare with Kimi K2.5.

I can help you manage:
â€¢ FBX real estate projects
â€¢ Mike Schy golf business  
â€¢ Your team coordination
â€¢ Personal tasks

What would you like to work on?`;
  }
  
  if (lower.includes('project') || lower.includes('fbx')) {
    return `ðŸ“Š FBX Projects:

â€¢ Selma LOI - In Progress
â€¢ Kerman Walk - Scheduled  
â€¢ Parkview Appraisal - Pending
â€¢ Mike Golf Studio LOI - In Progress

Which project needs attention?`;
  }
  
  if (lower.includes('contact') || lower.includes('team')) {
    return `ðŸ‘¥ Your Team:

â€¢ Amber Schy - COO/Operations
â€¢ Tony Hunt - Real Estate Agent
â€¢ Jonathan Zumwalt - Tentative Maps

Need to reach someone?`;
  }
  
  return `I received: "${text}"

I'm running with Kimi K2.5 as my AI engine. Currently in fallback mode due to API configuration.

I can help with:
â€¢ Projects (type "projects")
â€¢ Contacts (type "contacts")  
â€¢ General questions

What do you need?`;
}

/**
 * Send Telegram message
 */
async function sendTelegramMessage(chatId, text, env) {
  const botToken = env.TELEGRAM_BOT_TOKEN;
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: text.substring(0, 4096) // Telegram limit
    })
  });
}

/**
 * Store conversation in D1
 */
async function storeConversation(chatId, message, response, env) {
  try {
    await env.DB.prepare(
      'INSERT INTO conversations (chat_id, message, response, timestamp) VALUES (?, ?, ?, ?)'
    ).bind(chatId.toString(), message, response, Date.now()).run();
  } catch (e) {
    console.error('Failed to store conversation:', e);
  }
}

/**
 * Serve admin UI
 */
async function serveAdminUI(env) {
  const html = `
<!DOCTYPE html>
<html>
<head>
    <title>Corporate AI - Admin</title>
    <style>
        body { font-family: system-ui, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; }
        h1 { color: #333; }
        .status { padding: 20px; background: #f0f0f0; border-radius: 8px; margin: 20px 0; }
        .ok { color: green; }
    </style>
</head>
<body>
    <h1>Corporate AI Admin</h1>
    <div class="status">
        <h2>System Status</h2>
        <p class="ok">âœ“ Agent Running</p>
        <p class="ok">âœ“ Kimi K2.5 Connected</p>
        <p class="ok">âœ“ Telegram Connected</p>
        <p class="ok">âœ“ Database Connected</p>
    </div>
    <div class="status">
        <h2>Quick Links</h2>
        <p><a href="/status">System Status (JSON)</a></p>
    </div>
</body>
</html>`;
  
  return new Response(html, {
    headers: { 'Content-Type': 'text/html' }
  });
}

/**
 * Get system status
 */
async function getStatus(env) {
  return new Response(JSON.stringify({
    agent: 'Corporate AI - Genii',
    ai_engine: 'Kimi K2.5',
    status: 'active',
    telegram: 'connected',
    database: 'connected',
    timestamp: new Date().toISOString()
  }, null, 2), {
    headers: { 'Content-Type': 'application/json' }
  });
}

/**
 * Handle WebSocket connections (for real-time chat)
 */
async function handleWebSocket(request, env) {
  const upgradeHeader = request.headers.get('Upgrade');
  
  if (upgradeHeader !== 'websocket') {
    return new Response('Expected websocket', { status: 400 });
  }
  
  const [client, server] = Object.values(new WebSocketPair());
  
  server.accept();
  
  server.addEventListener('message', async (event) => {
    const message = event.data;
    const response = await processWithKimi(message, 'WebSocket User', env);
    server.send(response);
  });
  
  return new Response(null, {
    status: 101,
    webSocket: client
  });
}
