import { Component, OnInit } from '@angular/core';
import { ApigatewayService } from '../apigateway.service';
import { CryptService } from '../crypt.service';
import { ActivatedRoute,Router } from '@angular/router';
import * as moment from 'moment';
// import * as jsPDF from 'jspdf';
// import * as html2canvas from 'html2canvas';

@Component({
  selector: 'app-invoice-doctor',
  templateUrl: './invoice-doctor.component.html',
  styleUrls: ['./invoice-doctor.component.css'],
  providers: [ApigatewayService, CryptService]
})
export class InvoiceDoctorComponent implements OnInit {

  constructor(private _DataService:ApigatewayService, private router: Router, private activeRoute:ActivatedRoute, private crypt: CryptService) {
    this.activeRoute.params.subscribe(params => {
      this.appId = params['id'];
     console.log('appId == ',this.appId);
    });
   
    router.events.subscribe((event) => {
      this.getData();
    });
   }

   posts = [];
   UserId;
   appId;

  ngOnInit() {
  }
  getData() {
    this._DataService.getDoctorTransactionView(this.appId).subscribe((res) => {
      this.posts = res.data[0];
      console.log('transactions_invoice :',this.posts);
    });
  }
  formatTime(time) {
    return moment(time).format('LL');
  }

  // download() {
    
  //   html2canvas(document.querySelector("#form1")).then(canvas => {
  //     var pdf = new jsPDF('l', 'mm', [canvas.width, canvas.height]);
  //     var imgData  = canvas.toDataURL("image/jpeg", 1.0);
  //     var width = pdf.internal.pageSize.getWidth();    
  //     var height = pdf.internal.pageSize.getHeight();
  //     pdf.addImage(imgData,0,0,canvas.width, canvas.height);
  //     pdf.save('doctor_invoice.pdf');    
  //     });
  // }

}
