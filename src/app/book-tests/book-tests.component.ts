import { Component, OnInit } from '@angular/core';
import { ApigatewayService } from '../apigateway.service';
import { CryptService } from '../crypt.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-tests',
  templateUrl: './book-tests.component.html',
  styleUrls: ['./book-tests.component.css'],
  providers: [ApigatewayService]
})
export class BookTestsComponent implements OnInit {

  constructor(private _DataService: ApigatewayService, private crypt: CryptService,
     private router: Router, private activeRoute: ActivatedRoute) {
    this.activeRoute.params.subscribe(params => {
      this.labId = params['id'];
    });
    this._DataService.getAllCategoriesTests(this.labId).subscribe(res => {
      this.specs = res.data;
      console.log('cat ', this.specs);
    });
  }
  currentUser = JSON.parse(this.crypt.get('currentUser'));
  specs = [];
  selectedSpec;
  tests = [];
  selectedItems = [];
  dropdownSettings = {};
  labId;

  ngOnInit() {
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'category',
      allowSearchFilter: true
    };

    this._DataService.getAllSpecificTests(this.labId).subscribe(res => {
      this.tests = res.data;
    });
  }

  onSelect(item) {
    this.selectedSpec = item.id;
    this._DataService.getAllSpecificTests(this.labId).subscribe(res => {
      this.tests = res.data;
    });
  }

}
