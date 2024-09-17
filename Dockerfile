FROM node:21

WORKDIR /home/node/app
COPY package.json package-lock.json /home/node/app/
COPY prisma ./prisma/
RUN npm install && npm build
RUN npm prisma generate
COPY . /home/node/app/
CMD npm start