import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QzService {
  constructor(private http: HttpClient) {}

  token =
    ' eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1NDIyNCIsImV4cCI6MTY3ODQ2MTgyNCwiaWF0IjoxNjc4NDI1ODI0fQ.fVwdqFX4yWW7pymL7M1gggeczyp7PeJ-tjwqR7OaSYk';
  headers_obj = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + this.token,
  });

  httpOptions = {
    headers: this.headers_obj,
  };

  public getQuestions(): Observable<any> {
    const url = 'https://demoilmsservice.mhada.gov.in/loadQuestionsV1';
    return this.http.post(url, this.httpOptions);
  }
}
