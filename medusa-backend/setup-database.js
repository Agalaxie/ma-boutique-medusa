#!/usr/bin/env node

/**
 * Script pour créer les tables Medusa dans PostgreSQL
 * À exécuter avec l'URL de la base de données
 */

const { Client } = require('pg');

// Récupérer l'URL de la base de données
const DATABASE_URL = process.env.DATABASE_PUBLIC_URL || process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL not set!');
  console.log('Usage: DATABASE_URL=postgresql://... node setup-database.js');
  process.exit(1);
}

console.log('🚀 Setting up Medusa database tables');
console.log('=====================================');
console.log('📊 Connecting to database...');

const client = new Client({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function setupDatabase() {
  try {
    await client.connect();
    console.log('✅ Connected to database');

    // Créer les tables essentielles
    const queries = [
      // Table des devises
      `CREATE TABLE IF NOT EXISTS currency (
        code VARCHAR(3) PRIMARY KEY,
        symbol VARCHAR(10),
        symbol_native VARCHAR(10),
        name VARCHAR(255),
        deleted_at TIMESTAMP
      )`,

      // Table des fournisseurs de taxes
      `CREATE TABLE IF NOT EXISTS tax_provider (
        id VARCHAR(255) PRIMARY KEY,
        is_installed BOOLEAN DEFAULT true,
        deleted_at TIMESTAMP
      )`,

      // Table des fournisseurs de paiement
      `CREATE TABLE IF NOT EXISTS payment_provider (
        id VARCHAR(255) PRIMARY KEY,
        is_installed BOOLEAN DEFAULT true,
        deleted_at TIMESTAMP
      )`,

      // Table des fournisseurs de notification
      `CREATE TABLE IF NOT EXISTS notification_provider (
        id VARCHAR(255) PRIMARY KEY,
        is_installed BOOLEAN DEFAULT true,
        deleted_at TIMESTAMP
      )`,

      // Table des fournisseurs de fulfillment
      `CREATE TABLE IF NOT EXISTS fulfillment_provider (
        id VARCHAR(255) PRIMARY KEY,
        is_installed BOOLEAN DEFAULT true,
        deleted_at TIMESTAMP
      )`,

      // Table des régions
      `CREATE TABLE IF NOT EXISTS region (
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
      )`,

      // Table de liaison régions-pays
      `CREATE TABLE IF NOT EXISTS region_country (
        region_id VARCHAR(255),
        iso_2 VARCHAR(2),
        deleted_at TIMESTAMP,
        PRIMARY KEY (region_id, iso_2)
      )`
    ];

    // Exécuter chaque requête
    for (const query of queries) {
      console.log('📝 Creating table...');
      await client.query(query);
    }

    console.log('✅ Tables created successfully');

    // Insérer les données de base
    console.log('📦 Inserting default data...');

    // Providers
    await client.query(`
      INSERT INTO tax_provider (id, is_installed)
      VALUES ('tp_system', true)
      ON CONFLICT (id) DO NOTHING
    `);

    await client.query(`
      INSERT INTO payment_provider (id, is_installed)
      VALUES ('pp_system_default', true)
      ON CONFLICT (id) DO NOTHING
    `);

    // Devises
    await client.query(`
      INSERT INTO currency (code, symbol, symbol_native, name) VALUES
      ('usd', '$', '$', 'US Dollar'),
      ('eur', '€', '€', 'Euro'),
      ('gbp', '£', '£', 'British Pound'),
      ('cad', 'CA$', '$', 'Canadian Dollar')
      ON CONFLICT (code) DO NOTHING
    `);

    // Région par défaut
    await client.query(`
      INSERT INTO region (id, name, currency_code, tax_rate)
      VALUES ('reg_01', 'North America', 'usd', 0)
      ON CONFLICT (id) DO NOTHING
    `);

    await client.query(`
      INSERT INTO region_country (region_id, iso_2)
      VALUES ('reg_01', 'us')
      ON CONFLICT DO NOTHING
    `);

    console.log('✅ Default data inserted');

    console.log('\n🎉 Database setup completed successfully!');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    await client.end();
    console.log('👋 Connection closed');
  }
}

// Exécuter le setup
setupDatabase();