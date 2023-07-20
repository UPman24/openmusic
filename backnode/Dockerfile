FROM node:16.15.0
 
WORKDIR /app
COPY . /app
 
RUN npm config set registry https://registry.npm.taobao.org

RUN npm install --save-dev typescript@latest
 
RUN npm install

RUN npm run ci
 
EXPOSE 7002
 
CMD npm run start