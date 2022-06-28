export interface ISignupUsers {
    id:number;
    fullName:string;
    mobile:string;
    email:string;
    password:string;
}

export class ISignupUsers implements ISignupUsers {
    id:number=0;
    fullName:string="";
    mobile:string="";
    email:string="";
    password:string="";
}
