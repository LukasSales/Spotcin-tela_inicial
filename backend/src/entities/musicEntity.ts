import BaseEntity from "./base.entity";

class MusicEntity extends BaseEntity {
  name: string;
  artist: string;
  genre: string;

  constructor(data: Partial<MusicEntity>) {
      super(data.id || '');
      this.name = data.name || '';
      this.artist = data.artist || '';
      this.genre = data.genre || '';
  }
}

export default MusicEntity;