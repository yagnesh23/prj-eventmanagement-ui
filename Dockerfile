FROM node:18-alpine as build
WORKDIR /app
COPY ./package*.json ./

RUN npm install husky --save-dev
RUN npm ci

COPY ./ ./
RUN npm run build

FROM nginx:1.23.0-alpine

EXPOSE 8080

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist/event-registration/browser /usr/share/nginx/html

# RUN npm run build --prod

# Runner Stage
# FROM node:18-alpine as runner

# WORKDIR /app

# # Install 'serve' to serve Angular app
# RUN npm install -g serve

# COPY --from=builder /app/dist/* /app

# cmd npm start


# EXPOSE 3000

# CMD ["serve", "-s", "/app", "-l", "3000"]
