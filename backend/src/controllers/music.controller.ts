import { Router, Request, Response } from 'express';
import { Result, SuccessResult } from '../utils/result';
import MusicService from '../services/music.service';
import { InternalServerError } from '../utils/errors/http.error';

class MusicController {
    private prefix: string = '/musics';
    public router: Router;
    private musicService: MusicService;

    constructor(router: Router, musicService: MusicService) {
        this.router = router;
        this.musicService = musicService;
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get(`${this.prefix}/recommended`, (req: Request, res: Response) =>
            this.getRecommendedMusics(req, res)
        );

        this.router.get(`${this.prefix}/recent`, (req: Request, res: Response) =>
            this.getRecentlyPlayedMusics(req, res)
        );

        this.router.get(`${this.prefix}/:id`, (req: Request, res: Response) =>
            this.getMusicById(req, res)
        );

        // Adicione outras rotas conforme necessário para CRUD de músicas
    }

    public async getRecommendedMusics(req: Request, res: Response) {
        try {
            const userId = ''; // Pode vir do req.params ou req.user, dependendo da sua implementação
            const recommendedMusics = await this.musicService.getSuggestedMusics(userId);

            return new SuccessResult({
                msg: Result.transformRequestOnMsg(req),
                data: recommendedMusics,
            }).handle(res);
        } catch (error) {
            if (error instanceof InternalServerError) {
                return res.status(error.status).json({ msg: error.msg, msgCode: error.msgCode });
            }
            return res.status(500).json({ msg: 'Erro ao obter músicas recomendadas' });
        }
    }

    public async getRecentlyPlayedMusics(req: Request, res: Response) {
        try {
            const userId = ''; // Pode vir do req.params ou req.user, dependendo da sua implementação
            const recentlyPlayedMusics = await this.musicService.getRecentMusics(userId);

            return new SuccessResult({
                msg: Result.transformRequestOnMsg(req),
                data: recentlyPlayedMusics,
            }).handle(res);
        } catch (error) {
            if (error instanceof InternalServerError) {
                return res.status(error.status).json({ msg: error.msg, msgCode: error.msgCode });
            }
            return res.status(500).json({ msg: 'Erro ao obter músicas tocadas recentemente' });
        }
    }

    public async getMusicById(req: Request, res: Response) {
        try {
            const music = await this.musicService.getMusicById(req.params.id);

            return new SuccessResult({
                msg: Result.transformRequestOnMsg(req),
                data: music,
            }).handle(res);
        } catch (error) {
            if (error instanceof InternalServerError) {
                return res.status(error.status).json({ msg: error.msg, msgCode: error.msgCode });
            }
            return res.status(500).json({ msg: 'Erro ao buscar música por ID' });
        }
    }
}

export default MusicController;
