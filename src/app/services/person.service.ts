import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PersonModel } from '../models/person.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private url: string = 'http://localhost:8080/api/person';
  constructor(private http: HttpClient) { }

  public getPersons(): Observable<PersonModel[]> {
    return this.http.get<PersonModel[]>(this.url);
  }

  public createPerson(obj:PersonModel): Observable<PersonModel> {
    return this.http.post<PersonModel>(this.url, obj);
  }

  public updatePerson(obj:PersonModel): Observable<PersonModel> {
    return this.http.put<PersonModel>(this.url, obj);
  }

  public deletePerson(id:number) {
    return this.http.delete(this.url + '/' + id);
  }

}
