export class Detail {
    id: string;
    title: string;
    author: string;
    condition: boolean;
    genre: string;
    stars: string;
    views: number;
    follows: number;
    summary: string;
    mangaId: string;
    constructor(id: string, title: string, author: string, genre: string, stars: string, views: number, follows: number, summary: string, mangaId: string) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.condition = false;
        this.genre = genre;
        this.stars = stars;
        this.views = views;
        this.follows = follows;
        this.summary = summary;
        this.mangaId = mangaId;
    }
}
