import { Component, OnInit } from '@angular/core';
import { PolicyService } from 'src/app/demo/service/policy.service';
import { Contract } from './contrat';
import { Router } from '@angular/router';
import { LoadingComponent } from '../loading/loading.component';
@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.scss']
})
export class RechercheComponent implements OnInit {
  loading :boolean =false
  contracts: Contract[] = [];
  filteredContracts: Contract[] = [];
  searchTerm: string = '';
  requests: Request[] = [];
  filteredRequests: Request[] = [];
  constructor(private policyService: PolicyService, private router: Router) { }
  loadRequests() {
    this.policyService.getRequests().subscribe({
      next: (response) => {
        console.log(response)
        // Assuming `response.data` contains the array of requests
        this.requests = response;  // Assign the data to a component variable
        console.log('Policy data loaded successfully', this.requests); 
        
          this.filteredRequests = this.requests;
          this.requests.forEach(item => {
            // if (item.this.requests) {
            //   this.filteredRequests.push(item.this.requests); // Push data into filteredContracts if item.data exists
            // }
            console.log(item)
          }
         // Optional: log the loaded data
    )} ,
      error: (err) => {
        console.error('Failed to load policy data', err);
      }
    });
  }
  
  ngOnInit(): void {
    this.loadRequests()
  }

  navigateToPolicyDetails(policyNumber: string) {
    this.router.navigate(['/admin/widget', policyNumber]);
  }

  search() {
    this.loading=true// Iterate through each element in data array

    this.policyService.getPolicies(this.searchTerm).subscribe(
      (data) => {
        this.filteredContracts = [];
        // Iterate through each element in data array
        data.forEach(item => {
          if (item.data) {
            this.filteredContracts.push(item.data); // Push data into filteredContracts if item.data exists
          }
        });      

        console.log(this.filteredContracts);
        this.loading=false// Iterate through each element in data array
      },
      (error) => {
        this.loading=false
        console.error('Erreur lors de la recherche des policies:', error);
        this.filteredContracts = [];
      }
    );
  }
}
