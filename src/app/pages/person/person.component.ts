import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PersonModel } from 'src/app/models/person.model';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  personList: PersonModel[] = [];
  constructor(private personService: PersonService) { }
  // @ViewChild('paginator') paginator: MatPaginator = new MatPaginator();
  displayedColumns = ['id', 'name', 'email'];
  //  dataSource: MatTableDataSource<PersonModel> = new MatTableDataSource();

  dataSource = new MatTableDataSource<PersonModel>();
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true })
  sort!: MatSort;
  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.personService.getPersons().subscribe((data: PersonModel[]) => {
      this.personList = data;
      this.dataSource = new MatTableDataSource<PersonModel>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      /* console.log(JSON.stringify(data));
       let _find = this.personList.find(x => x.email == 'chaibi.redouane@gmail.com');
       console.log(JSON.stringify(_find));
       if (_find != null) {
         _find.name = 'REDOUANE UPDATE';
         this.personService.updatePerson(_find).subscribe();
       }*/
    });
  }

  createItem() {
    const p = new PersonModel();
    p.name = 'NEW PERSON';
    p.email = 'TEST@NEW.COM'
    this.personService.createPerson(p).subscribe(data => {
      this.loadData();
    })
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
