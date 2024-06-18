import BaseEntity from './base.entity';
import MusicEntity from './MusicEntity';

class PlaylistEntity extends BaseEntity {
    name: string;
    description: string;
    songs: MusicEntity[];
    categories: string[];
    updatedAt: Date;

    constructor(data: Partial<PlaylistEntity>) {
        super(data.id || '');
        this.name = data.name || '';
        this.description = data.description || '';
        this.songs = data.songs || [];
        this.categories = data.categories || [];
        this.updatedAt = data.updatedAt || new Date();
    }
}

export default PlaylistEntity;