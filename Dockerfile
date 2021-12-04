FROM ubuntu:latest

RUN apt-get update --fix-missing
RUN apt-get install --yes curl
RUN apt-get install --yes git
RUN apt-get install --yes wget
#RUN apt-get install openjdk-8-jdk
ENV NPM_CONFIG_LOGLEVEL info
ENV NODE_VERSION 9.0.0

RUN curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.gz" \
  && curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/SHASUMS256.txt.asc" \
  && tar -xzf "node-v$NODE_VERSION-linux-x64.tar.gz" -C /usr/local --strip-components=1

ARG DEBIAN_FRONTEND=noninteractive

EXPOSE 8080


RUN apt-get install --yes npm

#RUN apt-get install --yes libxml2
# Clean up
RUN rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN apt-get clean

RUN mkdir -p /app
WORKDIR /app

COPY . /app
RUN rm -rf node_modules

RUN npm install
RUN cp db2consv_ee.lic ./node_modules/ibm_db/installer/clidriver/license/
RUN chmod -R a+rwX ./node_modules/ibm_db/installer/clidriver
CMD npm start
