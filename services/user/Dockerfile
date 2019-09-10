# Build phase.
FROM node:alpine AS builder

# Non previlage mode for better security (this user comes with official NodeJS image).
USER node

# Build arguments.
ARG HOME=/home/node

# Set necessary environment variables.
ENV NPM_CONFIG_PREFIX=$HOME/.npm-global \
  PATH=$PATH:$HOME/.npm-global/bin

# Create app directory.
WORKDIR $HOME

# Bundle app source.
COPY . .

# Install all depedencies.
RUN npm install --silent --no-progress

# Build app.
RUN npm run build

# Remove dev dependencies.
RUN npm prune --silent --no-progress --production

#

FROM node:alpine

# Non previlage mode for better security (this user comes with official NodeJS image).
USER node

# Build arguments.
ARG HOME=/home/node
ARG PORT=3000

# Set necessary environment variables.
ENV NODE_ENV=production \
  PORT=$PORT \
  NPM_CONFIG_PREFIX=$HOME/.npm-global \
  PATH=$PATH:$HOME/.npm-global/bin

# Create app directory.
WORKDIR $HOME

# Copy over node_modules from build phase.
COPY --from=builder $HOME/node_modules ./node_modules

# Copy over built app.
COPY --from=builder $HOME/dist ./dist

# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+).
COPY --from=builder $HOME/package*.json $HOME/*.lock ./

# Test the container to see if it's working.
HEALTHCHECK --interval=15s --timeout=10s --start-period=15s \
  CMD node ./dist/healthcheck

EXPOSE $PORT
CMD [ "npm", "start" ]
