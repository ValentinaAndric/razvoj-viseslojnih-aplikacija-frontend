import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RADNIK_URL } from '../constants';
import { Radnik } from '../model/radnik';
import { RADNIK_SEKTOR_URL } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class RadnikService {
  constructor(private httpClient: HttpClient) {}

  public getAllRadnik(): Observable<any> {
    return this.httpClient.get(`${RADNIK_URL}`);
  }

  public addRadnik(Radnik: Radnik): Observable<any> {
    Radnik.idRadnik = 100000;
    return this.httpClient.post(`${RADNIK_URL}`, Radnik);
  }

  public updateRadnik(Radnik: Radnik): Observable<any> {
    return this.httpClient.put(`${RADNIK_URL}`, Radnik);
  }

  public deleteRadnik(id: number) {
    return this.httpClient.delete(`${RADNIK_URL}/${id}`);
  }

  public getRadnikBySektor(idSektor: number): Observable<any> {
    return this.httpClient.get(`${RADNIK_SEKTOR_URL}/${idSektor}`);
  }
}
