import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000';

  public get<T>(url: string, params: HttpParams = new HttpParams()): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}${url}`, {
      headers: this.headers,
      params,
    });
  }

  // search(term: string): Observable<Movie[]> {
  //   if (!term.trim()) return this.getMovies();
  //   return this.http.get<Movie[]>(`${this.api}?q=${encodeURIComponent(term)}`).pipe(
  //     catchError((err) => {
  //       console.error(err);
  //       return of([]);
  //     })
  //   );
  // }
  private get headers(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    return new HttpHeaders(headersConfig);
  }
}
