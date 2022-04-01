import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponsableServiceService } from 'src/app/Responsables/Services/responsable-service.service';
import { ActiviteServiceService } from '../Services/activite-service.service';
import { Message } from "primeng/api";

@Component({
  selector: 'app-ajout-responsable-activite',
  templateUrl: './ajout-responsable-activite.component.html',
  styleUrls: ['./ajout-responsable-activite.component.scss']
})
export class AjoutResponsableActiviteComponent implements OnInit {
  responsables = {nom: '', prenom: '', telephone: '', email: '', domaine: '',type:''}
  id: any;
  activite: any;
  respons: any;
  responsable: any;
  logActivite: any;
  logActivite2: any;
  responsableParActivite: any;
  responsableParRes: any;
  
  errorEmailResp!: Message[];
  errorEmailResp1!: Message[];
  respExistant: any;
  res: any;

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

    this.service.ResponsableParActivite(this.id).subscribe((data:any)=>{
      this.responsableParActivite = data;
    });

    this.serviceResponsable.listeResponsable().subscribe((data: any)=>{
        this.responsableParRes = data;
          console.log(this.responsableParRes);
    });
    
  }

  ajoutResponsables(form: NgForm){
    this.respons = {
                    "nom": form.value['nom'], 
                    "prenom": form.value['prenom'],
                    "telephone": form.value['telephone'],
                    "domaine": form.value['domaine'],
                    "email": form.value['email'],
                    "etat": "active",
                    "type": form.value['type'],
                  };

  for(let i=0; i<this.responsableParActivite.length; i++){    
    if(this.responsableParActivite[i].responsable.email == form.value['email']){
      this.errorEmailResp = [{detail: "Ce Responsable est déjà affecté à cet activité !"}];
      console.log(this.errorEmailResp);
    }
  }

  for(let i=0; i<this.responsableParRes.length; i++){    
    if(this.responsableParRes[i].email == form.value['email']){
      this.errorEmailResp1 = [{detail: "Ce Responsable existe déjà !"}];
      this.serviceResponsable.detailResponsable(this.responsableParRes[i].id_responsable).subscribe((data: any)=>{
        console.log(data);
        this.respExistant = data;
      })
      
    }
  }
  
  if(this.errorEmailResp1 != []){
    if(this.errorEmailResp != []){
      this.serviceResponsable.ajoutResponsale(this.respons).subscribe((data:any)=>{
        this.responsable = data;
          this.logActivite = {"responsable": this.responsable, "activite": this.activite}
          this.service.AjoutLog(this.logActivite).subscribe((log: any)=>{
            this.router.navigate(['liste-activite'])
          })
        });
    }else{
      this.errorEmailResp =  [{detail: "Ce Responsable est déjà affecté à cet activité !"}];
    }
  }else{
    this.errorEmailResp1 = [{detail: "Ce Responsable existe déjà !"}];
  }
  }

  affecterResp(data: any){
    this.serviceResponsable.detailResponsable(data).subscribe((datas: any)=>{
      this.res = datas;
      this.logActivite2 = {"responsable": this.res, "activite": this.activite};
      this.service.AjoutLog(this.logActivite2).subscribe((log: any)=>{
        this.router.navigateByUrl('detail-activite/'+ this.activite.id_activite, {skipLocationChange: true}).then(()=>
        this.router.navigate(['detail-activite', this.activite.id_activite])); 
      })
    })
    
    
  }

}
