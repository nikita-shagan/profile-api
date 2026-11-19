# Profile API

`docker compose up --build` → [Apollo Sandbox](http://localhost:3000/graphql).
При старте Prisma создаёт SQLite и применяет миграции с данными. Повторный запуск не дублирует записи.

```graphql
{
  profile {
    name description skills
    links { name url }
    experience { company role period { from to current } achievements }
    projects { name url }
  }
}
```

Один домен: профессиональный профиль. Resolver вызывает `GetProfile`; репозиторий и Data Mapper по Фаулеру изолируют домен от Prisma. Вложенные связи читаются пакетно: число SQL-запросов не растёт с числом мест работы, отдельный DataLoader не нужен.

Локально (Node.js 22.12+): `npm ci && npm run build && npm start`. В другом терминале: `npm run smoke`. Линтер: `npm run lint`.
