-- Promote the original public-page examples into editable database records.
-- Only seed a fresh study-case table so existing admin content is never overwritten.
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM "StudyCase") THEN
    INSERT INTO "StudyCase" ("id", "title", "description", "sortOrder", "isActive", "createdAt", "updatedAt") VALUES
      ('seed-study-case-1', 'Family Home Battery Upgrade', 'A suburban household compares battery storage options to use more rooftop solar in the evening and reduce grid reliance.', 0, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ('seed-study-case-2', 'Small Business Backup Plan', 'A small office reviews battery capacity and essential-load backup needs to keep daily operations running during outages.', 1, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ('seed-study-case-3', 'New Build Solar Storage', 'A new home project plans solar and battery storage together so the system is ready for long-term energy independence.', 2, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ('seed-study-case-4', 'High Usage Evening Load', 'A household with strong evening demand evaluates usable capacity, warranty coverage, and practical payback expectations.', 3, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ('seed-study-case-5', 'Regional Property Resilience', 'A regional property studies battery storage for backup confidence, solar self-consumption, and fewer outage disruptions.', 4, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ('seed-study-case-6', 'Compact Townhouse Solution', 'A townhouse owner compares compact battery products where available wall space and installation layout matter most.', 5, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

    INSERT INTO "StudyCaseImage" ("id", "url", "sortOrder", "studyCaseId", "createdAt") VALUES
      ('seed-study-image-1-1', 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80', 0, 'seed-study-case-1', CURRENT_TIMESTAMP),
      ('seed-study-image-1-2', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80', 1, 'seed-study-case-1', CURRENT_TIMESTAMP),
      ('seed-study-image-1-3', 'https://images.unsplash.com/photo-1566093097221-ac2335b09e70?auto=format&fit=crop&w=1200&q=80', 2, 'seed-study-case-1', CURRENT_TIMESTAMP),
      ('seed-study-image-2-1', 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80', 0, 'seed-study-case-2', CURRENT_TIMESTAMP),
      ('seed-study-image-2-2', 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80', 1, 'seed-study-case-2', CURRENT_TIMESTAMP),
      ('seed-study-image-2-3', 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80', 2, 'seed-study-case-2', CURRENT_TIMESTAMP),
      ('seed-study-image-3-1', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', 0, 'seed-study-case-3', CURRENT_TIMESTAMP),
      ('seed-study-image-3-2', 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80', 1, 'seed-study-case-3', CURRENT_TIMESTAMP),
      ('seed-study-image-3-3', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80', 2, 'seed-study-case-3', CURRENT_TIMESTAMP),
      ('seed-study-image-4-1', 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80', 0, 'seed-study-case-4', CURRENT_TIMESTAMP),
      ('seed-study-image-4-2', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80', 1, 'seed-study-case-4', CURRENT_TIMESTAMP),
      ('seed-study-image-4-3', 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80', 2, 'seed-study-case-4', CURRENT_TIMESTAMP),
      ('seed-study-image-5-1', 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80', 0, 'seed-study-case-5', CURRENT_TIMESTAMP),
      ('seed-study-image-5-2', 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80', 1, 'seed-study-case-5', CURRENT_TIMESTAMP),
      ('seed-study-image-5-3', 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80', 2, 'seed-study-case-5', CURRENT_TIMESTAMP),
      ('seed-study-image-6-1', 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80', 0, 'seed-study-case-6', CURRENT_TIMESTAMP),
      ('seed-study-image-6-2', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80', 1, 'seed-study-case-6', CURRENT_TIMESTAMP),
      ('seed-study-image-6-3', 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80', 2, 'seed-study-case-6', CURRENT_TIMESTAMP);
  END IF;
END $$;
