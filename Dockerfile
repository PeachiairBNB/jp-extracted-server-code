FROM node:8

WORKDIR usrn/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3008

CMD ["npm", "run", "initAll"]

# version that might have worked with mongoimport:

# FROM mongo AS builder

# WORKDIR /mongoFolder

# FROM node:8

# COPY --from=builder /mongoFolder .

# WORKDIR usrn/src/app

# COPY package*.json ./

# RUN npm install

# COPY . .

# EXPOSE 3008

# CMD ["npm", "run", "initAll"]