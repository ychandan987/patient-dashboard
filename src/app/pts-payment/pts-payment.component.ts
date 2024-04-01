import { Component, OnInit } from '@angular/core';
import { ApigatewayService } from '../apigateway.service';
import { CryptService } from '../crypt.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pts-payment',
  templateUrl: './pts-payment.component.html',
  styleUrls: ['./pts-payment.component.css'],
  providers: [ApigatewayService, CryptService]
})
export class PtsPaymentComponent implements OnInit {

  constructor(private _DataService: ApigatewayService, private router: Router,
    private activeRoute: ActivatedRoute, private crypt: CryptService) { }

  ptsId;
  posts;
  commonData;
  transId;
  chId="";
  paymentId;
  currentUser = JSON.parse(this.crypt.get('currentUser'));
  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      this.ptsId = params['ptsId'];
      this.transId = params['transId'];
      this.chId = params['id'];
      this.paymentId = params['payId'];
    });

    if (this.router.url.includes('/lab-tests/')) {
      this._DataService.getPTSLabServices({"ptsId" : this.ptsId, "transactionId" : this.transId}).subscribe((res)=>{
        this._DataService.updatePTSPayment({
          "PtsId":this.ptsId,
          "pts_medicine_id":"",
          "pts_lab_id":res.data[0].pts_lab_id,
          "pts_venderProducts_id":"",
          "pts_venderservice_id":"",
          "pts_doctorconsult_ch_id":"",
          "payment_mode":"ONLINE",
          "paymentconfirmation":"true",
          "payment_id":this.paymentId
        }).subscribe((res) => {
          console.log("payment response: ",res)
        })
      });
    } else if (this.router.url.includes('/pharmacy/')) {
      this._DataService.getPTSMedicines({"ptsId" : this.ptsId, "transactionId" : this.transId}).subscribe((res)=>{
        this._DataService.updatePTSPayment({
          "PtsId":this.ptsId,
          "pts_medicine_id":res.data[0].pts_medicine_id,
          "pts_lab_id":"",
          "pts_venderProducts_id":"",
          "pts_venderservice_id":"",
          "pts_doctorconsult_ch_id":"",
          "payment_mode":"ONLINE",
          "paymentconfirmation":"true",
          "payment_id":this.paymentId
        }).subscribe((res) => {
          console.log("payment response: ",res)
        })
      });
    } else {

      this._DataService.getPTSAppointments({"ptsId" : this.ptsId, "transactionId" : this.transId}).subscribe((res)=>{
        // console.log("res: ",res);
        this.commonData = res.data[0];
        for (let i = 0; i < res.griddata.length; i++) {
          if(res.griddata[i].pts_doctorconsult_ch_id == this.chId){
            this.posts = res.griddata[i];
            console.log("Posts: ",this.posts);
           
          };
        }
      });
      // console.log("pts_doctorconsult_id: ",this.posts.pts_doctorconsult_id);
      console.log("Posts2222: ",this.posts);
      this._DataService.updatePTSPayment({
        "PtsId":this.ptsId,
        "pts_medicine_id":"",
        "pts_lab_id":"",
        "pts_venderProducts_id":"",
        "pts_venderservice_id":"",
        "pts_doctorconsult_id":"",
        "pts_doctorconsult_ch_id":this.chId,
        "payment_mode":"ONLINE",
        "paymentconfirmation":"true",
        "payment_id":this.paymentId
      }).subscribe((response) => {
        
        if(response.message == 'success')
          {
            console.log("Posts1111: ",this.posts);
            // alert("Accepted");http://localhost:4200/#/e-hospital/pts/this.ptsId/this.transId/appointments/this.chId/details/pay/this.paymentId
            this.router.navigate(['e-hospital/pts/'+this.ptsId+'/'+this.transId+'/appointments/'+this.chId+'/details/pay/'+this.paymentId+'']);
            // location.reload();

            this._DataService.bookEhospitalAppointment({
              "DoctorId":this.posts.doctorId,
              "patientId":this.currentUser.unique_id,
              "patientName":this.currentUser.first_name,
              "AppointmentDate":this.posts.pts_doctorconsult_ch_date,
              "AppointmentTime":this.posts.pts_doctorconsult_ch_timeSlots,
              "AppointmentIdType" : this.posts.pts_doctorconsult_ch_consultMode,
              "mobileNumber" : this.currentUser.mobile_no,
              "emailId" : this.currentUser.email,
              "Description":this.posts.pts_doctorconsult_ch_details    
            }).subscribe((resultConfirm) => {
              console.log("success :",resultConfirm.message);
            })
          }
        else{
          console.log("error");
        }
      })

    }
  }

}
