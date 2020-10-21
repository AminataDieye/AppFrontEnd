
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Tache } from 'src/app/model/tache';


@Component({
  selector: 'app-liste-tache',
  templateUrl: './liste-tache.component.html',
  styleUrls: ['./liste-tache.component.css']
})
export class ListeTacheComponent implements OnInit {
  TacheData: any = [];
  dataSource: MatTableDataSource<Tache>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['titre', 'description', 'date', 'icon','action'];

  constructor(private tacheService : ApiService) { 
    this.tacheService.getTaches().subscribe(data => {
      this.TacheData = data;
      this.dataSource = new MatTableDataSource<Tache>(this.TacheData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
    
      }, 0);
      console.log(this.TacheData);
    })    

  }

  ngOnInit(){
  }

 

  removeTache(tache, index) {
 
if(window.confirm('Voulez vous supprimer')) {
  const data = this.dataSource.data;
  data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
  this.dataSource.data = data;
  this.tacheService.supprimerTache(tache._id).subscribe()
} 
}
trieDateCroissant()
{this.tacheService.dateCroissant().subscribe(data => {
  this.TacheData = data;
  this.dataSource = new MatTableDataSource<Tache>(this.TacheData);
  setTimeout(() => {
    this.dataSource.paginator = this.paginator;

  }, 0);
  console.log(this.TacheData);
}) } 

trieDateDecroissant()
{this.tacheService.dateDecroissant().subscribe(data => {
  this.TacheData = data;
  this.dataSource = new MatTableDataSource<Tache>(this.TacheData);
  setTimeout(() => {
    this.dataSource.paginator = this.paginator;

  }, 0);
  console.log(this.TacheData);
}) } 
}