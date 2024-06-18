import PodcastModel from '../models/podcast.model';
import BaseRepository from './base.repository';
import { InternalServerError, NotFoundError } from '../utils/errors/http.error';

class PodcastRepository extends BaseRepository<PodcastModel> {
    constructor() {
        super('podcasts');
    }

    public async getAllPodcasts(): Promise<PodcastModel[]> {
        try {
            return await this.findAll();
        } catch (error) {
            throw new InternalServerError({ msg: 'Erro ao buscar todos os podcasts' });
        }
    }

    public async getPodcastById(id: string): Promise<PodcastModel | undefined> {
        try {
            const podcast = await this.findOne((podcast) => podcast.id === id);
            if (!podcast) {
                throw new NotFoundError({ msg: 'Podcast não encontrado', msgCode: 'podcast_not_found' });
            }
            return podcast;
        } catch (error) {
            throw new InternalServerError({ msg: 'Erro ao buscar podcast por ID' });
        }
    }

    public async createPodcast(newPodcastData: Partial<PodcastModel>): Promise<PodcastModel | undefined> {
        try {
            const { title, description, categories } = newPodcastData;
            if (!title || !description || !categories) {
                throw new Error('Campos obrigatórios (title, description, categories) não foram fornecidos corretamente');
            }

            const newPodcast = await this.add(new PodcastModel({
                id: '',  // Lógica para gerar um novo ID aqui
                title,
                description,
                categories,
            }));
            return newPodcast;
        } catch (error) {
            throw new InternalServerError({ msg: 'Erro ao criar novo podcast' });
        }
    }

    public async updatePodcastById(id: string, updatedPodcastData: Partial<PodcastModel>): Promise<PodcastModel | undefined> {
        try {
            const podcast = await this.findOne((podcast) => podcast.id === id);
            if (!podcast) {
                throw new NotFoundError({ msg: 'Podcast não encontrado para atualização', msgCode: 'podcast_not_found' });
            }
            const updatedPodcast = await this.update(
                (item) => item.id === id,
                updatedPodcastData
            );
            return updatedPodcast || undefined;
        } catch (error) {
            throw new InternalServerError({ msg: 'Erro ao atualizar podcast por ID' });
        }
    }

    public async deletePodcastById(id: string): Promise<void> {
        try {
            await this.delete((podcast) => podcast.id === id);
        } catch (error) {
            throw new InternalServerError({ msg: 'Erro ao deletar podcast por ID' });
        }
    }
}

export default PodcastRepository;