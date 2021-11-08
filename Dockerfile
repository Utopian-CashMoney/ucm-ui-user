#UserUI Dockerfile

FROM node:13.12.0-alpine
WORKDIR /app

#Add 'app/node_modules/.bin' to $PATH
ENV PATH /app/node_modules/.bin:$PATH

#Install app dependencies
COPY package.json ./
RUN npm install
RUN npm install react-scripts@3.4.1 -g

#Add App
COPY . ./

#Expose Port
EXPOSE 3000

#Start App
CMD ["npm", "start"]
