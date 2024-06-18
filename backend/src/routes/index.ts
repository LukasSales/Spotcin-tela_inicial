import { Express } from 'express';
import musicRoutes from './music.routes';
import playlistRoutes from './playlist.routes';
import podcastRoutes from './podcast.routes';

const prefix = '/api';

export default (app: Express) => {
  app.use(prefix, musicRoutes);
  app.use(prefix, playlistRoutes);
  app.use(prefix, podcastRoutes);
};
