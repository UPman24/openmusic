FROM mhart/alpine-node:16
 
WORKDIR /app
COPY . /app
 
RUN npm config set registry "https://registry.npm.taobao.org/"
 
RUN npm install
 
EXPOSE 14521
 
CMD npm start