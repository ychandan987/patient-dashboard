import { Component, OnInit } from '@angular/core';
import { ApigatewayService } from '../apigateway.service';
import { CryptService } from '../crypt.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ehospital-doctor-details',
  templateUrl: './ehospital-doctor-details.component.html',
  styleUrls: ['./ehospital-doctor-details.component.css'],
  providers: [ApigatewayService, CryptService]
})
export class EhospitalDoctorDetailsComponent implements OnInit {
  posts=[];
  hospId;
  specId;
  docId;
  docDetails;
  posts1 = [];
  appDetails;
  constructor(private _DataService: ApigatewayService, private router: Router,
    private activeRoute: ActivatedRoute, private crypt: CryptService) {
      this.activeRoute.params.subscribe(params => {
        this.hospId = params['id'];
        this.specId = params['specId'];
        this.docId = params['docId'];
      });
      this.getData().then((res) => {
        console.log("async res:", res);
        this.posts = res;
        for(let i=0; i<res.length; i++) {
          if(res[i].doctorid == this.docId){
            this.docDetails = res[i];
            console.log("Docdetails: ",this.docDetails);
          }
        }
      });
    }

  ngOnInit() {
    this._DataService.getEhospitalSpecializations()
    .subscribe((res)=> {
      console.log('Spec Result: ', res);
      this.posts1 = res.data;
      for(let i=0; i<this.posts1.length; i++){
        if(this.posts1[i].id==this.specId){
          this.appDetails=this.posts1[i];
        }
      }
      console.log('Spec Details: ',this.appDetails);
    });
  }

  async getData() {
    // Used type assertions to set promise type to array, which matches our result type.
    let promise = new Promise<any[]>((resolve, reject) => { 
      this._DataService.getEhospitalDoctors({'hospitalId':this.hospId,'SpecializationId':this.specId}).subscribe((res)=>{
        if(res.error==false){
          resolve(res.data);
        } else reject("Error");
        console.log("res: ",res);
      });
    });

    let result = await promise;

    return result;
  }

}
