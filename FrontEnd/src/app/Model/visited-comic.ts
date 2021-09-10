export class VisitedComic {
    id: string;
    name: string;
    chapterName: string;
    chapterUrl: string;
    image: string;
    constructor(id: string, name: string, chapterName: string, chapterUrl: string, image: string) {
        this.id = id;
        this.name = name;
        this.chapterName = chapterName;
        this.chapterUrl = chapterUrl;
        this.image = image;
    }
}
