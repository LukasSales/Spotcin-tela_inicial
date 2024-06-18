import MusicModel from '../models/music.model';
import BaseRepository from './base.repository';
import { InternalServerError, NotFoundError } from '../utils/errors/http.error';

class MusicRepository extends BaseRepository<MusicModel> {
    constructor() {
        super('musics');
    }

    public async getAllMusics(): Promise<MusicModel[]> {
        try {
            return await this.findAll();
        } catch (error) {
            throw new InternalServerError({ msg: 'Erro ao buscar todas as músicas' });
        }
    }

    public async getMusicById(id: string): Promise<MusicModel | undefined> {
        try {
            const music = await this.findOne((music) => music.id === id);
            if (!music) {
                throw new NotFoundError({ msg: 'Música não encontrada', msgCode: 'music_not_found' });
            }
            return music;
        } catch (error) {
            throw new InternalServerError({ msg: 'Erro ao buscar música por ID' });
        }
    }

    public async createMusic(newMusicData: Partial<MusicModel>): Promise<MusicModel | undefined> {
        try {
            const { name, artist, genre } = newMusicData;
            if (!name || !artist || !genre) {
                throw new Error('Campos obrigatórios (name, artist, genre) não foram fornecidos corretamente');
            }

            const newMusic = await this.add(new MusicModel({
                id: '',  // Lógica para gerar um novo ID aqui
                name,
                artist,
                genre,
            }));
            return newMusic;
        } catch (error) {
            throw new InternalServerError({ msg: 'Erro ao criar nova música' });
        }
    }

    public async updateMusicById(id: string, updatedMusicData: Partial<MusicModel>): Promise<MusicModel | undefined> {
        try {
            const music = await this.findOne((music) => music.id === id);
            if (!music) {
                throw new NotFoundError({ msg: 'Música não encontrada para atualização', msgCode: 'music_not_found' });
            }
            const updatedMusic = await this.update(
                (item) => item.id === id,
                updatedMusicData
            );
            return updatedMusic || undefined;
        } catch (error) {
            throw new InternalServerError({ msg: 'Erro ao atualizar música por ID' });
        }
    }

    public async deleteMusicById(id: string): Promise<void> {
        try {
            await this.delete((music) => music.id === id);
        } catch (error) {
            throw new InternalServerError({ msg: 'Erro ao deletar música por ID' });
        }
    }
}

export default MusicRepository;