import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { UsuarioModel } from '../../models/usuario.model';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel;
  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
  }

  login(form: NgForm) {
    if (form.valid) {
      Swal.fire({
        allowOutsideClick: false,
        type: 'info',
        text: 'Espere por favor...'
      });
      Swal.showLoading();
      this.auth.login(this.usuario)
        .subscribe(rest => {
          console.log(rest);
          Swal.close();
          this.router.navigateByUrl('/home');
        }, (err) => {
          console.log(err.error.error.message);
          Swal.fire({
            type: 'error',
            title: 'Error al autenticar!',
            text: err.error.error.message
          });
        });
    }
  }
}
