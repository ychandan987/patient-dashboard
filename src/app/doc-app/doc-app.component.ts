import { Component, OnInit } from '@angular/core';
import { ApigatewayService } from '../apigateway.service';
import { CryptService } from '../crypt.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-doc-app',
  templateUrl: './doc-app.component.html',
  styleUrls: ['./doc-app.component.css'],
  providers: [ApigatewayService, CryptService]
})
export class DocAppComponent implements OnInit {

  constructor(private _DataService: ApigatewayService, private router: Router,
    private activeRoute: ActivatedRoute, private crypt: CryptService) { }
    posts;
  
    currentUser = JSON.parse(this.crypt.get('currentUser'));
  
    isPTS = false;
  
    ngOnInit() {
      this._DataService.getAppointments({"patientId" : this.currentUser.unique_id,"hospitalId" : ''}).subscribe((res)=>{
        console.log("res: ",res);
        this.posts = res.data;
      });
    }
}
