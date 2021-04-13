export interface IGameResult {

}

export interface ICommentResult {

}

export interface IRawGResult {
    background_image: string,
    name: string,
    genres: any,
    platforms: any,
}

interface IRawGGenres {
    name: string,
}

interface IRawGPlatforms {
    platform: any,
}

interface IRawGPlatformName {
    name: string,
}

export interface IData {
    user: IUser,
    message: string,
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

export interface ICommentResult {
    content: string,
    userId: string,
}