import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PREDUZECE_URL } from '../constants';
import { Preduzece } from '../model/preduzece';

@Injectable({
  providedIn: 'root',
})
export class PreduzeceService {
  constructor(private httpClient: HttpClient) {}

  public getAllPreduzece(): Observable<any> {
    return this.httpClient.get(`${PREDUZECE_URL}`);
  }

  public addPreduzece(Preduzece: Preduzece): Observable<any> {
    Preduzece.idPreduzece = 100000;
    return this.httpClient.post(`${PREDUZECE_URL}`, Preduzece);
  }

  public updatePreduzece(Preduzece: Preduzece): Observable<any> {
    return this.httpClient.put(`${PREDUZECE_URL}`, Preduzece);
  }

  public deletePreduzece(id: number) {
    return this.httpClient.delete(`${PREDUZECE_URL}/${id}`);
  }
}
