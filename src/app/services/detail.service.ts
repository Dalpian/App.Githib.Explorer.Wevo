import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { UsersGithub } from '../models/users-github';
import { Detail } from '../models/detail';
import { Repos } from '../models/repos';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DetailService {

  url = `${environment.API}/users`;

  // injection o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getDetail(username: string): Observable<Detail> {
    return this.httpClient.get<Detail>(this.url + "/" + username + "/details") 
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getRepos(username: string): Observable<Repos[]> {
    return this.httpClient.get<Repos[]>(this.url + "/" + username + "/repos") 
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