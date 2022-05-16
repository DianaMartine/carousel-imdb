import { ImdbFilmModel } from './imdb-film.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ImdbService {
  // private apiKey: string = 'k_egoq846u';
  private apiKey: string = 'k_nfqc43rk';

  baseUrl: string = 'http://localhost:3000/items';
  baseUrlPoster: string = `https://imdb-api.com/en/API/Posters/${this.apiKey}/`;

  constructor(private httpClient: HttpClient) {}

  getData(): Observable<ImdbFilmModel[]> {
    return this.httpClient.get<ImdbFilmModel[]>(this.baseUrl);
  }

  getPosters(id: string): Observable<any> {
    return this.httpClient.get<any>(this.baseUrlPoster + id);
  }

  putPosters(id: string, body: any) {
    return this.httpClient
      .put(`${this.baseUrl}/${id}`, body)
      .subscribe((data) => {
        console.log('id: ' + id);
        console.log('body: ' + JSON.stringify(body));
        console.log('data: ' + JSON.stringify(data));
      });
  }
}
