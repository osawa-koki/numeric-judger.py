# Step 1: Build the Next.js app
FROM node:16 as build-stage

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY client/package.json client/package-lock.json ./

# Install the dependencies
RUN yarn

# Copy the rest of the code
COPY client .

# Build the Next.js app
RUN yarn build

# Step 2: Start the FastAPI server
FROM python:3.8 as production-stage
EXPOSE 80

RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y libgl1-mesa-dev

# Set the working directory
WORKDIR /app

# Copy the required files from the build stage
COPY --from=build-stage /app/dist /app/www
COPY . .
COPY requirements.txt .

# Install the Python dependencies
RUN pip install -r requirements.txt

# Set the default command to start the FastAPI server
CMD ["python", "main.py"]
