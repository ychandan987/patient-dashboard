import { Component, OnInit } from '@angular/core';
import { ApigatewayService } from '../apigateway.service';
import { CryptService } from '../crypt.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pts-app-payment-mode',
  templateUrl: './pts-app-payment-mode.component.html',
  styleUrls: ['./pts-app-payment-mode.component.css'],
  providers: [ApigatewayService, CryptService]
})
export class PtsAppPaymentModeComponent implements OnInit {

  constructor(private _DataService: ApigatewayService, private router: Router,
    private activeRoute: ActivatedRoute, private crypt: CryptService) { }
  
    
  posts;
  commonData;
  ptsId;
  transId
  currentUser = JSON.parse(this.crypt.get('currentUser'));
  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      this.ptsId = params['ptsId'];
      this.transId = params['transId'];
    });
    this._DataService.getPTSAppointments({"ptsId" : this.ptsId, "transactionId" : this.transId}).subscribe((res)=>{
      console.log("res: ",res);
      this.commonData = res.data[0];
      this.posts = res.griddata;
    });
  }
}
