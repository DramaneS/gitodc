import { Component, OnInit } from '@angular/core';
import { ActiviteServiceService } from 'src/app/Activites/Services/activite-service.service';
import { Table } from 'primeng/table';
@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.scss']
})
export class StatistiqueComponent implements OnInit {
  listes: any;
  nbreActivite: any;

  loading: boolean = true;
  activityValues: number[] = [0, 100];

  constructor(private service : ActiviteServiceService) { }

  ngOnInit(): void {
    this.getAll();
  }
  getAll(){
    this.service.getAllList().subscribe((data:any)=> {
      this.listes = data;
      console.log('-----------' ,data.length);
      for(let i = 0; i<this.listes.length; i++){
        this.nbreActivite = this.nbreActivite +1;
        }
    })
  }
  clear(table: Table) {
    table.clear();
}
}



