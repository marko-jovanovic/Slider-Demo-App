# Slider Demo App

A GraphQL client written for [Slider Demo Server](https://github.com/marko-jovanovic/Slider-Demo-Server)

## Tech stach

Dependencies:
- [Apollo Client React](https://www.apollographql.com/docs/react/) - Open source GraphQL client
- [Next](https://nextjs.org/) - Framework that enables the developer to write and render React on the server side, and then hydrate the UI once the page is loaded. Besides that, it can statically generate pages which is really user-friendly for SEO
- [@graphql-codegen/cli](https://www.graphql-code-generator.com/) - Generate TypeScript classes and types from GraphQL schema and operations
- [@graphql-inspector/cli](https://github.com/kamilkisiela/graphql-inspector#readme) - GraphQL Inspector tool that outputs a list of changes between two GraphQL schemas. Unfortunatelly we  don't use this feature as much fetching the schema and saving it locally
- [@material-ui](https://material-ui.com/) - UI component library written in Material Design style

## Getting started

Since this app is designed to be used along with [Slider Demo Server](https://github.com/marko-jovanovic/Slider-Demo-Server), please refer to that repository on how to boot up the server.

### Step 1
Create docker image by running: `yarn docker:build`

### Step 2
Now that you have the image you can go to [Slider Demo Server](https://github.com/marko-jovanovic/Slider-Demo-Server) and continue from there if you want to boot up everything in the docker container (via `docker-compose`).

### Run at any time

Note that you don't have to necessarily run the app in the container, you can run it on its own by running the command: `yarn dev`