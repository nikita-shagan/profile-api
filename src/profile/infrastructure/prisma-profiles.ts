import { PrismaClient } from '@prisma/client';
import { ProfileRepository } from '../application/get-profile';
import { Period, type Profile } from '../domain/profile';

const byId = { id: 'asc' } as const;
const links = { select: { name: true, url: true }, orderBy: byId };

export class PrismaProfiles extends ProfileRepository {
  constructor(private readonly db: PrismaClient) { super(); }

  async get(): Promise<Profile> {
    const card = await this.db.profile.findUniqueOrThrow({
      where: { id: 1 },
      select: {
        name: true, description: true, links, projects: links,
        skills: { select: { name: true }, orderBy: byId },
        experience: {
          orderBy: [{ startMonth: 'desc' }, byId],
          select: {
            company: true, role: true, startMonth: true, endMonth: true,
            achievements: { select: { text: true }, orderBy: byId },
          },
        },
      },
    });
    return {
      ...card,
      skills: card.skills.map(skill => skill.name),
      experience: card.experience.map(job => ({
        company: job.company, role: job.role,
        period: new Period(job.startMonth, job.endMonth),
        achievements: job.achievements.map(item => item.text),
      })),
    };
  }

  onModuleDestroy() {
    return this.db.$disconnect();
  }
}
