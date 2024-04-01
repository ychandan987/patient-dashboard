import { Component, OnInit, ViewChild } from '@angular/core';
import { ApigatewayService } from '../apigateway.service';
import { CryptService } from '../crypt.service';
import { ActivatedRoute,Router } from '@angular/router';
import * as moment from 'moment';
import { MyMaterialModule } from  '../material.module';
import {MatSort,MatPaginator, MatTableDataSource} from '@angular/material';
import {MatPaginatorModule} from '@angular/material/paginator';

@Component({
  selector: 'app-pharm-hosp-list',
  templateUrl: './pharm-hosp-list.component.html',
  styleUrls: ['./pharm-hosp-list.component.css'],
  providers: [ApigatewayService, CryptService]
})
export class PharmHospListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
   displayedColumns: string[] = ['id','hospitalname','location','phoneoffice','action'];
   dataSource: MatTableDataSource < Element[] > ;

  constructor(private _DataService: ApigatewayService, private router: Router, private activeRoute: ActivatedRoute,private crypt: CryptService) {
    router.events.subscribe((event) => {
      this.getData();
    });
   }
   labs;
    posts;
    approval = 1;

  ngOnInit() {
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();    
  }
  getData() {
    this._DataService.getEhospitalsDOc({"approval" : 1}).subscribe((res)=>{
      this.labs = res.data;
      this.dataSource = new MatTableDataSource(res.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      });
  }

}
