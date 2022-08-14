import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GenericService {
  constructor(private Client: HttpClient) {}

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  // set Header
  private setHeader(Key: string, value: string) {
    this.httpOptions.headers.set(Key, value);
  }
  // Handle Error Function
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    }
    if (error.status == 401) {
      return throwError(() => new Error('401'));
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error,
        error.status
      );
    }
    return throwError(() => new Error(' please try again...!'));
  }

  // Get All Function
  getAll(RouteURL: string): Observable<any> {
    return this.Client.get<any>(`${environment.APIUrl}/${RouteURL}`).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  // Get One Function
  getOne(RouteURL: string, id: any): Observable<any> {
    return this.Client.get<any>(`${environment.APIUrl}/${RouteURL}/${id}`).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }
  // Post Function
  Post(RouteURL: string, item: any): Observable<any> {
    return this.Client.post<any>(
      `${environment.APIUrl}/${RouteURL}`,
      JSON.stringify(item),
      this.httpOptions
    ).pipe(retry(3), catchError(this.handleError));
  }
  //Put Function
  put(RouteURL: string, id: any, item: any): Observable<any> {
    return this.Client.put<any>(
      `${environment.APIUrl}/${RouteURL}/${id}`,
      JSON.stringify(item),
      this.httpOptions
    ).pipe(retry(3), catchError(this.handleError));
  }
  //Delete Function
  Delete(RouteURL: string, id: any): Observable<any> {
    return this.Client.delete<any>(
      `${environment.APIUrl}/${RouteURL}/${id}`
    ).pipe(retry(3), catchError(this.handleError));
  }
  //transaction
  getTransaction(RouteURL: string, id: number, type: number): Observable<any> {
    return this.Client.get<any>(
      `${environment.APIUrl}/${RouteURL}/${id}/${type}`
    ).pipe(retry(3), catchError(this.handleError));
  }
}
