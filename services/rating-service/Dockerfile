FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY --chown=node:node . .
EXPOSE 3003
USER node
CMD ["npm", "start"]
