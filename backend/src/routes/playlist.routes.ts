import { Router } from 'express';
import PlaylistController from '../controllers/playlist.controller';
import { di } from '../di';
import PlaylistService from '../services/playlist.service';

const router = Router();
const playlistService = di.getService(PlaylistService);
const playlistController = new PlaylistController(router, playlistService);

export default playlistController.router;
