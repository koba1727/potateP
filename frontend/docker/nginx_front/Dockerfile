FROM nginx:alpine

RUN apk --no-cache update \
  && apk --no-cache upgrade

COPY ./etc/nginx/nginx.conf /etc/nginx/nginx.conf
