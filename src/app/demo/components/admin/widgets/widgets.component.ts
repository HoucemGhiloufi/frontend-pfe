import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Table } from 'primeng/table';
import { PolicyService } from 'src/app/demo/service/policy.service';
import { Endorsement } from './endorsement';
import { AvenantService } from 'src/app/demo/service/avenant.service';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.scss']
})
export class WidgetsComponent implements OnInit {
  endorsements: any[] = [];
  coverages: any[] = [];
  loading: boolean = true;
  policyNumber: string = ''; // Initialiser vide
  rowGroupMetadata: any;
  expandedRows: { [key: string]: boolean } = {};
  isExpanded: boolean = false;

  // Properties to store policy data
  effectiveDate?: string;
  termDate?: string;
  partnerName?: string;
  productName?: string;
  productTypeIdentifier?: string;
  holderName?: string;
  premiumTypeIdentifier?: string;
  paymentModeIdentifier?: string;
  currency?: string;
  taxCountryLabel?: string;
  paymentPeriodicityLabel?: string;

  // Properties to store investment data
  investmentStrategyType?: string;
  investmentStrategyLabel?: string;
  investmentValuationDate?: string;
  investmentGlobalValuation?: number;

  // Define variables to hold the chart data and options
  pieData: any;
  pieOptions: any;
  @ViewChild('filter') filter!: ElementRef;

  // selected endorsment 


  constructor(
    private policyService: PolicyService,
    private router: Router,
    private route: ActivatedRoute,
    private avenantService: AvenantService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.policyNumber = params['policyNumber']; // Récupérer le numéro de police de la route
      this.loadPolicyData();
      this.loadPolicyEndorsements();
      this.loadPolicyCoverages();
      this.loadInvestmentDetails(); // Load investment details
    });
  }

  loadPolicyData() {
    this.policyService.getPolicy(this.policyNumber).subscribe({
      next: (response) => {
        const data = response.data;
        this.effectiveDate = data.effectiveDate;
        this.termDate = data.termDate;
        this.partnerName = data.partnerName;
        this.productName = data.productName;
        this.productTypeIdentifier = data.productType.identifier;
        this.holderName = data.holder.name;
        this.premiumTypeIdentifier = data.premiumType.identifier;
        this.paymentModeIdentifier = data.paymentMode.identifier;
        this.currency = data.currency;
        this.taxCountryLabel = data.taxCountry.label;
        this.paymentPeriodicityLabel = data.paymentPeriodicity.label;
      },
      error: (err) => {
        console.error('Failed to load policy data', err);
      }
    });
  }
  NavigateToAvenant() {
    this.router.navigate([`/admin/avenant/${this.policyNumber}`]);
  }
  loadPolicyEndorsements() {
    this.policyService.getPolicyEndorsements(this.policyNumber).subscribe({
      next: (data) => {
        this.endorsements = data;
        console.log(data)
        this.updateRowGroupMetaData();
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load policy endorsements', err);
        this.loading = false;
      }
    });
  }
  // delete end 

  deleteAvenant(endId: string) {
    if (confirm('Are you sure you want to delete this avenant?')) {
      this.avenantService.deleteAvenant(this.policyNumber, endId)
        .subscribe(
          response => {
            console.log('Avenant deleted successfully:', response);
          },
          error => {
            console.error('Error deleting avenant:', error);
            // Handle error, e.g., show error message to user
          }
        );
    }
  }

  loadPolicyCoverages() {
    this.policyService.getPolicyCoverages(this.policyNumber).subscribe({
      next: (response) => {
        this.coverages = response.data;
      },
      error: (err) => {
        console.error('Failed to load policy coverages', err);
      }
    });
  }

  loadInvestmentDetails() {
    this.policyService.getInvestment(this.policyNumber).subscribe({
      next: (response) => {
        const data = response.data.investment;
        this.investmentStrategyType = data.strategyType;
        this.investmentStrategyLabel = data.strategyLabel;
        this.investmentValuationDate = data.investmentSituation.valuationDate;
        this.investmentGlobalValuation = data.investmentSituation.globalValuation;

        const labels = data.investmentSituation.assetAllocations.map(allocation => allocation.financialInstrument.label);
        const dataPoints = data.investmentSituation.assetAllocations.map(allocation => allocation.valuation.valuationAmount);

        this.pieData = {
          labels: labels,
          datasets: [
            {
              data: dataPoints,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                // Add more colors as needed
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                // Add more colors as needed
              ],
              borderWidth: 1
            }
          ]
        };

        this.pieOptions = {
          responsive: true,
          maintainAspectRatio: false
        };
      },
      error: (err) => {
        console.error('Failed to load investment details', err);
      }
    });
  }

  updateRowGroupMetaData() {
    this.rowGroupMetadata = {};

    if (this.endorsements) {
      for (let i = 0; i < this.endorsements.length; i++) {
        const rowData = this.endorsements[i];
        const endorsementType = rowData.endorsementType?.identifier || '';

        if (i === 0) {
          this.rowGroupMetadata[endorsementType] = { index: 0, size: 1 };
        } else {
          const previousRowData = this.endorsements[i - 1];
          const previousRowGroup = previousRowData.endorsementType?.identifier;
          if (endorsementType === previousRowGroup) {
            this.rowGroupMetadata[endorsementType].size++;
          } else {
            this.rowGroupMetadata[endorsementType] = { index: i, size: 1 };
          }
        }
      }
    }
  }

  onSort() {
    this.updateRowGroupMetaData();
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  expandAll() {
    if (!this.isExpanded) {
      this.endorsements.forEach(endorsement => endorsement && endorsement.endorsementType?.identifier ? this.expandedRows[endorsement.endorsementType.identifier] = true : '');
    } else {
      this.expandedRows = {};
    }
    this.isExpanded = !this.isExpanded;
  }

  // Méthode pour naviguer vers la page de création d'avenant
  navigateToCreateEndorsement() {
    this.router.navigate(['admin/avenant']);
  }
}
