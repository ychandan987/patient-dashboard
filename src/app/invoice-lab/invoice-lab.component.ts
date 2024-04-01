import { Component, OnInit } from '@angular/core';
import { ApigatewayService } from '../apigateway.service';
import { CryptService } from '../crypt.service';
import { ActivatedRoute,Router } from '@angular/router';
import * as moment from 'moment';
import { post } from 'selenium-webdriver/http';

@Component({
  selector: 'app-invoice-lab',
  templateUrl: './invoice-lab.component.html',
  styleUrls: ['./invoice-lab.component.css'],
  providers: [ApigatewayService, CryptService]
})
export class InvoiceLabComponent implements OnInit {

  constructor(private _DataService:ApigatewayService, private router: Router, private activeRoute:ActivatedRoute, private crypt: CryptService) {
    this.activeRoute.params.subscribe(params => {
      this.appId = params['id'];
      this.labUid = params['labuid'];
     console.log('app id == ',this.appId);
     console.log('labUid == ',this.labUid);
    });
   
    router.events.subscribe((event) => {
      this.getData();
    });
   }

   posts = [];
   UserId;
   appId;
   labUid;
   gst;
   cost;
   tests= [];
   allTotal = 0;

  ngOnInit() {
  }

  getData() {
    this._DataService.getlabInvoice(this.labUid,this.appId).subscribe((res) => {
      this.posts = res.data[0];
      this.tests = res.data[0].tests[0];
      this.gst = res.data[0].tests[0].gst;
      this.cost = res.data[0].tests[0].price;
     
      this.allTotal += (this.cost * this.gst) / 100;
      console.log('transactions_invoice :',this.posts);
       //console.log('cost :',this.cost);
      // console.log('gst :',this.gst);
       //console.log('allTotal :',this.allTotal);
    });
  }
  // getTotal() {
  //   let total = 0;
  // let marks = this.tests;
  // marks.forEach((item) => {
  //     total += Number((item.price * item.gst) / 100);
  //     console.log('total==',total)
  //   });
  
  //   return total;
  // }
  
  formatTime(time) {
    return moment(time).format('LLL');
  }

}

