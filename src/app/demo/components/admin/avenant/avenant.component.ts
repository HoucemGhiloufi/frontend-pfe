import { Component } from '@angular/core';
import { AvenantService } from 'src/app/demo/service/avenant.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-avenant',
  templateUrl: './avenant.component.html',
  styleUrls: ['./avenant.component.scss']
})
export class AvenantComponent {
  // Champs personnalisés
  manualLevel2Broker: string;
  automaticLevel2Broker: string;
  fundsOrigin: string;
  additionalFundsOrigin: string;
  thirdPartyPayer: string;
  selectedPaymentMode: any;
  effectiveDate: Date;
  signatureDate: Date;
  calculationDate: Date;
  endorsementType:string;
  endorsementSubType:string;
  // Options pour les listes déroulantes
  manualLevel2BrokerOptions = [
    { name: '000:MGEN' },
    { name: '001:MGEN_AIN' },
    { name: '002:MGEN_AISNE' },
    { name: '003:MGEN_ALLIER' },
    { name: '004:MGEN_ALPES_DE_HAUTES_PROVENCE' }
  ];

  sousavenantTypes = [
    { name: 'GLOBAL_PROPORTIONAL_AMOUNT' }  
  ];
  avenantTypes = [
    { name: 'Arbitrage' },
    { name: 'Versement Libre' },
    { name: 'Rachat Partiel' },
    { name: 'Rachat Total' }
  ];
  automaticLevel2BrokerOptions = [
    { name: 'MGEN' },
    { name: 'MGEN_AIN' },
    { name: 'MGEN_AISNE' },
    { name: 'MGEN_ALLIER' },
    { name: 'MGEN_ALPES_DE_HAUTES_PROVENCE' }
  ];

  fundsOriginOptions = [
    { name: 'une autre source' },
    { name: 'Mon épargne' },
    { name: 'Idemnités autres assurances' },
    { name: 'Idemnités MAIF' },
    { name: 'Mes revenus' }
  ];

  additionalFundsOriginOptions = [
    { name: 'une autre source' },
    { name: 'Mon épargne' },
    { name: 'Idemnités autres assurances' },
    { name: 'Idemnités MAIF' },
    { name: 'Mes revenus' }
  ];

  // Options pour le mode de paiement
  paymentModes = [
    { name: 'Chèque' },
    { name: 'Transfert' },
    { name: 'Direct Debit' },
    { name: 'Comptant' }
  ];

  constructor(private avenantService: AvenantService,
    private router: Router,
    private route: ActivatedRoute) {
    this.manualLevel2Broker = '';
    this.automaticLevel2Broker = '';
    this.fundsOrigin = '';
    this.additionalFundsOrigin = '';
    this.thirdPartyPayer = '';
    this.calculationDate = null,
    this.effectiveDate = null,
    this.signatureDate = null
    this.endorsementType='';
    this.endorsementSubType='';
  }
  policyNumber: string = '';
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.policyNumber = params['policyNumber']; // Récupérer le numéro de police de la route

    });
  }
  onSubmit() {
    // Replace with actual policy number or fetch dynamically
    const formData = {
      manualLevel2Broker: this.manualLevel2Broker,
      automaticLevel2Broker: this.automaticLevel2Broker,
      fundsOrigin: this.fundsOrigin,
      additionalFundsOrigin: this.additionalFundsOrigin,
      thirdPartyPayer: this.thirdPartyPayer,
      selectedPaymentMode: this.selectedPaymentMode,
      calculationDate: this.calculationDate,
      effectiveDate: this.effectiveDate,
      signatureDate: this.signatureDate,
      endorsementType:this.endorsementType,
      endorsementSubType:this.endorsementSubType,
      // Add other form fields as needed
    };

    this.avenantService.createAvenant(this.policyNumber, formData)
      .subscribe(
        (response) => {
          console.log('Avenant created successfully:', response);
          // Handle success, e.g., show success message, redirect, etc.
        },
        (error) => {
          console.error('Error creating avenant:', error);
          // Handle error, e.g., show error message to user
        }
      );
  }
}
