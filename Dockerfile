# --- Base image ---
FROM node:20-alpine

# App lives here inside the container
WORKDIR /usr/src/app

# Copy manifest first so npm install is cached unless dependencies change
COPY package*.json ./
RUN npm install --omit=dev

# Copy the rest of the source
COPY . .

# Run as the non-root 'node' user (built into the official image) instead of root
USER node

# App listens on 3000 inside the container
EXPOSE 3000

# Let Docker know how to check container health
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD wget -qO- http://localhost:3000/health || exit 1

CMD ["node", "server.js"]
