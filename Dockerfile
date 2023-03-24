
# FROM node:18-alpine

# COPY . /var/www

# WORKDIR /var/www

# RUN npm install -g pnpm
# RUN pnpm install

# ENTRYPOINT ["pnpm","start:dev"]

# Base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and pnpm-lock.yaml files
COPY package.json pnpm-lock.yaml tsconfig.build.json tsconfig.json ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies using pnpm
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN pnpm run build

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:dev"]
