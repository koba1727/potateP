# potateP
temporary project name "potate"

# Development

## Backend
```
$ cd backend
```

Docker ビルド（初回、Dockerfile 更新時のみ）
```
$ docker-compose build
```

コンテナ起動
```
$ docker-compose up -d
```

確認
```
$ docker-compose ps
Name              Command             State                  Ports
-----------------------------------------------------------------------
go      /bin/sh                       Up
gocli   /bin/bash                     Exit 0
mysql   docker-entrypoint.sh mysqld   Up       0.0.0.0:3306->3306/tcp, 33060/tcp
nginx   nginx -g daemon off;          Up       0.0.0.0:80->80/tcp
```

### memo
環境構築がまだ済んでいない。とりあえず go の開発は以下の手順

1. go コンテナに突入
```
$ docker-compose exec go /bin/bash
```
2. /app/src に移動（ローカルの `backend` がコンテナの `app` にマウントされてる）
```
bash-5.0# cd /app/src/
```

