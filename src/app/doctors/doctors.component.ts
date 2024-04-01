import { Component, OnInit } from '@angular/core';
import { ApigatewayService } from '../apigateway.service';
import { CryptService } from '../crypt.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css'],
  providers: [ApigatewayService, CryptService]
})
export class DoctorsComponent implements OnInit {

  constructor(private _DataService: ApigatewayService, private crypt: CryptService) {
    this._DataService.getSpecializations().subscribe(res => {
      this.specs = res.data;
    });
  }
  currentUser = JSON.parse(this.crypt.get('currentUser'));
  specs = [];
  selectedSpec;
  doctors = [];
  selectedItems = [];
  dropdownSettings = {};

  ngOnInit() {
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'specialization',
      itemsShowLimit: 10,
      allowSearchFilter: true
    };
  }

  onSelect(item) {
    this._DataService.getSpecwiseDoctors(item.id).subscribe(res => {
      this.doctors = res.data;
    });
  }

}
