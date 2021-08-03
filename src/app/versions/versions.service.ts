import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VersionsService {
  versions:any=[];
  url="https://localhost:5001/api/Versions";
  constructor(private http:HttpClient) { }
  getversions(){
    this.versions=this.http.get(this.url);
    return this.versions;
      }
      deleteVersion(id:number){
        return this.http.delete(`${this.url}/${id}`);
      }
      addVersion(version:any){
        console.log(version);
        return this.http.post(this.url,version);
       }
       updateVersion(id:any,version:any)
       {
         return this.http.put(this.url+'/'+id,version) ;
       }
}
