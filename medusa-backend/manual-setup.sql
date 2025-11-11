-- Script SQL pour créer les tables Medusa manuellement
-- À exécuter dans PostgreSQL sur Railway

-- Table des devises
CREATE TABLE IF NOT EXISTS currency (
    code VARCHAR(3) PRIMARY KEY,
    symbol VARCHAR(10),
    symbol_native VARCHAR(10),
    name VARCHAR(255),
    deleted_at TIMESTAMP
);

-- Table des fournisseurs de taxes
CREATE TABLE IF NOT EXISTS tax_provider (
    id VARCHAR(255) PRIMARY KEY,
    is_installed BOOLEAN DEFAULT true,
    deleted_at TIMESTAMP
);

-- Insérer le provider système
INSERT INTO tax_provider (id, is_installed)
VALUES ('tp_system', true)
ON CONFLICT (id) DO NOTHING;

-- Table des fournisseurs de paiement
CREATE TABLE IF NOT EXISTS payment_provider (
    id VARCHAR(255) PRIMARY KEY,
    is_installed BOOLEAN DEFAULT true,
    deleted_at TIMESTAMP
);

-- Insérer le provider par défaut
INSERT INTO payment_provider (id, is_installed)
VALUES ('pp_system_default', true)
ON CONFLICT (id) DO NOTHING;

-- Table des fournisseurs de notification
CREATE TABLE IF NOT EXISTS notification_provider (
    id VARCHAR(255) PRIMARY KEY,
    is_installed BOOLEAN DEFAULT true,
    deleted_at TIMESTAMP
);

-- Table des fournisseurs de fulfillment
CREATE TABLE IF NOT EXISTS fulfillment_provider (
    id VARCHAR(255) PRIMARY KEY,
    is_installed BOOLEAN DEFAULT true,
    deleted_at TIMESTAMP
);

-- Table des régions
CREATE TABLE IF NOT EXISTS region (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255),
    currency_code VARCHAR(3),
    tax_rate DECIMAL(5,2),
    tax_code VARCHAR(255),
    gift_cards_taxable BOOLEAN DEFAULT true,
    automatic_taxes BOOLEAN DEFAULT true,
    tax_provider_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    metadata JSONB
);

-- Table de liaison régions-pays
CREATE TABLE IF NOT EXISTS region_country (
    region_id VARCHAR(255) REFERENCES region(id),
    iso_2 VARCHAR(2),
    deleted_at TIMESTAMP,
    PRIMARY KEY (region_id, iso_2)
);

-- Insérer quelques devises de base
INSERT INTO currency (code, symbol, symbol_native, name) VALUES
('usd', '$', '$', 'US Dollar'),
('eur', '€', '€', 'Euro'),
('gbp', '£', '£', 'British Pound'),
('cad', 'CA$', '$', 'Canadian Dollar')
ON CONFLICT (code) DO NOTHING;

-- Créer une région par défaut
INSERT INTO region (id, name, currency_code, tax_rate)
VALUES ('reg_01', 'North America', 'usd', 0)
ON CONFLICT (id) DO NOTHING;

-- Ajouter les États-Unis à la région
INSERT INTO region_country (region_id, iso_2)
VALUES ('reg_01', 'us')
ON CONFLICT DO NOTHING;