import { Component, OnInit } from '@angular/core';
import { ApigatewayService } from '../apigateway.service';
import { CryptService } from '../crypt.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ehospital-doctors',
  templateUrl: './ehospital-doctors.component.html',
  styleUrls: ['./ehospital-doctors.component.css'],
  providers: [ApigatewayService, CryptService]
})
export class EhospitalDoctorsComponent implements OnInit {

  constructor(private _DataService: ApigatewayService, private router: Router,
    private activeRoute: ActivatedRoute, private crypt: CryptService) {
      this.activeRoute.params.subscribe(params => {
        this.hospId = params['id'];
        this.specId = params['specId']
      });
    }
  posts;
  hospId;
  specId;

  ngOnInit() {
    this._DataService.getEhospitalDoctors({'hospitalId':this.hospId,'SpecializationId':this.specId}).subscribe((res)=>{
      console.log("res: ",res);
      this.posts = res.data;
    });
  }

}
