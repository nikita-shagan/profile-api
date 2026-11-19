import assert from 'node:assert/strict';
import test from 'node:test';

const url = process.env.PROFILE_URL ?? 'http://localhost:3000/graphql';

test('the card returns its nested data in one GraphQL operation', async () => {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ query: `{ profile {
      name description skills links { name url } projects { name url }
      experience { company role period { from to current } achievements }
    } }` }),
  });
  assert.equal(res.status, 200);
  const { data, errors } = await res.json();
  assert.equal(errors, undefined);
  const card = data.profile;
  assert.equal(card.name, 'Никита Шаган');
  assert.ok(card.description && card.skills.includes('TypeScript'));
  assert.ok(card.links.some(link => link.url === 'https://github.com/nikita-shagan'));
  assert.ok(card.projects.some(project => project.name === 'Listy'));
  assert.ok(card.experience.some(job => job.period.current && job.period.to === null));
  assert.ok(card.experience.some(job => job.company === 'Listy' && !job.period.current && job.achievements.length));
});

test('GET /graphql serves the embedded Apollo Sandbox', async () => {
  const res = await fetch(url, { headers: { accept: 'text/html' } });
  assert.equal(res.status, 200);
  assert.match(await res.text(), /embeddable-sandbox/i);
});
