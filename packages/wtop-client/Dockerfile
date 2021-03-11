FROM node:15 AS builder
WORKDIR /app
ARG WTOP_HOSTNAME
ARG NODE_ENV
ENV WTOP_HOSTNAME $WTOP_HOSTNAME
ENV NODE_ENV $NODE_ENV
COPY . .
RUN echo Building wtop-client for $WTOP_HOSTNAME
RUN /bin/bash -c 'echo "REACT_APP_WTOP_HOSTNAME=$WTOP_HOSTNAME" > .env && cat .env'
RUN npm install --also=dev && WTOP_HOSTNAME=$WTOP_HOSTNAME npm run-script build
FROM nginx:alpine
RUN apk add bash
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build .
# ENTRYPOINT ["nginx", "-g", "daemon off;"]