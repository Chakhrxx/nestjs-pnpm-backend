
FROM node:18-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and pnpm-lock.yaml to the container
COPY package.json pnpm-lock.yaml /app/

# Install pnpm globally
RUN npm install -g pnpm

# Install project dependencies using pnpm
RUN pnpm install

# Copy the rest of the application code to the container
COPY . /app

# Expose port 3000 for the NestJS application
EXPOSE 3000

# Start the application in development mode
CMD ["pnpm", "run", "start:dev"]