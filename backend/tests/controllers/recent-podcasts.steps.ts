import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import PodcastRepository from '../../src/repositories/podcast.repository';
import Podcast from '../../src/models/podcast.model';

const feature = loadFeature('tests/features/recent-podcasts.feature');
const request = supertest(app);

defineFeature(feature, (test) => {
  let mockPodcastRepository: jest.Mocked<PodcastRepository>;
  let response: supertest.Response;

  beforeEach(() => {
    mockPodcastRepository = new PodcastRepository() as jest.Mocked<PodcastRepository>;
    jest.spyOn(PodcastRepository.prototype, 'getRecentPodcasts').mockResolvedValue([
      new Podcast({ id: '1', title: 'Podcast 1', description: 'Description 1', categories: ['Category 1'] }),
      new Podcast({ id: '2', title: 'Podcast 2', description: 'Description 2', categories: ['Category 2'] }),
      new Podcast({ id: '3', title: 'Podcast 3', description: 'Description 3', categories: ['Category 3'] }),
      new Podcast({ id: '4', title: 'Podcast 4', description: 'Description 4', categories: ['Category 4'] }),
      new Podcast({ id: '5', title: 'Podcast 5', description: 'Description 5', categories: ['Category 5'] }),
    ]);
  });

  test('Ver os 5 podcasts escutados recentemente', ({ given, when, then, and }) => {
    given(/^que o usuário está logado$/, async () => {
      // Código para simular usuário logado
    });

    when(/^uma requisição GET for enviada para "(.*)"$/, async (url) => {
      response = await request.get(url);
    });

    then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
      expect(response.status).toBe(parseInt(statusCode, 10));
    });

    and(/^o JSON da resposta deve conter uma lista de 5 podcasts$/, () => {
      expect(response.body.data).toHaveLength(5);
      expect(response.body.data).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: '1', title: 'Podcast 1', description: 'Description 1', categories: ['Category 1'] }),
          expect.objectContaining({ id: '2', title: 'Podcast 2', description: 'Description 2', categories: ['Category 2'] }),
          expect.objectContaining({ id: '3', title: 'Podcast 3', description: 'Description 3', categories: ['Category 3'] }),
          expect.objectContaining({ id: '4', title: 'Podcast 4', description: 'Description 4', categories: ['Category 4'] }),
          expect.objectContaining({ id: '5', title: 'Podcast 5', description: 'Description 5', categories: ['Category 5'] }),
        ])
      );
    });
  });
});
