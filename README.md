# Boiler NodeJS - Typescript

:chart_with_upwards_trend: Ready to Develop: Works out of the box for most Node.js projects.

✅ All initial tools included and installed:
- [Typescript](https://www.npmjs.com/package/typescript)
- [ESM](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [Jest](https://www.npmjs.com/package/jest)
- [Prettier](https://www.npmjs.com/package/prettier)
- Example of Typescript code and unit testing
- [Typeorm](https://www.npmjs.com/package/typeorm)
- Mysql DB
- Typeorm Migrations & Seeding
- [Zod](https://www.npmjs.com/package/zod)
- [JWT Tokens](https://www.npmjs.com/package/jsonwebtoken)
- Image upload to AWS S3
- Stripe webhook implementation

## Getting Started

- Prior Docker installation required
- Rename <code>.env.example</code> to <code>.env</code> and set the variables

### Clone the template:
```console
$ git clone https://github.com/kevinefraim/boiler-node.git
$ cd boiler-node
$ npm install
```

### Initialize the Server
```console
$ npm run db-start
$ npm run watch
```


## Migrations & Seeds
- Set <code>NODE_ENV=production</code> in <code>.env</code> file
- To generate a migration file and run it:
```console
$ npm run migration:generate
$ npm run migration:up
```
- To clear the DB run: 
```console
$ npm run typeorm schema:drop
```


