import { Router, Request, Response } from 'express';
import { Result, SuccessResult } from '../utils/result';
import PlaylistService from '../services/playlist.service';
import { InternalServerError } from '../utils/errors/http.error';

class PlaylistController {
    private prefix: string = '/playlists';
    public router: Router;
    private playlistService: PlaylistService;

    constructor(router: Router, playlistService: PlaylistService) {
        this.router = router;
        this.playlistService = playlistService;
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get(`${this.prefix}/recent`, (req: Request, res: Response) =>
            this.getRecentlyListenedPlaylists(req, res)
        );

        this.router.get(`${this.prefix}/:id`, (req: Request, res: Response) =>
            this.getPlaylistById(req, res)
        );

        // Adicione outras rotas conforme necessário para CRUD de playlists
    }

    public async getRecentlyListenedPlaylists(req: Request, res: Response) {
        try {
            const userId = ''; // Pode vir do req.params ou req.user, dependendo da sua implementação
            const recentlyListenedPlaylists = await this.playlistService.getUserPlaylists(userId);

            return new SuccessResult({
                msg: Result.transformRequestOnMsg(req),
                data: recentlyListenedPlaylists,
            }).handle(res);
        } catch (error) {
            if (error instanceof InternalServerError) {
                return res.status(error.status).json({ msg: error.msg, msgCode: error.msgCode });
            }
            return res.status(500).json({ msg: 'Erro ao obter playlists ouvidas recentemente' });
        }
    }

    public async getPlaylistById(req: Request, res: Response) {
        try {
            const playlist = await this.playlistService.getPlaylistById(req.params.id);

            return new SuccessResult({
                msg: Result.transformRequestOnMsg(req),
                data: playlist,
            }).handle(res);
        } catch (error) {
            if (error instanceof InternalServerError) {
                return res.status(error.status).json({ msg: error.msg, msgCode: error.msgCode });
            }
            return res.status(500).json({ msg: 'Erro ao buscar playlist por ID' });
        }
    }
}

export default PlaylistController;
