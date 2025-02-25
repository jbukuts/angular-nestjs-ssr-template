FROM node:20-alpine as base
WORKDIR /app

FROM base as build
COPY package-lock.json .
COPY package.json .
COPY .npmrc .
RUN npm ci
COPY . .
RUN npm run build

FROM base as prod
RUN npm i @nestjs/common
COPY --from=build /app/dist/frontend ./dist/frontend
COPY --from=build /app/package.json ./
EXPOSE 5000
CMD [ "npm", "start" ]