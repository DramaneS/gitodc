import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponsableServiceService } from 'src/app/Responsables/Services/responsable-service.service';
import { ActiviteServiceService } from '../Services/activite-service.service';

@Component({
  selector: 'app-ajout-activite-suite',
  templateUrl: './ajout-activite-suite.component.html',
  styleUrls: ['./ajout-activite-suite.component.scss']
})
export class AjoutActiviteSuiteComponent implements OnInit {
  id: any;
  activite: any;
  responsables: any;
  selected: any = [];
  coche: any = [];
  logActivite: any;
  searchText= '';
  responsableParActivite: any;
  tabError: any = [];
  tabSuccess: any = [];
  emailResp: any = [];

  constructor(
    private service: ActiviteServiceService,
    private serviceResponsable: ResponsableServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.service.detail(this.id).subscribe((data: any)=>{
      this.activite = data;
    });
    this.serviceResponsable.listeResponsable().subscribe((data: any)=>{
      this.responsables = data;
    });

    this.service.ResponsableParActivite(this.id).subscribe((data:any)=>{
      this.responsableParActivite = data;
    });
  }

  voir(index: any){
    //on verifie si le tableau contient l'objet
    if (this.selected.includes(index)){
      //si oui, on recupère l'indice de l'objet
      let i = this.selected.indexOf(index);
      //on le supprime
      this.selected.splice(i, 1);
    }else{
      //si non, on ajoute l'objet dans le tableau
      this.selected.push(index);
    }
    console.log(this.selected)
  }
  

  addListe(form: NgForm){
    //console.log("Formmmmmmm",this.selected[0]);
     for(let j =0; j<this.responsableParActivite.length; j ++){
       this.emailResp.push(this.responsableParActivite[j].responsable.email)
     }
     //console.log(this.emailResp);
    
    for(let i = 0; i<this.selected.length; i ++){
      if(this.emailResp.includes(this.selected[i].email)){
        this.tabError.push('erreur '+ this.selected[i].nom + '' + this.selected[i].nom + ' est déjà affecté à cet activité');
      }else{
        this.logActivite = {"responsable": this.selected[i], "activite": this.activite};
        this.service.AjoutLog(this.logActivite).subscribe((log: any)=>{
          this.tabSuccess.push('succès '+ this.selected[i].nom + '' + this.selected[i].nom + ' est affecté avec succès');
        //this.router.navigate(['liste-activite']);
      })
      } 
    }
   // console.log(this.tabError);
  }

}
