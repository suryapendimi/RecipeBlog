export interface ILoggedInUser{
    id:number;
    fullName:string;  
    email:string;
}

export class LoggedInUser implements ILoggedInUser{
    id:number=0;
    fullName:string=""; 
    email:string="";
}

