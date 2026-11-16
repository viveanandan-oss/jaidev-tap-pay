
PRAGMA foreign_keys = ON;

CREATE TABLE merchants (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  mobile TEXT NOT NULL UNIQUE,
  pin_hash TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK(status IN ('pending', 'active', 'suspended')),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE shops (
  id TEXT PRIMARY KEY,
  merchant_id TEXT NOT NULL,
  shop_name TEXT NOT NULL,
  shop_slug TEXT NOT NULL UNIQUE,
  upi_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK(status IN ('pending', 'active', 'suspended')),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (merchant_id) REFERENCES merchants(id)
);

CREATE TABLE gateway_accounts (
  id TEXT PRIMARY KEY,
  merchant_id TEXT NOT NULL UNIQUE,
  provider TEXT NOT NULL,
  provider_account_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (merchant_id) REFERENCES merchants(id)
);

CREATE TABLE payment_orders (
  id TEXT PRIMARY KEY,
  shop_id TEXT NOT NULL,
  amount_paise INTEGER NOT NULL CHECK(amount_paise > 0),
  currency TEXT NOT NULL DEFAULT 'INR',
  gateway_order_id TEXT UNIQUE,
  status TEXT NOT NULL DEFAULT 'created'
    CHECK(status IN (
      'created', 'pending', 'paid', 'failed', 'expired', 'refunded'
    )),
  expires_at TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (shop_id) REFERENCES shops(id)
);

CREATE TABLE payment_events (
  id TEXT PRIMARY KEY,
  order_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  gateway_event_id TEXT UNIQUE,
  verified INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES payment_orders(id)
);

CREATE TABLE settlements (
  id TEXT PRIMARY KEY,
  merchant_id TEXT NOT NULL,
  gateway_settlement_id TEXT,
  amount_paise INTEGER NOT NULL CHECK(amount_paise >= 0),
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (merchant_id) REFERENCES merchants(id)
);

CREATE TABLE audit_logs (
  id TEXT PRIMARY KEY,
  merchant_id TEXT,
  action TEXT NOT NULL,
  details TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (merchant_id) REFERENCES merchants(id)
);

CREATE INDEX idx_shops_merchant ON shops(merchant_id);
CREATE INDEX idx_orders_shop ON payment_orders(shop_id);
CREATE INDEX idx_orders_status ON payment_orders(status);
CREATE INDEX idx_events_order ON payment_events(order_id);
