import { Component, OnInit, ViewChild } from '@angular/core';
import { ApigatewayService } from '../apigateway.service';
import { CryptService } from '../crypt.service';
import { ActivatedRoute,Router } from '@angular/router';
import * as moment from 'moment';
import { MyMaterialModule } from  '../material.module';
import {MatSort,MatPaginator, MatTableDataSource} from '@angular/material';
import {MatPaginatorModule} from '@angular/material/paginator';

@Component({
  selector: 'app-medicine-orders',
  templateUrl: './medicine-orders.component.html',
  styleUrls: ['./medicine-orders.component.css'],
  providers: [ApigatewayService, CryptService]
})
export class MedicineOrdersComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
   displayedColumns: string[] = ['id','labname','location','appdate','status','action'];
   dataSource: MatTableDataSource < Element[] > ;

  constructor(private _DataService: ApigatewayService, private crypt: CryptService) { }
  currentUser = JSON.parse(this.crypt.get('currentUser'));
  orders;

  ngOnInit() {
    this._DataService.getAllPharmacyOrders(this.currentUser.unique_id).subscribe(res => {
      this.orders = res.data;
      console.log("orders ", res.data);
      this.dataSource = new MatTableDataSource(res.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log("orders length == ",res.data.length);
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();    
  }
  formatTime(time){
    return moment(time).format('LL');
  }

}
