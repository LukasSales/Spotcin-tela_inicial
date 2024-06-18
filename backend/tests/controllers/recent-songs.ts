import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { di } from '../../src/di';
import MusicRepository from '../../src/repositories/music.repository';
import MusicEntity from '../../src/entities/musicEntity';

const feature = loadFeature('tests/features/recent-songs.feature');
const request = supertest(app);

defineFeature(feature, (test) => {
  let mockMusicRepository: MusicRepository;
  let response: supertest.Response;

  beforeEach(() => {
    mockMusicRepository = di.getRepository<MusicRepository>(MusicRepository);
  });

  test('Ver as 5 músicas escutadas recentemente', ({ given, when, then, and }) => {
    given(/^que o usuário está logado$/, async () => {});

    when(/^uma requisição GET for enviada para "(.*)"$/, async (url) => {
      response = await request.get(url);
    });

    then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
      expect(response.status).toBe(parseInt(statusCode, 10));
    });

    and(/^o JSON da resposta deve conter uma lista de 5 músicas$/, () => {
      expect(response.body.data).toHaveLength(5);
    });
  });
});
