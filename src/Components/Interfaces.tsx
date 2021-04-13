export interface IGameResult {

}

export interface ICommentResult {

}

export interface IRawGResult {
    background_image: string,
    name: string,
    genres: IRawGGenres[],
    platforms: IRawGPlatforms[],
}

export interface IRawGGenres {
    name: string,
}

export interface IRawGPlatforms {
    platform: IRawGPlatformName,
    name: string,
}

export interface IRawGPlatformName {
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
    id: string,
    comments: ICommentResult[],
}

export interface ICommentResult {
    content: string,
    userId: string,
    user: IUsername,
    id: string,
}

export interface IUsername {
    username: string,
}