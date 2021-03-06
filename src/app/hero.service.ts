import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';

@Injectable()
export class HeroService {

    private heroesUrl = 'http://146.148.55.224/test/heroes.php'; //URL to web api: pro: 146.148.55.224
    private headers = new Headers({'Content-Type': 'application/json'});
   
    constructor(private http: Http){}

    getHeroes(): Promise<Hero[]>{
        return this.http.get(this.heroesUrl)
                .toPromise()
                .then(response => response.json() as Hero[])
                .catch(this.handleError);
        /*return Promise.resolve(HEROES);*/
    }

    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }

    getHeroesSlowly(): Promise<Hero[]> {
        return new Promise<Hero[]>(resolve =>
            setTimeout(resolve, 2000)) // delay 2 seconds
    .then(() => this.getHeroes());
    }

    getHero(id: number): Promise<Hero>{
        const url = `${this.heroesUrl}?id=${id}`;
        return this.http.get(url)
                .toPromise()
                .then(response => response.json() as Hero)
                .catch(this.handleError);
        //return this.getHeroes().then(heroes => heroes.find(hero => hero.id === id));
    }

    update(hero: Hero): Promise<Hero> {
      const url = `${this.heroesUrl}`;
      //const url = `http://192.168.0.22/test/put.php`;
      return this.http
            .put(url, JSON.stringify(hero), {headers: this.headers})
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);
    }
    
    create(name: string): Promise<Hero> {
      return this.http
        .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
        .toPromise()
        .then(res => res.json())
        .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.heroesUrl}?id=${id}`;
        return this.http.delete(url, {headers: this.headers})
                .toPromise()
                .then(() => null)
                .catch(this.handleError);
    }
}