import { Component, OnInit } from '@angular/core';
import { ApigatewayService } from '../apigateway.service';
import { CryptService } from '../crypt.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ehospital-specializations',
  templateUrl: './ehospital-specializations.component.html',
  styleUrls: ['./ehospital-specializations.component.css'],
  providers: [ApigatewayService, CryptService]
})
export class EhospitalSpecializationsComponent implements OnInit {

  constructor(private _DataService: ApigatewayService, private router: Router,
    private activeRoute: ActivatedRoute, private crypt: CryptService) { }
  posts;

  ngOnInit() {
    this._DataService.getEhospitalSpecializations().subscribe((res)=>{
      console.log("res2: ",res);
      this.posts = res.data;
    });


  }

}
