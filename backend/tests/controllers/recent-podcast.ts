import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { di } from '../../src/di';
import PodcastRepository from '../../src/repositories/podcast.repository';
import PodcastEntity from '../../src/entities/podcastEntity';

const feature = loadFeature('tests/features/recent-podcasts.feature');
const request = supertest(app);

defineFeature(feature, (test) => {
  let mockPodcastRepository: PodcastRepository;
  let response: supertest.Response;

  beforeEach(() => {
    mockPodcastRepository = di.getRepository<PodcastRepository>(PodcastRepository);
  });

  test('Ver os 5 podcasts escutados recentemente', ({ given, when, then, and }) => {
    given(/^que o usuário está logado$/, async () => {});

    when(/^uma requisição GET for enviada para "(.*)"$/, async (url) => {
      response = await request.get(url);
    });

    then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
      expect(response.status).toBe(parseInt(statusCode, 10));
    });

    and(/^o JSON da resposta deve conter uma lista de 5 podcasts$/, () => {
      expect(response.body.data).toHaveLength(5);
    });
  });
});
