import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import { categorie } from './categorie';
import { question } from './question';
import { reponse } from './reponse';
import { reponsescorrectes } from './reponsescorrectes';

@Injectable({
    providedIn: 'root'
  })

export class ApiQuizzable{

    private url = 'http://localhost:8080';

    constructor(private http: HttpClient) { }

    public getCategorie(idc :String):Observable<categorie>{
        return this.http.get<categorie>(`${this.url}/categorie`+idc);
    }

    public getListeCat() :Observable<categorie[]>{
        return this.http.get<categorie[]>(`${this.url}/listeCat`);
    }

    public getQuestion(idq :String):Observable<question>{
        return this.http.get<question>(`${this.url}/question`+idq);
    }

    public getListeQuestion():Observable<question[]>{
        return this.http.get<question[]>(`${this.url}/listeQuestions`);
    }

    public getReponse(idr :String):Observable<reponse>{
        return this.http.get<reponse>(`${this.url}/categorie`+idr);
    }

    public getListeReponse():Observable<reponse[]>{
        return this.http.get<reponse[]>(`${this.url}/listeRep`);
    }

    public getRepCorrecte(idrc :String) :Observable<reponsescorrectes>{
        return this.http.get<reponsescorrectes>(`${this.url}/categorie`+idrc);
    }

    public getListeRepCorrecte() :Observable<reponsescorrectes[]>{
        return this.http.get<reponsescorrectes[]>(`${this.url}/categorie`);
    }

}