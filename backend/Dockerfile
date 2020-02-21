FROM node:10.13.0-alpine

# https://bitbucket.org/site/master/issues/16334/pipelines-failing-with-could-not-get-uid
# https://github.com/npm/npm/issues/20861
RUN npm config set unsafe-perm true

RUN [ "mkdir", "-p", "/usr/src" ]

WORKDIR /usr/src

RUN [ "npm", "install", "pm2", "-g" ]

RUN ["npm", "cache", "clean", "--force"]

COPY package.json /usr/src/
COPY package-lock.json /usr/src/

RUN [ "npm", "install", "--no-cache"]

COPY . /usr/src

RUN [ "npm", "run"]

EXPOSE 3001

# ENV NODE_ENV=production
CMD [ "npm", "run", "serve:docker" ]
