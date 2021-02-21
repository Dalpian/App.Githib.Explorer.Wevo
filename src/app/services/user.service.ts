import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = `${environment.API}/users`;

  // injection o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.url + "/GetAllUsers")
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  addUser(user: User): Observable<User[]> {
    return this.httpClient.post<User[]>(this.url, user)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  putUser(user: User): Observable<User[]> {
    return this.httpClient.put<User[]>(this.url, user)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  delUser(id: any): Observable<User[]> {
    return this.httpClient.delete<User[]>(this.url + "/DeleteUserById/" + id)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }
  
  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}