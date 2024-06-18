import { Router } from 'express';
import MusicController from '../controllers/music.controller';
import { di } from '../di';
import MusicService from '../services/music.service';

const router = Router();
const musicService = di.getService(MusicService);
const musicController = new MusicController(router, musicService);

export default musicController.router;
