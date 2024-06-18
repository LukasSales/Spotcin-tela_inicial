import PlaylistEntity from '../entities/playlistEntity';
import BaseRepository from './base.repository';
import { InternalServerError, NotFoundError } from '../utils/errors/http.error';

class PlaylistRepository extends BaseRepository<PlaylistEntity> {
    constructor() {
        super('playlists');
    }

    public async getAllPlaylists(): Promise<PlaylistEntity[]> {
        try {
            return await this.findAll();
        } catch (error) {
            throw new InternalServerError({ msg: 'Erro ao buscar todas as playlists' });
        }
    }

    public async getPlaylistById(id: string): Promise<PlaylistEntity | undefined> {
        try {
            const playlist = await this.findOne((playlist) => playlist.id === id);
            if (!playlist) {
                throw new NotFoundError({ msg: 'Playlist não encontrada', msgCode: 'playlist_not_found' });
            }
            return playlist;
        } catch (error) {
            throw new InternalServerError({ msg: 'Erro ao buscar playlist por ID' });
        }
    }

    public async createPlaylist(newPlaylistData: Partial<PlaylistEntity>): Promise<PlaylistEntity | undefined> {
        try {
            const newPlaylist = await this.add(new PlaylistEntity(newPlaylistData));
            return newPlaylist;
        } catch (error) {
            throw new InternalServerError({ msg: 'Erro ao criar nova playlist' });
        }
    }

    public async updatePlaylistById(id: string, updatedPlaylistData: Partial<PlaylistEntity>): Promise<PlaylistEntity | undefined> {
        try {
            const playlist = await this.getPlaylistById(id);
            if (!playlist) {
                throw new NotFoundError({ msg: 'Playlist não encontrada para atualização', msgCode: 'playlist_not_found' });
            }
            
            const updatedPlaylist = await this.update(
                (item) => item.id === id,
                updatedPlaylistData
            );

            if (!updatedPlaylist) {
                return undefined;
            }

            return updatedPlaylist;
        } catch (error) {
            throw new InternalServerError({ msg: 'Erro ao atualizar playlist por ID' });
        }
    }

    public async deletePlaylistById(id: string): Promise<void> {
        try {
            await this.delete((playlist) => playlist.id === id);
        } catch (error) {
            throw new InternalServerError({ msg: 'Erro ao deletar playlist por ID' });
        }
    }
}

export default PlaylistRepository;