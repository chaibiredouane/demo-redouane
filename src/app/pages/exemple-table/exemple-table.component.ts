import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { PersonDialogComponent } from 'src/app/dialogs/person-dialog/person-dialog.component';
import { PersonModel } from 'src/app/models/person.model';
import { PersonService } from 'src/app/services/person.service';



@Component({
  selector: 'app-exemple-table',
  templateUrl: './exemple-table.component.html',
  styleUrls: ['./exemple-table.component.scss', '../../../styles.scss']
})
export class 
ExempleTableComponent implements OnInit, AfterViewInit {
  searchTableField = '';
  searchUnderTableField = '';
  dataSource = new MatTableDataSource<PersonModel>();
  displayedColumns: string[] = ['#', 'id', 'name', 'email', 'status', 'actions'];
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatTable, { static: true }) table: MatTable<any> | undefined;

  constructor(private personService: PersonService, private dialog:MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }



  loadData() {
    this.personService.getPersons().subscribe((data: PersonModel[]) => {
      if (data != null && data.length > 0) {
        this.dataSource = new MatTableDataSource<PersonModel>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filter = this.searchTableField;
      }
    },
      error => {
        console.log(error.message);
      });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.applyCustomFilter();
    this.dataSource.filter = filterValue == null ? '' : filterValue.trim().toLowerCase();
  }

  applyCustomFilter() {

  }

  clearTableFilter() {
    this.searchTableField = '';
    this.dataSource.filter = '';
  }

  getColor(value: boolean) {
    return status ? 'green' : 'red';
  }

  openDialog(action: string, row: PersonModel) {
    const obj = {
      action: action,
      dataSource: row == null ? new PersonModel() : row,
    };
   const dialogRef = this.dialog.open(PersonDialogComponent, {
      width: '450px',
      data: obj,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'ADD') {
        this.createItem(result.data);
      } else if (result.event === 'UPDATE') {
        this.updateItem(result.data);
      }
    });
    
  }

  updateItem(item: PersonModel) {
    this.personService.updatePerson(item).subscribe(data => {
      this.loadData();
    });
  }

  deleteItem(item: PersonModel) {
    const _id = item.id;
    if (_id != null) {
      this.personService.deletePerson(+_id).subscribe(data => {
        console.log('delete');
        this.loadData();
      })
    }
  }

  createItem(item: PersonModel) {
    this.personService.createPerson(item).subscribe(data => {
      this.loadData();
    })
  }

}
