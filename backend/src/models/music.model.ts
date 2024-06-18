import BaseModel from './base.model';

class MusicModel extends BaseModel {
    name: string;
    artist: string;
    genre: string;

    constructor({ id, name, artist, genre }: { id: string; name: string; artist: string; genre: string; }) {
        super(id);
        this.name = name;
        this.artist = artist;
        this.genre = genre;
    }
}

export default MusicModel;