import { Component, OnInit, ViewChild } from '@angular/core';
import { ApigatewayService } from '../apigateway.service';
import { CryptService } from '../crypt.service';
import { ActivatedRoute,Router } from '@angular/router';
import * as moment from 'moment';
import { MyMaterialModule } from  '../material.module';
import {MatSort,MatPaginator, MatTableDataSource} from '@angular/material';
import {MatPaginatorModule} from '@angular/material/paginator';

@Component({
  selector: 'app-lab-appointments',
  templateUrl: './lab-appointments.component.html',
  styleUrls: ['./lab-appointments.component.css'],
  providers: [ApigatewayService, CryptService]
})
export class LabAppointmentsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
   displayedColumns: string[] = ['id','appId','labname','type','fees','location','appdate','status','action'];
   dataSource: MatTableDataSource < Element[] > ;

  constructor(private _DataService: ApigatewayService, private crypt: CryptService) { }
  currentUser = JSON.parse(this.crypt.get('currentUser'));
  appointments;
  profile;
  ngOnInit() {
    this._DataService.getAllLabAppointmentList(this.currentUser.unique_id, 0).subscribe(res => {
      this.appointments = res.data;
      console.log('app == ',this.appointments);
      this.dataSource = new MatTableDataSource(res.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();    
  }
  formatTime(time){
    return moment(time).format('LL');
  }

}
