FROM registry.access.redhat.com/ubi8/nodejs-10

ARG username
ARG password
ARG email
ARG repository

WORKDIR /opt/app-root

USER root

ADD package*.json ./
COPY tsconfig*.json ./

RUN npm install -g npm-cli-login
RUN npm-cli-login -u $username -p $password -e $email -r $repository
RUN npm set registry http://npm.seamfix.com
RUN npm install

COPY . .

EXPOSE 8195

CMD ["npm", "run", "start"]
