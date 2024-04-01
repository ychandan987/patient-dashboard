import { Component, OnInit, ViewChild } from '@angular/core';
import { ApigatewayService } from '../apigateway.service';
import { CryptService } from '../crypt.service';
import { ActivatedRoute,Router } from '@angular/router';
import * as moment from 'moment';
import { MyMaterialModule } from  '../material.module';
import {MatSort,MatPaginator, MatTableDataSource} from '@angular/material';
import {MatPaginatorModule} from '@angular/material/paginator';

@Component({
  selector: 'app-hosp-lab-items',
  templateUrl: './hosp-lab-items.component.html',
  styleUrls: ['./hosp-lab-items.component.css'],
  providers: [ApigatewayService, CryptService]
})
export class HospLabItemsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
   displayedColumns: string[] = ['id','labname','price','action'];
   dataSource: MatTableDataSource < Element[] > ;

  constructor(private _DataService: ApigatewayService, private router: Router, private activeRoute: ActivatedRoute,private crypt: CryptService) {
    this.activeRoute.params.subscribe(params => {
      this.hospId = params['id'];
      console.log("hospId :"+this.hospId);
    });
    router.events.subscribe((event) => {
      this.getData();
    });
   }
   labs;
   hospId;

  ngOnInit() {
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();    
  }
  getData() {
    this._DataService.lab_items({"hospitalId" : "201901040006","LabId" : "000010"}).subscribe(res => {
     this.labs = res.data;
     console.log("labs :",this.labs);
     this.dataSource = new MatTableDataSource(res.data);
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
     });
 }

}
