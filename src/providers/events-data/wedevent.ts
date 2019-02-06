
export class wedevent{
    public title:string;
    public cover:string;
    public profile:string;
    public date:string;

    public PhotoGallery:string[];
    public VideoGallery:string[];

    constructor(){
        this.PhotoGallery =  new Array();
        this.VideoGallery = new Array();
    }
}