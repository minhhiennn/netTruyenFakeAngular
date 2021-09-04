export class Manga {
    id: string;
    lastUpdate: Date;
    constructor(id: string) {
        this.id = id;
        this.lastUpdate = new Date();
    }
}
