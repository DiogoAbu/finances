## Build phase.
FROM node:12.13.0-alpine AS builder

## Build arguments.
ARG HOME=/home/node
ARG WAIT_VERSION=2.6.0

## Download wait script and set permissions.
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait $HOME/wait
RUN chown node $HOME/wait
RUN chmod +x $HOME/wait

## Non previlage mode for better security (this user comes with official NodeJS image).
USER node

## Set necessary environment variables.
ENV NPM_CONFIG_PREFIX=$HOME/.npm-global \
  PATH=$PATH:$HOME/.npm-global/bin

## Create app directory.
WORKDIR $HOME

## Bundle app source.
COPY . .

## Install all dependencies.
RUN npm install --silent --no-progress

## Build app.
RUN npm run build

## Remove dev dependencies.
RUN npm prune --silent --no-progress --production

##

FROM node:12.13.0-alpine

## Build arguments.
ARG HOME=/home/node
ARG PORT=3000

## Non previlage mode for better security (this user comes with official NodeJS image).
USER node

## Set necessary environment variables.
ENV NODE_ENV=production \
  PORT=$PORT \
  NPM_CONFIG_PREFIX=$HOME/.npm-global \
  PATH=$PATH:$HOME/.npm-global/bin

## Create app directory.
WORKDIR $HOME

## Copy over node_modules from build phase.
COPY --from=builder $HOME/node_modules ./node_modules

## Copy over built app.
COPY --from=builder $HOME/dist ./dist

## Copy wait script.
COPY --from=builder $HOME/wait ./

## A wildcard is used to ensure both package.json AND package-lock.json are copied
## where available (npm@5+).
COPY --from=builder $HOME/package*.json $HOME/*.lock ./

## Check container health.
HEALTHCHECK --interval=15s --timeout=10s --start-period=10s \
  CMD node ./dist/services/healthcheck

EXPOSE $PORT

## Wait for host from env WAIT_HOSTS.
CMD wait && npm start
