import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JobModel } from 'src/app/Models/JobModel';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http:HttpClient) {}
  jobUrl="http://localhost:8080/job"

  getAllJobs():Observable<JobModel[]>{
    return this.http.get<JobModel[]>(this.jobUrl+"/all");
  }
}
