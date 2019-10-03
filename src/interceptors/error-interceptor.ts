import {Injectable} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AlertController} from '@ionic/angular';
import {StorageService} from '../services/storage.service';
import {FieldMessage} from '../models/fieldmessage';
import {catchError} from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService, public alertCtrl: AlertController) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .pipe(catchError((error: HttpErrorResponse) => {

                let errorObj = error.error;
                if (!errorObj.status) {
                    errorObj = JSON.parse(errorObj);
                }

                console.log(errorObj);

                switch (errorObj.status) {
                    case 401:
                        this.handle401();
                        break;

                    case 403:
                        this.handle403();
                        break;

                    case 422:
                        this.handle422(errorObj);
                        break;

                    default:
                        this.handleDefaultEror(errorObj);
                }

                return Observable.throw(errorObj);
            })) as any;
    }

    handle403() {
        this.storage.setLocalUser(null);
    }

    async handle401() {
        const alert = await this.alertCtrl.create({
            header: 'Erro 401',
            subHeader: 'Falha de autenticacao',
            message: 'Email ou senha invalidos',
            buttons: [
                {
                    text: 'Ok',
                }
            ]
        });
        await alert.present();
    }

    async handle422(errorObj) {
        const alert = await this.alertCtrl.create({
            header: 'Erro 422',
            subHeader: 'Dados invalidos',
            message: this.listErrors(errorObj.errors),
            buttons: [
                {
                    text: 'Ok',
                }
            ]
        });
        await alert.present();
    }

    async handleDefaultEror(errorObj) {
        const alert = await this.alertCtrl.create({
            header: 'Erro ' + errorObj.status,
            subHeader: errorObj.error,
            message: errorObj.message,
            buttons: [
                {
                    text: 'Ok',
                }
            ]
        });
        await alert.present();
    }

    private listErrors(messages: FieldMessage[]): string {
        let s = '';
        for (let i = 0; i < messages.length; i++) {
            s = s + '<p><strong>' + messages[i].fieldName + '</strong>: ' + messages[i].message + '</p>';
        }
        return s;
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};
