# Step 1: Use an official Node.js runtime as a parent image
FROM node:18 AS build

# Step 2: Set the working directory in the container
WORKDIR /seek-toyrobot

# Step 3: Copy package.json and package-lock.json to the working directory
COPY package.json ./
COPY yarn.lock ./

# Step 4: Install dependencies
RUN yarn install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Compile TypeScript to JavaScript
RUN yarn build

# Step 7: Use a smaller image to reduce the size of the final image
FROM node:18-slim

# Step 8: Set the working directory in the container
WORKDIR /seek-toyrobot

# Step 9: Copy only the necessary files from the build stage
COPY --from=build /seek-toyrobot/dist /seek-toyrobot/dist
COPY --from=build /seek-toyrobot/node_modules /seek-toyrobot/node_modules

# Step 10: Set environment variables, if any
ENV NODE_ENV=production

# Step 11: Expose the port the app runs on
EXPOSE 3000

# Step 12: Define the command to run the app
CMD ["node", "dist/src/index.js"]
