# Bug: TypeError: cmd is not a function when running Medusa CLI commands

## Bug report

### Describe the bug
Any Medusa CLI command fails with `TypeError: cmd is not a function` when deploying to Railway or running in production mode.

### System information
- Medusa version: v2.11.3
- Node.js version: v20
- Database: PostgreSQL
- Operating system: Linux (Railway container)

### Steps to reproduce
1. Create a fresh Medusa v2 project with `create-medusa-app`
2. Deploy to Railway (or any containerized environment)
3. Run `npm start` (which calls `medusa start`)
4. See error

### Expected behavior
The Medusa server should start normally.

### Actual behavior
```
TypeError: cmd is not a function
    at /app/node_modules/@medusajs/medusa-cli/dist/create-cli.js:198:13
    at /app/node_modules/@medusajs/medusa-cli/dist/create-cli.js:48:30
    at Object.handler (/app/node_modules/@medusajs/medusa-cli/dist/create-cli.js:16:21)
    at Object.runCommand (/app/node_modules/@medusajs/medusa-cli/node_modules/yargs/build/lib/command.js:196:48)
```

### Code snippets
```json
// package.json dependencies
{
  "@medusajs/admin-sdk": "2.11.3",
  "@medusajs/cli": "2.11.3",
  "@medusajs/framework": "2.11.3",
  "@medusajs/medusa": "2.11.3",
  "@medusajs/medusa-cli": "^1.3.23"
}
```

### Additional context
- The error occurs with both `@medusajs/cli` and `@medusajs/medusa-cli` installed
- Build completes successfully
- Database connection works
- This appears to be a conflict between v1 and v2 CLI packages

### Workaround attempted
Tried to bypass CLI entirely but couldn't find a way to start Medusa v2 without the CLI.

### Repository
https://github.com/Agalaxie/ma-boutique-medusa