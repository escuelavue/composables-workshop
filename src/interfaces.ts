export interface UserData {
    id: string
    name: string
    username: string
    email: string
    address: {
        street: string
        suite: string
        city: string
        zipcode: string
        geo: {
            lat: string
            lng: string
        }
    },
    phone: string
    website: string
    company: {
        name: string
        catchPhrase: string
        bs: string
    }
}

export interface UserTodo {
    userId: number
    id: number
    title: string
    completed: boolean
}

export interface UserAlbum {
    userId: number
    id: number
    title: string
}

export interface UserPost extends UserAlbum {
    body: string
}

export type FlatObject = Record<PropertyKey, any>