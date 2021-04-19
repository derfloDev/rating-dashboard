import { Token } from "./token";
import { UserMetadata } from "./userMetadata";

export interface User {
    token: Token,
    user_metadata: UserMetadata
}