import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { di } from '../../src/di';
import PlaylistRepository from '../../src/repositories/playlist.repository';
import PlaylistEntity from '../../src/entities/playlistEntity';

const feature = loadFeature('tests/features/random-playlists.feature');
const request = supertest(app);

defineFeature(feature, (test) => {
  let mockPlaylistRepository: PlaylistRepository;
  let response: supertest.Response;

  beforeEach(() => {
    mockPlaylistRepository = di.getRepository<PlaylistRepository>(PlaylistRepository);
  });

  test('Ver as 5 playlists aleatórias do usuário', ({ given, when, then, and }) => {
    given(/^que o usuário está logado$/, async () => {});

    when(/^uma requisição GET for enviada para "(.*)"$/, async (url) => {
      response = await request.get(url);
    });

    then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
      expect(response.status).toBe(parseInt(statusCode, 10));
    });

    and(/^o JSON da resposta deve conter uma lista de 5 playlists$/, () => {
      expect(response.body.data).toHaveLength(5);
    });
  });
});
