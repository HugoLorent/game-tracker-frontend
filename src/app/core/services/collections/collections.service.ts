import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Collection } from '../../interfaces/collections.interface';

@Injectable({
  providedIn: 'root',
})
export class CollectionsService {
  private baseUrl = 'http://localhost:3000';

  constructor(private readonly http: HttpClient) {}

  public getCollections(userId: number): Observable<Collection[]> {
    return this.http.get<Collection[]>(
      `${this.baseUrl}/users/${userId}/collections`
    );
  }
}
