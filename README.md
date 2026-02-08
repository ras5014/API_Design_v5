## Install express
```bash
npm i express 
npm i -D @types/express
npm i -D @types/node
npm i -D typescript
```

## Initialize tsconfig.json file
```bash
npx tsc --init
```
## Change these in tsconfig.json file
```json
{
  "compilerOptions": {
    "noEmit": true,
    "target": "esnext",
    "module": "nodenext",
    "rewriteRelativeImportExtensions": true,
    "erasableSyntaxOnly": true,
    "verbatimModuleSyntax": true,
    "allowImportingTsExtensions": true,
    "types": ["vitest/globals"]
  }
}
```

## Important Points
- typescript is for development time
- zod is for run time
- .env.example file is there to tell a new user on what env variables is required to run the app

## Install some more packages
- npm i custom-env zod dotenv 

## Gotta change these to run 
```json
"main": "src/index.ts",
  "type": "module",
  "scripts": {
    "dev": "node --watch src/index.ts"
  },
```

## Make the env.ts file