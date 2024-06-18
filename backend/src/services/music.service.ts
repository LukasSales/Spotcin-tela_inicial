// services/music.service.ts
import MusicRepository from '../repositories/music.repository';
import MusicModel from '../models/music.model';
import { NotFoundError, InternalServerError } from '../utils/errors/http.error';

class MusicServiceMessageCode {
    public static readonly music_not_found = 'music_not_found';
    public static readonly music_update_error = 'music_update_error';
    public static readonly music_creation_error = 'music_creation_error';
}

class MusicService {
    private musicRepository: MusicRepository;

    constructor(musicRepository: MusicRepository) {
        this.musicRepository = musicRepository;
    }

    public async getAllMusics(): Promise<MusicModel[]> {
        const musicsEntity = await this.musicRepository.getAllMusics();

        if (!musicsEntity || musicsEntity.length === 0) {
            throw new NotFoundError({
                msg: 'No musics found',
                msgCode: MusicServiceMessageCode.music_not_found,
            });
        }

        const musicsModel = musicsEntity.map((music) => new MusicModel(music));

        return musicsModel;
    }

    public async getMusicById(id: string): Promise<MusicModel> {
        const musicEntity = await this.musicRepository.getMusicById(id);

        if (!musicEntity) {
            throw new NotFoundError({
                msg: 'Music id not found',
                msgCode: MusicServiceMessageCode.music_not_found,
            });
        }

        const musicModel = new MusicModel(musicEntity);

        return musicModel;
    }

    public async createMusic(data: Partial<MusicModel>): Promise<MusicModel> {
        const musicEntity = await this.musicRepository.createMusic(data);

        if (!musicEntity) {
            throw new InternalServerError({
                msg: 'Music could not be created',
                msgCode: MusicServiceMessageCode.music_creation_error,
            });
        }

        const musicModel = new MusicModel(musicEntity);

        return musicModel;
    }

    public async updateMusicById(id: string, data: Partial<MusicModel>): Promise<MusicModel> {
        const musicEntity = await this.musicRepository.updateMusicById(id, data);

        if (!musicEntity) {
            throw new NotFoundError({
                msg: 'Music update by id error',
                msgCode: MusicServiceMessageCode.music_update_error,
            });
        }

        const musicModel = new MusicModel(musicEntity);

        return musicModel;
    }

    public async deleteMusicById(id: string): Promise<void> {
        await this.musicRepository.deleteMusicById(id);
    }

    // Algoritmo para buscar músicas sugeridas
    public async getSuggestedMusics(userId: string): Promise<MusicModel[]> {
      const allMusics = await this.musicRepository.getAllMusics();

      // Exemplo de preferência do usuário
      const userPreferences = {
          genres: ['rock', 'pop'], // gêneros preferidos pelo usuário
          artists: ['Artist1', 'Artist2'] // artistas preferidos pelo usuário
      };

      // Ordena músicas com base em 2x o peso para gêneros e 1x o peso para artistas
      const scoredMusics = allMusics.map(music => {
          let score = 0;
          if (userPreferences.genres.includes(music.genre)) score += 2;
          if (userPreferences.artists.includes(music.artist)) score += 1;
          return { music, score };
      });

      scoredMusics.sort((a, b) => b.score - a.score);

      const suggestedMusics = scoredMusics.slice(0, 5).map(entry => entry.music);

      return suggestedMusics;
  }

  // Algoritmo para buscar as 5 últimas músicas ouvidas
  public async getRecentMusics(userId: string): Promise<MusicModel[]> {
      const allMusics = await this.musicRepository.getAllMusics();
      const recentMusics = allMusics.slice(-5).reverse(); // Pega as últimas 5 músicas
      return recentMusics;
  }
}

export default MusicService;
