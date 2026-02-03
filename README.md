# Corporate AI with Kimi K2.5

Full Corporate AI agent running on Cloudflare Workers with Kimi K2.5 as the AI engine.

## ðŸš€ Quick Deploy

### Prerequisites
- Cloudflare account (Workers Paid plan - $5/month)
- Kimi API key (from https://platform.moonshot.cn/)

### Deploy Steps

```bash
# 1. Clone this repo
git clone https://github.com/davidmschy/corporate-ai-kimi.git
cd corporate-ai-kimi

# 2. Install dependencies
npm install

# 3. Login to Cloudflare
npx wrangler login

# 4. Set your Kimi API key
npx wrangler secret put KIMI_API_KEY
# Enter your Kimi API key

# 5. Set Telegram bot token
npx wrangler secret put TELEGRAM_BOT_TOKEN
# Enter: 8527939205:AAFWI1EtRA2IAyYnsCnvnFeln0-G4xSvBxY

# 6. Deploy
npm run deploy

# 7. Set Telegram webhook (replace YOUR_URL with the deployed URL)
curl -X POST "https://api.telegram.org/bot8527939205:AAFWI1EtRA2IAyYnsCnvnFeln0-G4xSvBxY/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{"url": "YOUR_URL/telegram"}'
```

## ðŸ§  Features

- **Kimi K2.5** - Advanced AI reasoning and responses
- **24/7 Availability** - Always-on Cloudflare infrastructure
- **Telegram Integration** - Chat via Telegram
- **WebSocket Support** - Real-time connections
- **Admin UI** - Manage the agent at /admin
- **Database** - Persistent storage with D1
- **R2 Storage** - File storage capability
- **Multi-Agent Ready** - Architecture for CEOs/C-suites

## ðŸ“± Usage

Once deployed, message @Clawdthe_bot on Telegram:

- `hello` - Introduction
- `status` - System status
- `projects` - View active projects
- Any message - Kimi will respond intelligently

## ðŸ”§ Architecture

```
User (Telegram)
    â†“
Cloudflare Worker
    â”œâ”€â”€ Kimi K2.5 API (AI reasoning)
    â”œâ”€â”€ D1 Database (conversations, projects)
    â”œâ”€â”€ R2 Storage (files)
    â””â”€â”€ Admin UI (management)
```

## ðŸ¢ Corporate AI Features

This agent includes:
- Your FBX project knowledge
- Your team contacts (Amber, Tony)
- Your 2026 goals
- Multi-agent architecture (ready for CEOs/C-suites)
- Full tool integration capability

## ðŸ“ Costs

- Cloudflare Workers Paid: $5/month
- Kimi API: Pay per usage (~$0.003 per 1K tokens)
- D1 Database: Free tier (5M rows/day)
- R2 Storage: Free tier (10GB)

**Total: ~$5-20/month depending on usage**

## ðŸ”„ Migration from PC

Once this is running:
1. Test all functions work
2. Migrate full Obsidian vault to R2
3. Import all conversations to D1
4. Turn off PC agent
5. This becomes primary 24/7 agent

## ðŸš€ Next Steps

- Add CEO/C-suite agents
- Add more tool integrations
- Add Google Chat support
- Deploy team member instances
