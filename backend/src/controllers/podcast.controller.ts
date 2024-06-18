import { Router, Request, Response } from 'express';
import { Result, SuccessResult } from '../utils/result';
import PodcastService from '../services/podcast.service';
import { InternalServerError } from '../utils/errors/http.error';
import PodcastEntity from '../entities/podcastEntity'; 

class PodcastController {
    private prefix: string = '/podcasts';
    public router: Router;
    private podcastService: PodcastService;

    constructor(router: Router, podcastService: PodcastService) {
        this.router = router;
        this.podcastService = podcastService;
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get(this.prefix, (req: Request, res: Response) =>
            this.getRecentlyListenedPodcasts(req, res)
        );

        this.router.get(`${this.prefix}/:id`, (req: Request, res: Response) =>
            this.getPodcastById(req, res)
        );

        // Adicione outras rotas conforme necessário para CRUD de podcasts
    }

    public async getRecentlyListenedPodcasts(req: Request, res: Response) {
        try {
            const userId = ''; // Pode vir do req.params ou req.user, dependendo da sua implementação
            const recentlyListenedPodcasts = await this.podcastService.getRecentPodcasts(userId);

            return new SuccessResult({
                msg: Result.transformRequestOnMsg(req),
                data: recentlyListenedPodcasts,
            }).handle(res);
        } catch (error) {
            if (error instanceof InternalServerError) {
                return res.status(error.status).json({ msg: error.msg, msgCode: error.msgCode });
            }
            return res.status(500).json({ msg: 'Erro ao obter podcasts escutados recentemente' });
        }
    }

    public async getPodcastById(req: Request, res: Response) {
        try {
            const podcast = await this.podcastService.getPodcastById(req.params.id);

            return new SuccessResult({
                msg: Result.transformRequestOnMsg(req),
                data: podcast,
            }).handle(res);
        } catch (error) {
            if (error instanceof InternalServerError) {
                return res.status(error.status).json({ msg: error.msg, msgCode: error.msgCode });
            }
            return res.status(500).json({ msg: 'Erro ao buscar podcast por ID' });
        }
    }

}

export default PodcastController;
