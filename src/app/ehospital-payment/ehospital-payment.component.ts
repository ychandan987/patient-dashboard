import { Component, OnInit } from '@angular/core';
import { ApigatewayService } from '../apigateway.service';
import { CryptService } from '../crypt.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ehospital-payment',
  templateUrl: './ehospital-payment.component.html',
  styleUrls: ['./ehospital-payment.component.css'],
  providers: [ApigatewayService, CryptService]
})
export class EhospitalPaymentComponent implements OnInit {

  constructor(private _DataService: ApigatewayService, private router: Router,
    private activeRoute: ActivatedRoute, private crypt: CryptService) { }

  hospId;
  appId;
  paymentId;

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      this.hospId = params['hospId'];
      this.appId = params['appId'];
      this.paymentId = params['payId'];
    });
    this._DataService.updateEhospitalPayment({
      "AppointmentId":this.appId,
      "payment_mode":"ONLINE",
      "paymentconfirmation":"true",
      "paymentId":this.paymentId
    }).subscribe((res) => {
      console.log("payment response: ",res)
    })
  }

}
