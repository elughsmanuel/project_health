import { User } from "../../users/entity/user.entity";
import { BaseResult } from "./base";

export type UserResultData = {
    status: number;
    message: string;
    user: User;
};

export class UserResult extends BaseResult {
    static from({ status, message, user }: UserResultData) {    
        const data = {
            user,
        }
        return new UserResult(status, message, data);
    }
}
