import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AvenantService {
  private baseUrl = 'http://localhost:3000';  // Adjust URL as per your backend server

  constructor(private http: HttpClient) { }

  // Method to handle HTTP errors
  private handleError(error: any) {
    console.error('API Error:', error);
    return throwError('An error occurred. Please try again later.');
  }

  // Method to create a new avenant
  createAvenant(policyNumber: string, formData: any): Observable<any> {
    const url = `${this.baseUrl}/policy/${policyNumber}`;
    console.log(formData);
    return this.http.post<any>(url, formData)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Method to delete an avenant
  deleteAvenant(policyNumber: string,endId:string): Observable<any> {
    const url = `${this.baseUrl}/policy/${policyNumber}/endorsements/${endId}`;
    return this.http.delete<any>(url)
      .pipe(
        catchError(this.handleError)
      );
  }
}
