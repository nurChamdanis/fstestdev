export interface User {
    id: string;
    email: string;
    name: string;
}
export interface UpdateUser {
    id: string;
    name: string;
    email: string,
    collection_id: string;
    no_doc: string;
}
export interface DeleteUser {
    collection_id: string;
    no_doc: string;
}
