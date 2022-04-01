import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ParticipantServiceService } from '../Services/participant-service.service';

@Component({
  selector: 'app-liste-participant',
  templateUrl: './liste-participant.component.html',
  styleUrls: ['./liste-participant.component.scss']
})
export class ListeParticipantComponent implements OnInit {
  listpart: any;
  id: any;
  participant:any;
  searchText=''; 
  
  constructor(
    private service : ParticipantServiceService,
    private route: Router,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.listepart();
  }
  
  
  async listepart(){
    this.service.listeparticipant().subscribe((res:any) =>{
      this.listpart = res;      
    })
  }

  delete(data: any){
    this.service.deleteParticipant(data).subscribe((datas: any)=>{
      window.location.reload();
      this.router.navigateByUrl('/liste-participant', {skipLocationChange: true}).then(()=>
      this.router.navigate(['liste-participant'])); 
    })
   
  }
}
