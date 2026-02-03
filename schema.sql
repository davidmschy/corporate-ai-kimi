-- Corporate AI with Kimi - Database Schema

-- Conversations
CREATE TABLE IF NOT EXISTS conversations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  chat_id TEXT NOT NULL,
  message TEXT NOT NULL,
  response TEXT,
  timestamp INTEGER NOT NULL
);

-- Projects
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'active',
  priority INTEGER DEFAULT 3,
  created_at INTEGER NOT NULL
);

-- Knowledge (Obsidian data)
CREATE TABLE IF NOT EXISTS knowledge (
  id TEXT PRIMARY KEY,
  category TEXT,
  content TEXT NOT NULL,
  tags TEXT,
  created_at INTEGER NOT NULL
);

-- Agents (for multi-agent tracking)
CREATE TABLE IF NOT EXISTS agents (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  parent_id TEXT,
  status TEXT DEFAULT 'active',
  created_at INTEGER NOT NULL
);

-- Insert initial data
INSERT OR REPLACE INTO projects (id, name, description, status, priority, created_at) VALUES
('selma', 'Selma LOI', 'Selma property LOI negotiations', 'in_progress', 1, 1738876800000),
('kerman', 'Kerman Walk', 'Kerman property walk-through', 'scheduled', 2, 1738876800000),
('parkview', 'Parkview Appraisal', 'Parkview property appraisal', 'pending', 2, 1738876800000),
('mike-golf', 'Mike Golf Studio LOI', 'Mike Golf Studio LOI', 'in_progress', 1, 1738876800000);

INSERT OR REPLACE INTO knowledge (id, category, content, tags, created_at) VALUES
('fbx-overview', 'business', 'FBX Developments - Real estate development company. Active projects: Selma, Kerman, Parkview, Mike Golf Studio.', '["fbx", "overview"]', 1738876800000),
('mike-overview', 'business', 'Mike Schy Putting Empire - Golf instruction business. Products: Putting Confidence ebook ($97).', '["mike-schy", "golf"]', 1738876800000),
('goals-2026', 'personal', '2026 Goals: Corporate AI launch, FBX 3 projects to completion, Mike Schy ebook 10K sales.', '["goals", "2026"]', 1738876800000);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_conversations_chat ON conversations(chat_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
