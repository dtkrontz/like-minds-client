export interface IGameResult {

}

export interface ICommentResult {

}

export interface IRawGResult {
    
}

export interface IData {
    user: IUser,
}

interface IUser {
    id: string,
    admin: string,
}

export interface IGameSort {
    title: any,
}

interface IGameSortTitle {
    title: string
}

export interface IGameResult {
    image_url: string,
    title: string,
    genre: string,
    system: string,
    rating: number,
    review: string,
    favorite: boolean,
    id: number,
}