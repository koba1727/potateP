# potateP
temporary project name "potate"

## Getting Started
```
$ cd /path/to/dir
```

Docker ビルド（初回、Dockerfile 更新時のみ）
```
$ docker-compose build
```

コンテナ起動
```
$ docker-compose up
```

確認
```
$ docker-compose ps
   Name                  Command               State                  Ports
-----------------------------------------------------------------------------------------
go            bash -c cd /app && realize ...   Up       0.0.0.0:3000->3000/tcp
gocli         /bin/bash                        Exit 0
mysql         docker-entrypoint.sh mysqld      Up       0.0.0.0:3306->3306/tcp, 33060/tcp
nginx_back    nginx -g daemon off;             Up       0.0.0.0:8080->80/tcp
nginx_front   nginx -g daemon off;             Up       0.0.0.0:80->80/tcp
node          docker-entrypoint.sh /bin/sh     Up
yarn          yarn -v                          Exit 0
```

## Development
env のコピーを作成し、各自設定すること
```
$ copy ./frontend/.env_template ./frontend/.env
```

フロントエンド用: パッケージインストール
```
$ docker-compose run --rm yarn install
```

フロントエンド用: ビルド
```
$ docker-compose run --rm yarn start
or
$ docker-compsoe run --rm yarn build
```

## Others
yarn コマンドを使いたいとき（例）
```
$ docker-compose run --rm yarn version
yarn version v1.19.1
info Current version: 0.1.0
```

go コマンドを使いたいとき（例）
```
$ docker-compose run --rm gocli go version
go version go1.13.3 linux/amd64
```

