import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { catchError, Observable, throwError, Subject, BehaviorSubject } from 'rxjs';
import { LoggedInUser } from '../models/ILoggedInUser';
import { ISignupUsers } from '../Models/ISignupUsers';
const baseUrl:string = 'http://localhost:3000/signupUsers';
@Injectable({
  providedIn: 'root'
})
export class UserService {  
 
  constructor(private http:HttpClient) { }

  /* getByEmail(email:string): Observable<ISignupUsers[]> {
    debugger;
    return this.http.get<ISignupUsers[]>(`${baseUrl}/email=${email}`)     
  } */
  
  getAll(): Observable<ISignupUsers[]> {
    return this.http.get<ISignupUsers[]>(baseUrl).pipe(catchError((error:HttpErrorResponse) =>{
      console.error(error);
      return throwError(error);
    }))
  }

  /* get(id: any): Observable<ISignupUsers> {
    return this.http.get<ISignupUsers>(`${baseUrl}/${id}`);
  } */
  create(data: any): Observable<ISignupUsers> {
    return this.http.post<ISignupUsers>(baseUrl, data);
  }

  update(id: any, data: any): Observable<ISignupUsers> {
    return this.http.put<ISignupUsers>(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<number> {
    return this.http.delete<number>(`${baseUrl}/${id}`);
  }
  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByEmail(email: string): Observable<ISignupUsers> {
    return this.http.get<ISignupUsers>(`${baseUrl}?email=${email}`);
  }
}
