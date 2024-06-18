// services/playlist.service.ts
import PlaylistRepository from '../repositories/playlist.repository';
import PlaylistModel from '../models/playlist.model';
import { NotFoundError, InternalServerError } from '../utils/errors/http.error';

class PlaylistServiceMessageCode {
    public static readonly playlist_not_found = 'playlist_not_found';
    public static readonly playlist_update_error = 'playlist_update_error';
    public static readonly playlist_creation_error = 'playlist_creation_error';
}

class PlaylistService {
    private playlistRepository: PlaylistRepository;

    constructor(playlistRepository: PlaylistRepository) {
        this.playlistRepository = playlistRepository;
    }

    public async getAllPlaylists(): Promise<PlaylistModel[]> {
        const playlistsEntity = await this.playlistRepository.getAllPlaylists();

        if (!playlistsEntity || playlistsEntity.length === 0) {
            throw new NotFoundError({
                msg: 'No playlists found',
                msgCode: PlaylistServiceMessageCode.playlist_not_found,
            });
        }

        const playlistsModel = playlistsEntity.map((playlist) => new PlaylistModel(playlist));

        return playlistsModel;
    }

    public async getPlaylistById(id: string): Promise<PlaylistModel> {
        const playlistEntity = await this.playlistRepository.getPlaylistById(id);

        if (!playlistEntity) {
            throw new NotFoundError({
                msg: 'Playlist id not found',
                msgCode: PlaylistServiceMessageCode.playlist_not_found,
            });
        }

        const playlistModel = new PlaylistModel(playlistEntity);

        return playlistModel;
    }

    public async createPlaylist(data: Partial<PlaylistModel>): Promise<PlaylistModel> {
        const playlistEntity = await this.playlistRepository.createPlaylist(data);

        if (!playlistEntity) {
            throw new InternalServerError({
                msg: 'Playlist could not be created',
                msgCode: PlaylistServiceMessageCode.playlist_creation_error,
            });
        }

        const playlistModel = new PlaylistModel(playlistEntity);

        return playlistModel;
    }

    public async updatePlaylistById(id: string, data: Partial<PlaylistModel>): Promise<PlaylistModel> {
        const playlistEntity = await this.playlistRepository.updatePlaylistById(id, data);

        if (!playlistEntity) {
            throw new NotFoundError({
                msg: 'Playlist update by id error',
                msgCode: PlaylistServiceMessageCode.playlist_update_error,
            });
        }

        const playlistModel = new PlaylistModel(playlistEntity);

        return playlistModel;
    }

    public async deletePlaylistById(id: string): Promise<void> {
        await this.playlistRepository.deletePlaylistById(id);
    }

// Algoritmo para buscar playlists aleatórias do usuário
public async getUserPlaylists(userId: string): Promise<PlaylistModel[]> {
  const allPlaylists = await this.playlistRepository.getAllPlaylists();

  if (!allPlaylists || allPlaylists.length === 0) {
      throw new NotFoundError({
          msg: 'No playlists found',
          msgCode: PlaylistServiceMessageCode.playlist_not_found,
      });
  }

  const userPlaylists = this.getRandomPlaylists(allPlaylists, 5);

  return userPlaylists;
}

// Função auxiliar para selecionar playlists aleatórias
private getRandomPlaylists(playlists: PlaylistModel[], count: number): PlaylistModel[] {
  const shuffled = playlists.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
}

export default PlaylistService;