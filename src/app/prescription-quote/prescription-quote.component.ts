import { Component, OnInit } from '@angular/core';
import { ApigatewayService } from '../apigateway.service';
import { CryptService } from '../crypt.service';

@Component({
  selector: 'app-prescription-quote',
  templateUrl: './prescription-quote.component.html',
  styleUrls: ['./prescription-quote.component.css'],
  providers: [ApigatewayService, CryptService]
})
export class PrescriptionQuoteComponent implements OnInit {

  constructor(private _DataService: ApigatewayService, private crypt: CryptService) { }
  currentUser = JSON.parse(this.crypt.get('currentUser'));
  quotes;

  ngOnInit() {
    this._DataService.getAllPharmacyQuote(this.currentUser.unique_id,0).subscribe(res => {
      this.quotes = res.data;
      console.log("quotes ", res.data)
    });
  }

}
