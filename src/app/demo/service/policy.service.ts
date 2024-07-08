import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  private baseUrl = 'http://localhost:3000'; // Assurez-vous que cette URL pointe vers votre backend

  constructor(private http: HttpClient) {}

  getPolicy(policyNumber: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/policy/${policyNumber}/policy`);
  }

  getPolicyEndorsements(policyNumber: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/policy/${policyNumber}/endorsements`);
  }

  getRequests(): Observable<any> {
    const url = `${this.baseUrl}/policy/requests/getall`;  // Adjust endpoint as needed
    return this.http.get<any>(url);
  }
  getPolicyCoverages(policyNumber: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/policy/${policyNumber}/coverages`);
  }

  getInvestment(policyNumber: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/policy/${policyNumber}/investment`);
  }

  // Nouvelle méthode pour rechercher les policies par numéro de police partiel
  getPolicies(policyNumberPart: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/policy/${policyNumberPart}/policies`);
  }
}
