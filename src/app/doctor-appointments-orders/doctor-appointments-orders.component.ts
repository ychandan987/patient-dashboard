import { Component, OnInit, ViewChild } from '@angular/core';
import { ApigatewayService } from '../apigateway.service';
import { CryptService } from '../crypt.service';
import { ActivatedRoute,Router } from '@angular/router';
import * as moment from 'moment';
import { MyMaterialModule } from  '../material.module';
import {MatSort,MatPaginator, MatTableDataSource} from '@angular/material';
import {MatPaginatorModule} from '@angular/material/paginator';

@Component({
  selector: 'app-doctor-appointments-orders',
  templateUrl: './doctor-appointments-orders.component.html',
  styleUrls: ['./doctor-appointments-orders.component.css'],
  providers: [ApigatewayService, CryptService]
})
export class DoctorAppointmentsOrdersComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
   displayedColumns: string[] = ['id','appid','labname','type','fees','location','appdate','status','action'];
   dataSource: MatTableDataSource < Element[] > ;

  constructor(private _DataService: ApigatewayService, private crypt: CryptService) { }
  currentUser = JSON.parse(this.crypt.get('currentUser'));
  doc_app;

  ngOnInit() {

    this._DataService.getDoctorAppointmentPaymentList(this.currentUser.unique_id).subscribe((res)=>{      
      console.log('list : ',res.data);   
      this.doc_app = res.data;
      this.dataSource = new MatTableDataSource(res.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();    
  }
  formatTime(time){
    return moment(time).format('LLL');
  }

}
