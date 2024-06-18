// services/podcast.service.ts
import PodcastRepository from '../repositories/podcast.repository';
import PodcastModel from '../models/podcast.model';
import { NotFoundError, InternalServerError } from '../utils/errors/http.error';

class PodcastServiceMessageCode {
    public static readonly podcast_not_found = 'podcast_not_found';
    public static readonly podcast_update_error = 'podcast_update_error';
    public static readonly podcast_creation_error = 'podcast_creation_error';
}

class PodcastService {
    private podcastRepository: PodcastRepository;

    constructor(podcastRepository: PodcastRepository) {
        this.podcastRepository = podcastRepository;
    }

    public async getAllPodcasts(): Promise<PodcastModel[]> {
        const podcastsEntity = await this.podcastRepository.getAllPodcasts();

        if (!podcastsEntity || podcastsEntity.length === 0) {
            throw new NotFoundError({
                msg: 'No podcasts found',
                msgCode: PodcastServiceMessageCode.podcast_not_found,
            });
        }

        const podcastsModel = podcastsEntity.map((podcast) => new PodcastModel(podcast));

        return podcastsModel;
    }

    public async getPodcastById(id: string): Promise<PodcastModel> {
        const podcastEntity = await this.podcastRepository.getPodcastById(id);

        if (!podcastEntity) {
            throw new NotFoundError({
                msg: 'Podcast id not found',
                msgCode: PodcastServiceMessageCode.podcast_not_found,
            });
        }

        const podcastModel = new PodcastModel(podcastEntity);

        return podcastModel;
    }

    public async createPodcast(data: Partial<PodcastModel>): Promise<PodcastModel> {
        const podcastEntity = await this.podcastRepository.createPodcast(data);

        if (!podcastEntity) {
            throw new InternalServerError({
                msg: 'Podcast could not be created',
                msgCode: PodcastServiceMessageCode.podcast_creation_error,
            });
        }

        const podcastModel = new PodcastModel(podcastEntity);

        return podcastModel;
    }

    public async updatePodcastById(id: string, data: Partial<PodcastModel>): Promise<PodcastModel> {
        const podcastEntity = await this.podcastRepository.updatePodcastById(id, data);

        if (!podcastEntity) {
            throw new NotFoundError({
                msg: 'Podcast update by id error',
                msgCode: PodcastServiceMessageCode.podcast_update_error,
            });
        }

        const podcastModel = new PodcastModel(podcastEntity);

        return podcastModel;
    }

    public async deletePodcastById(id: string): Promise<void> {
        await this.podcastRepository.deletePodcastById(id);
    }

    // Algoritmo para buscar os 5 últimos podcasts ouvidos
    public async getRecentPodcasts(userId: string): Promise<PodcastModel[]> {
        const allPodcasts = await this.podcastRepository.getAllPodcasts();
        const recentPodcasts = allPodcasts.slice(-5).reverse(); // Pega os últimos 5 podcasts
        return recentPodcasts;
    }
}

export default PodcastService;
