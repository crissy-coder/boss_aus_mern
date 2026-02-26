-- CMS pages table for Vercel Postgres (run once in Vercel → Storage → Postgres → Query)
-- Compatible with lib/cms.ts PageMeta & PageContent types

CREATE TABLE IF NOT EXISTS cms_pages (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('home', 'about', 'contact', 'team', 'service', 'custom')),
  menu_placement TEXT CHECK (menu_placement IS NULL OR menu_placement IN ('main', 'services', 'global', 'footer')),
  content JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Optional: index for listing by updated_at
CREATE INDEX IF NOT EXISTS cms_pages_updated_at_idx ON cms_pages (updated_at DESC);
