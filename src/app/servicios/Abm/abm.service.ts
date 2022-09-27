import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AbmModel } from 'src/app/Models/AbmModel';

@Injectable({
  providedIn: 'root'
})
export class AbmService {

  constructor(private http:HttpClient) { }

  abmUrl="http://localhost:8080/abm";

  getAbm():Observable<AbmModel>{
    return this.http.get<AbmModel>(this.abmUrl+"/get");
  }
}
