import BaseModel from './base.model';

class PodcastModel extends BaseModel {
    title: string;
    description: string;
    categories: string[];
    updatedAt?: Date;

    constructor({ id, title, description, categories, updatedAt }: { id: string; title: string; description: string; categories: string[]; updatedAt?: Date; }) {
        super(id);
        this.title = title;
        this.description = description;
        this.categories = categories;
        this.updatedAt = updatedAt;
    }
}

export default PodcastModel;