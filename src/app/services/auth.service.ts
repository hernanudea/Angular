import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty';
  private apiKey = 'AIzaSyBDqJEak0ssc0_a3u7PYNkPoVW8otlSrgE';
  private userToken: string;


  // Crear usuario
  // https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=[API_KEY]

  // login
  // https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=[API_KEY]

  constructor(private http: HttpClient) {
    this.leerToken();
  }

  logout() {

  }

  login(usuario: UsuarioModel) {
    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}/verifyPassword?key=${this.apiKey}`, authData
    ).pipe(
      map(resp => {
        console.log('Entró al map del RXJS');
        this.guardarToken(resp['tokenId']);
        return resp;
      })
    );
  }

  registrarUsuario(usuario: UsuarioModel) {

    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}/signupNewUser?key=${this.apiKey}`, authData
    ).pipe(
      map(resp => {
        console.log('Entró al map del RXJS');
        this.guardarToken(resp['tokenId']);
        return resp;
      })
    );
  }

  private guardarToken(tokenId: string) {
    this.userToken = tokenId;
    localStorage.setItem('token', tokenId)
  }

  private leerToken() {
    if (sessionStorage.getItem('token')) {
      this.userToken = sessionStorage.getItem('token');
    } else {
      this.userToken = '';
    }
  }
}
