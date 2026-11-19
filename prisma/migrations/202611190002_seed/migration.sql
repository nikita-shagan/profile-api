INSERT INTO "Profile" ("id", "name", "description") VALUES
  (1, 'Никита Шаган', 'Full-stack разработчик. Делаю личные кабинеты и веб-приложения на TypeScript и Laravel.');

INSERT INTO "ProfileLink" ("id", "profileId", "name", "url") VALUES
  (1, 1, 'GitHub', 'https://github.com/nikita-shagan'),
  (2, 1, 'Портфолио', 'https://shagan.ru');

INSERT INTO "Skill" ("id", "profileId", "name") VALUES
  (1, 1, 'TypeScript'), (2, 1, 'React'), (3, 1, 'PHP'), (4, 1, 'Laravel'), (5, 1, 'PostgreSQL');

INSERT INTO "Experience" ("id", "profileId", "company", "role", "startMonth", "endMonth") VALUES
  (1, 1, 'Микрокредитная компания', 'Laravel-разработчик', '2026-09', NULL),
  (2, 1, 'Listy', 'Frontend-разработчик', '2024-03', '2026-07');

INSERT INTO "Achievement" ("id", "experienceId", "text") VALUES
  (1, 1, 'Разрабатываю CRM и личный кабинет клиента.'),
  (2, 2, 'Добавил голосовой ввод продуктов в список покупок.'),
  (3, 2, 'Реализовал офлайн-работу списка через IndexedDB.');

INSERT INTO "Project" ("id", "profileId", "name", "url") VALUES
  (1, 1, 'Listy', 'https://listy-app.com'),
  (2, 1, 'Shagan Web', 'https://shagan.ru');
