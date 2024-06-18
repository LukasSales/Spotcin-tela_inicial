import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { di } from '../../src/di';
import MusicRepository from '../../src/repositories/music.repository';
import MusicEntity from '../../src/entities/musicEntity';

const feature = loadFeature('tests/features/recommended-songs.feature');
const request = supertest(app);

defineFeature(feature, (test) => {
  let mockMusicRepository: MusicRepository;
  let response: supertest.Response;
  let mockMusics: MusicEntity[];

  beforeEach(() => {
    mockMusicRepository = di.getRepository<MusicRepository>(MusicRepository);
    mockMusics = [
      new MusicEntity({ id: '1', name: 'Song 1', artist: 'Artist 1' }),
      new MusicEntity({ id: '2', name: 'Song 2', artist: 'Artist 2' }),
      new MusicEntity({ id: '3', name: 'Song 3', artist: 'Artist 3' }),
      new MusicEntity({ id: '4', name: 'Song 4', artist: 'Artist 4' }),
      new MusicEntity({ id: '5', name: 'Song 5', artist: 'Artist 5' }),
    ];
    jest.spyOn(mockMusicRepository, 'getRecommendedMusics').mockResolvedValue(mockMusics);
  });

  test('Ver as 5 músicas recomendadas', ({ given, when, then, and }) => {
    given(/^que o usuário está logado$/, async () => {});

    when(/^uma requisição GET for enviada para "(.*)"$/, async (url) => {
      response = await request.get(url);
    });

    then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
      expect(response.status).toBe(parseInt(statusCode, 10));
    });

    and(/^o JSON da resposta deve conter uma lista de 5 músicas$/, () => {
      expect(response.body.data).toHaveLength(5);
      expect(response.body.data).toEqual(expect.arrayContaining(mockMusics));
    });
  });
});
