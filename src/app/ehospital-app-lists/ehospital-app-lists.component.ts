import { Component, OnInit, ViewChild } from '@angular/core';
import { ApigatewayService } from '../apigateway.service';
import { CryptService } from '../crypt.service';
import { ActivatedRoute,Router } from '@angular/router';
import * as moment from 'moment';
import { MyMaterialModule } from  '../material.module';
import {MatSort,MatPaginator, MatTableDataSource} from '@angular/material';
import {MatPaginatorModule} from '@angular/material/paginator';

@Component({
  selector: 'app-ehospital-app-lists',
  templateUrl: './ehospital-app-lists.component.html',
  styleUrls: ['./ehospital-app-lists.component.css'],
  providers: [ApigatewayService, CryptService]
})
export class EhospitalAppListsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['appid', 'username', 'doctorname', 'hospitalname','created_on','appTime','status','action','report'];
  dataSource: MatTableDataSource < Element[] > ;

  constructor(private _DataService: ApigatewayService, private router: Router,
    private activeRoute: ActivatedRoute, private crypt: CryptService) {
      this.activeRoute.params.subscribe(params => {
        this.hospId = params['hospId'];
        //console.log("followUp",this.followUp);
      });

      router.events.subscribe((event) => {
        this.getData();
      });
     }
  
    
  posts;
  hospId;
  followUp = 'followUp';
  currentUser = JSON.parse(this.crypt.get('currentUser'));
  AppointmentId;
  DoctorId;
  patientId;
  ngOnInit() {
    // this.activeRoute.params.subscribe(params => {
    //   this.hospId = params['hospId'];
    //   console.log("followUp",this.followUp);
    // });
    // this._DataService.getAppointments({"patientId" : this.currentUser.unique_id, "hospitalId" : this.hospId}).subscribe((res)=>{
    //   console.log("res: ",res);
    //   this.posts = res.data;
    // });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getData() {
    this._DataService.getAppointments({"patientId" : this.currentUser.unique_id, "hospitalId" : this.hospId}).subscribe((res)=>{
      this.posts = res.data;
      this.dataSource = new MatTableDataSource(this.posts);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log('posts :',res.data);
    });
  }
  

  formatTime(time){
    return moment(time).format('LL');
  }

}
