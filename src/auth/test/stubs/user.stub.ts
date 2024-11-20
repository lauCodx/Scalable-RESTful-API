import { User } from "src/auth/schema/user.schema";

export const userStub = (): User =>{
    return {
        _id:'1234',
        username:'ebus',
        email:'example@gmail.com',
        password:'12345'
    } as User
}