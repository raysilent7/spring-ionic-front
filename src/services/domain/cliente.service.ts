import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ClienteDTO} from '../../models/cliente.DTO';
import {API_CONFIG} from '../../config/api.config';
import {StorageService} from '../storage.service';

@Injectable()
export class ClienteService {

    constructor(public http: HttpClient,
                public storage: StorageService) {}

    findByEmail(email: string): Observable<ClienteDTO> {
        let token = this.storage.getLocalUser().token;
        let authHeader = new HttpHeaders({'Authorization': 'Bearer ' + token});

        return this.http.get<ClienteDTO>(`${API_CONFIG.baseUrl}/clients/email?value=${email}`,
            {'headers': authHeader});
    }
}
