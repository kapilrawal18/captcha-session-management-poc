import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { environment } from 'src/assets/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private messageSubject = new Subject<any>();
  getMessage = this.messageSubject.asObservable();
  constructor(private http: HttpClient) { }
  setMessage(message: any): void {
    this.messageSubject.next(message)
  }
GetAllUser(token: string){
  var headers_object:any = new HttpHeaders().set("Authorization", "Bearer " +token);
 return this.http.get(environment.apiUrl + 'user/getAllUsers',{headers:headers_object} )
}
GetAllState(countryId: number){
  // var headers_object:any = new HttpHeaders().set(Authorization:"nLsYM6PoE9D9ReXB_IvI-i2X-70ZauAITWgW4yiRAsEdcVsORc2awdoA5hPLroae94c eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJtdmdhZGFnaUBnbWFpbC5jb20ifSwiZXhwIjoxNTY2MjM0ODU0fQ.nMWPN38zptwwDKAo11bFyjhCRuzNhZc6NqqCaYJVxP0" "Accept": "application/json");
 return this.http.get(environment.countryListAPIUrl+'getstate&country_id=' + countryId )
}
public getCountries(): Observable<any> {
  return this.http.get<any>(environment.countryListAPIUrl + 'getcountry');
}
userIdDetails(id:any, token: string){
  var headers_object:any = new HttpHeaders().set("Authorization", "Bearer " +token);
  return this.http.get(environment.apiUrl + 'user/'+ id ,{headers:headers_object})
// getStatesByCountry(countryShotName: string) {
//   return this.countryData.getStatesByShort(countryShotName);
}

// getCitiesByState(country: string, state: string) {
//   return this.countryData.getCities(country, state);
// }
SaveUser(inputData: any){
return this.http.post(environment.apiUrl + 'auth/register', inputData).pipe(map((response) => {
  return response; 
}));
 
}
saveContactDetails(myform: any, token: any){
  var headers_object:any = new HttpHeaders().set("Authorization", "Bearer " + token);
  return this.http.post(environment.apiUrl + 'user/saveContactDetails', myform,{headers:headers_object} ).pipe(map((response) => {
    return response;
  }));
}

getCities(id: any){
  return this.http.get(environment.countryListAPIUrl+'getcity&state_id=' + id )
}
userLogin(inputData: any){
  return this.http.post(environment.apiUrl + 'auth/login', inputData).pipe(map((response) => {
    return response;
  }));
  
  }
getCountryList(){
  return this.http.get('/assets/country.json');
}
// isLoggedIn(){
//   return sessionStorage.getItem('personalDetails')==null;
// }
userPersonalDetails(myform: AudioContextLatencyCategory, token:string){
  var headers_object:any = new HttpHeaders().set("Authorization", "Bearer " + token);
  return this.http.post(environment.apiUrl + 'user/updateProfile', myform,{headers:headers_object} ).pipe(map((response) => {
    return response;
  }));
}
isLoggedIn(){
  return sessionStorage.getItem('personalDetails')!=null;
}
updateUserDetails(userId:number, updatedData:any, token:string ){
  var headers_object:any = new HttpHeaders().set("Authorization", "Bearer " + token);
  return this.http.put(environment.apiUrl + 'user/updateUser?id=' + userId, updatedData, {headers:headers_object}).pipe(map((response) => {
    return response;
  }));
}
}
