import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SEKTOR_URL } from '../constants';
import { Sektor } from '../model/sektor';

@Injectable({
  providedIn: 'root',
})
export class SektorService {
  constructor(private httpClient: HttpClient) {}

  public getAllSektor(): Observable<any> {
    return this.httpClient.get(`${SEKTOR_URL}`);
  }

  public addSektor(Sektor: Sektor): Observable<any> {
    Sektor.idSektor = 100000;
    return this.httpClient.post(`${SEKTOR_URL}`, Sektor);
  }

  public updateSektor(Sektor: Sektor): Observable<any> {
    return this.httpClient.put(`${SEKTOR_URL}`, Sektor);
  }

  public deleteSektor(id: number) {
    return this.httpClient.delete(`${SEKTOR_URL}/${id}`);
  }
}
