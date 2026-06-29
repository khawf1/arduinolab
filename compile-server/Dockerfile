FROM node:20-bookworm-slim

RUN apt-get update && apt-get install -y --no-install-recommends curl ca-certificates && rm -rf /var/lib/apt/lists/*

# Install arduino-cli
RUN curl -fsSL https://raw.githubusercontent.com/arduino/arduino-cli/master/install.sh | sh -s -- v0.35.3
ENV PATH="/root/bin:${PATH}"

# Pre-install the AVR core (Uno/Nano/Mega target) so requests don't pay this cost
RUN arduino-cli core update-index && arduino-cli core install arduino:avr

WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev
COPY src ./src

ENV PORT=8080
EXPOSE 8080
CMD ["npm", "start"]
