FROM node:13-alpine
# FROM node:10.15

ARG APP_ROOT

RUN apk --no-cache update \
    && apk --no-cache upgrade \
    && apk add \
    musl \
    linux-headers \
    gcc \
    g++ \
    make \
    gfortran \
    openblas-dev \
    python3 \
    python3-dev

RUN mkdir ${APP_ROOT}
WORKDIR ${APP_ROOT}

# ENV HOST 0.0.0.0

CMD ["/bin/sh"]
