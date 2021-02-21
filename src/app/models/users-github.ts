import { UserGithub } from "./user-github";

export interface UsersGithub {
    userList: UserGithub[];
    nextPage: string;
}