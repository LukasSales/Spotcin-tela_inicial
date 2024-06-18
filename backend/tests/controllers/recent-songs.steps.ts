import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import MusicRepository from '../../src/repositories/music.repository';
import Music from '../../src/models/music.model';

const feature = loadFeature('tests/features/recent-songs.feature');
const request = supertest(app);

defineFeature(feature, (test) => {
  let mockMusicRepository: jest.Mocked<MusicRepository>;
  let response: supertest.Response;

  beforeEach(() => {
    mockMusicRepository = new MusicRepository() as jest.Mocked<MusicRepository>;
    jest.spyOn(MusicRepository.prototype, 'getRecentMusics').mockResolvedValue([
      new Music({ id: '1', name: 'Song 1', artist: 'Artist 1', genre: 'Genre 1' }),
      new Music({ id: '2', name: 'Song 2', artist: 'Artist 2', genre: 'Genre 2' }),
      new Music({ id: '3', name: 'Song 3', artist: 'Artist 3', genre: 'Genre 3' }),
      new Music({ id: '4', name: 'Song 4', artist: 'Artist 4', genre: 'Genre 4' }),
      new Music({ id: '5', name: 'Song 5', artist: 'Artist 5', genre: 'Genre 5' }),
    ]);
  });

  test('Ver as 5 músicas escutadas recentemente', ({ given, when, then, and }) => {
    given(/^que o usuário está logado$/, async () => {
      // Código para simular usuário logado
    });

    when(/^uma requisição GET for enviada para "(.*)"$/, async (url) => {
      response = await request.get(url);
    });

    then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
      expect(response.status).toBe(parseInt(statusCode, 10));
    });

    and(/^o JSON da resposta deve conter uma lista de 5 músicas$/, () => {
      expect(response.body.data).toHaveLength(5);
      expect(response.body.data).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: '1', name: 'Song 1', artist: 'Artist 1', genre: 'Genre 1' }),
          expect.objectContaining({ id: '2', name: 'Song 2', artist: 'Artist 2', genre: 'Genre 2' }),
          expect.objectContaining({ id: '3', name: 'Song 3', artist: 'Artist 3', genre: 'Genre 3' }),
          expect.objectContaining({ id: '4', name: 'Song 4', artist: 'Artist 4', genre: 'Genre 4' }),
          expect.objectContaining({ id: '5', name: 'Song 5', artist: 'Artist 5', genre: 'Genre 5' }),
        ])
      );
    });
  });
});
