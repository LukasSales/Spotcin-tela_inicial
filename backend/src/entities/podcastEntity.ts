import BaseEntity from "./base.entity";

class PodcastEntity extends BaseEntity {
    title: string;
    description: string;
    categories: string[];

    constructor(data: Partial<PodcastEntity>) {
        super(data.id || '');
        this.title = data.title || '';
        this.description = data.description || '';
        this.categories = data.categories || [];
    }
}

export default PodcastEntity;