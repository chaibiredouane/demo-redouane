import { Component, Inject, OnInit, Optional } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { PersonModel } from 'src/app/models/person.model';

import { NgModule } from '@angular/core'; 
import { BrowserModule } from '@angular/platform-browser'; 
import { FormsModule } from '@angular/forms'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
  
@Component({
  selector: 'app-person-dialog',
  templateUrl: './person-dialog.component.html',
  styleUrls: ['./person-dialog.component.scss', '../../../styles.scss']
})
export class PersonDialogComponent implements OnInit {

  local_data: any;
  dataSource: any;
  initialData: any;
  source = '';


  constructor(public dialogRef: MatDialogRef<PersonDialogComponent>
    , @Optional() @Inject(MAT_DIALOG_DATA) public data: PersonModel) {
    this.local_data = { ...data };
    this.dataSource = Object.assign({}, this.local_data.dataSource);
  }

  ngOnInit(): void {

  }

  getIconAction(action: string) {
    return action == 'UPDATE' ? 'edit' : 'add';
  }


  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

  isInvalidForm() {
    return this.dataSource?.name == null || this.dataSource?.email == null
  }

  async doAction() {
    this.dialogRef.close({ event: this.local_data.action, data: this.dataSource });
  }

}
