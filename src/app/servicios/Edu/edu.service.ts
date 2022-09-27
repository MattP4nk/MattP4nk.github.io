import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EduModel } from 'src/app/Models/EduModel';

@Injectable({
  providedIn: 'root'
})
export class EduService {

  constructor(private http:HttpClient) { }
  eduUrl="http://localhost:8080/edu"

  getAllEdus():Observable<EduModel[]>{
    return this.http.get<EduModel[]>(this.eduUrl+"/all");
  }
}
