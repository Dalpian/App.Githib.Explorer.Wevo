import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { UsersGithub } from '../models/users-github';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersGithubService {

  url = `${environment.API}/users`;

  // injection o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getUsers(): Observable<UsersGithub> {
    return this.httpClient.get<UsersGithub>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  getUsersNextPage(url: string): Observable<UsersGithub> {
    return this.httpClient.get<UsersGithub>(url)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
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