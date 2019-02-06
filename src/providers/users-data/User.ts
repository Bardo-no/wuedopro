
export class User{
    private token:string;
    private logoutToken:string;
    public userID:string;
    public name:string;
    public rol:string;
    public proType:string;
    public description:string;
    public services:string;

    public coverImgUrl:string;
    public displayImgUrl:string;

    public PhotoGallery:string[];
    public VideoGallery:string[];

    constructor(){
        this.PhotoGallery =  new Array();
        this.VideoGallery = new Array();
    }

    public setToken(token:string){this.token = token;}
    public setLogoutToken( token:string ){this.logoutToken = token;}

    public getToken(){return this.token;}
    public getLogoutToken(){ return this.logoutToken;}
}