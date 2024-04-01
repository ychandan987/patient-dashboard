import { Component, OnInit } from '@angular/core';
import { ApigatewayService } from '../apigateway.service';
import { CryptService } from '../crypt.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ehospital-lists',
  templateUrl: './ehospital-lists.component.html',
  styleUrls: ['./ehospital-lists.component.css'],
  providers: [ApigatewayService, CryptService]
})
export class EhospitalListsComponent implements OnInit {

  constructor(private _DataService: ApigatewayService, private router: Router,
    private activeRoute: ActivatedRoute, private crypt: CryptService) { }
  posts;
  approval = 1;
  ngOnInit() {
    this._DataService.getEhospitalsDOc({"approval" : 1}).subscribe((res)=>{
      console.log("res: ",res);
      this.posts = res.data;
    });

    



  }

}
