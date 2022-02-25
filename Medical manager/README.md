# Gestor médico

## Comandos para rodar o projeto
```
Clone o repositório usando esse comando
$ git clone https://github.com/LeonardoZanotti/nodejs-files.git

Entrar na pasta do projeto
$ cd nodejs-files/Medical\ manager

Instalar dependências
$ npm install

Setar banco de dados
$ npm run database

Rodar o projeto
$ npm run dev
```

## Comandos sequelize
```
Criar banco de dados
$ npx sequelize db:create

Criar uma migration
$ npx sequelize migration:create --name=nome-da-migration

Rodar migrations
$ npx sequelize db:migrate

Desfazer última migração
$ npx sequelize db:migrate:undo

Desfazer todas as migrações
$ npx sequelize db:migrate:undo:all

Desfazer migração específica
$ npx sequelize db:migrate:undo:all --to MIGRATION_NAME

Criar um seeder
$ npx sequelize seed:create --name nome-do-seeder

Rodar um seeder específico
$ npx sequelize db:seed --seed SEEDER_NAME

Rodar todos os seeders
$ npx sequelize db:seed:all

Desfazer a última semeação
$ npx sequelize db:seed:undo

Desfazer todos as semeações
$ npx sequelize db:seed:undo:all

Desfazer semeação específica
$ npx sequelize db:seed:undo --seed SEEDER_NAME
```