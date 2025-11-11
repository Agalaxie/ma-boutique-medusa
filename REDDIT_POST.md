# Help needed: Medusa v2 CLI "cmd is not a function" error on Railway deployment

## The Problem
I'm trying to deploy a Medusa v2 backend to Railway, but I keep getting this error:

```
TypeError: cmd is not a function
    at /app/node_modules/@medusajs/medusa-cli/dist/create-cli.js:198:13
```

This happens when trying to run `medusa start` or any Medusa CLI command.

## What I've Tried
1. ✅ Database connects successfully (PostgreSQL on Railway)
2. ✅ Build completes without errors
3. ❌ `medusa start` fails with the cmd error
4. ❌ `medusa migrations run` fails with the same error
5. ❌ Even `npx medusa --version` fails

## Environment
- **Medusa version**: 2.11.3
- **Node version**: 20
- **Deployment**: Railway (Nixpacks)
- **Database**: PostgreSQL (Railway)

## package.json dependencies
```json
{
  "@medusajs/admin-sdk": "2.11.3",
  "@medusajs/cli": "2.11.3",
  "@medusajs/framework": "2.11.3",
  "@medusajs/medusa": "2.11.3",
  "@medusajs/medusa-cli": "^1.3.23"
}
```

## The Error Stack
```
TypeError: cmd is not a function
    at /app/node_modules/@medusajs/medusa-cli/dist/create-cli.js:198:13
    at /app/node_modules/@medusajs/medusa-cli/dist/create-cli.js:48:30
    at Object.handler (/app/node_modules/@medusajs/medusa-cli/dist/create-cli.js:16:21)
```

## Questions
1. Is there a conflict between `@medusajs/cli` (v2) and `@medusajs/medusa-cli` (v1)?
2. How can I start Medusa v2 without using the CLI?
3. Is there a known issue with Medusa v2 on Railway?

Any help would be greatly appreciated! I've been stuck on this for hours.

## Repository
https://github.com/Agalaxie/ma-boutique-medusa

---
**Tags:** #medusajs #railway #deployment #nodejs #ecommerce