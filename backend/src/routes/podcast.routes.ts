import { Router } from 'express';
import PodcastController from '../controllers/podcast.controller';
import { di } from '../di';
import PodcastService from '../services/podcast.service';

const router = Router();
const podcastService = di.getService(PodcastService);
const podcastController = new PodcastController(router, podcastService);

export default podcastController.router;
