## Install express
```bash
npm i express 
npm i -D @types/express
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