import MusicModel from './music.model';

class PlaylistModel {
    id: string;
    name: string;
    description: string;
    songs: MusicModel[];
    categories: string[];
    updatedAt: Date;

    constructor({ id, name, description, songs, categories, updatedAt }: { id: string; name: string; description: string; songs: MusicModel[]; categories: string[]; updatedAt: Date; }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.songs = songs;
        this.categories = categories;
        this.updatedAt = updatedAt;
    }
}

export default PlaylistModel;