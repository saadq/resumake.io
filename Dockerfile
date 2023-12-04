# Step 1: Use a Node.js base image
FROM node:latest as builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's source code
COPY . .

# Build your Next.js application
RUN npm run build

# Step 2: Set up a LaTeX environment
# Use a base image that includes a minimal TeX distribution like TinyTeX
# Start from a LaTeX base image that uses Debian
FROM blang/latex:ctanfull

# Install Node.js
RUN apt-get update && \
    apt-get install -y curl software-properties-common && \
    curl -sL https://deb.nodesource.com/setup_16.x | bash - && \
    apt-get install -y nodejs

# Copy the built Next.js application from the builder stage
COPY --from=builder /app/.next .next
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/package.json package.json
COPY --from=builder /app/public public

# Update tlmgr to the latest version
RUN tlmgr update --self

# Install additional LaTeX packages if needed
RUN tlmgr install enumitem fancyhdr unicode-math fontawesome microtype moderncv fontawesome5 multirow arydshln ebgaramond

# Expose the port the app runs on
EXPOSE 3000

# Set the command to start your app
CMD ["npm", "start"]
