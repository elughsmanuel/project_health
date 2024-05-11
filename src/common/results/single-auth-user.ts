import { User } from "../../users/entity/user.entity";
import { BaseResult } from "./base";

export type AuthResultData = {
    status: number;
    message: string;
    user: User;
    accessToken?: string;
};

export class AuthResult extends BaseResult {
    static from({ status, message, user, accessToken }: AuthResultData) {    
        const data = {
            user,
            accessToken,
        }
        return new AuthResult(status, message, data);
    }
}
