import { Component, OnInit } from '@angular/core';
import { ApigatewayService } from '../apigateway.service';
import { CryptService } from '../crypt.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-new-pts-list',
  templateUrl: './new-pts-list.component.html',
  styleUrls: ['./new-pts-list.component.css'],
  providers: [ApigatewayService, CryptService]
})
export class NewPtsListComponent implements OnInit {

  constructor(private _DataService: ApigatewayService, private router: Router,
    private activeRoute: ActivatedRoute, private crypt: CryptService) { }

    posts;
  posts1;
  docId;
  
  currentUser = JSON.parse(this.crypt.get('currentUser'));

  isPTS = false;


  ngOnInit() {
    if (this.router.url.includes('/pts/')) {
      this.isPTS = true;
    }
    if(this.isPTS == true){

      this._DataService.getAllPTS({"patientId" : this.currentUser.unique_id}).subscribe((res)=>{
        console.log("res: ",res);
        this.posts = res.data;
      });

    }

    else{
      this._DataService.getAllEhosApt({"patientId" : this.currentUser.unique_id}).subscribe((res)=>{
        console.log("res: ",res);
        this.posts = res.data;
      });
    }

}

formatTime(time){
  return moment(time).format('LLL');
}
}