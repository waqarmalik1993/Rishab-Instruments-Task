import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from './user';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: any;
  _id: any
  currentUser: any
  constructor(private http: HttpClient) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')!)
    if (currentUser) {
      this._id = currentUser.data._id
    }
  }
  login(formdata: any) {
    return this.http.post<any>(`${environment.apiUrl}/login`, formdata)
      .pipe(map((user:any) => {
        if (user.status === 'success') {
          localStorage.setItem('currentUser', JSON.stringify(user));
          return user;
        } else {
          return user;

        }
      }));
  }
  getusers(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/get-all-users`)
  }
  addUsers(formdata:any):Observable<any>{
    return this.http.post(`${environment.apiUrl}/add-user`,formdata)
  }
  editusers(formdata:any,id: any):Observable<any>{
    return this.http.put(`${environment.apiUrl}/edit-user/${id}`,formdata)
  }
  deleteusers(id: any):Observable<any>{
    return this.http.delete(`${environment.apiUrl}/delete-user/${id}`)
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    window.location.reload()
  }

}
