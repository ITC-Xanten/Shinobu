FROM node:16
# Create app directory
WORKDIR /usr/src/app
# Copy package files
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy source files
COPY . .
# Compile TypeScript
RUN npm run build
# Run bot
CMD ["npm", "run", "start"]
