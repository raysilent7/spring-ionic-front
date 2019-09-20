import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ClienteDTO} from '../../models/cliente.DTO';
import {API_CONFIG} from '../../config/api.config';
import {StorageService} from '../storage.service';

@Injectable()
export class ClienteService {

    constructor(public http: HttpClient,
                public storage: StorageService) {}

    findByEmail(email: string): Observable<ClienteDTO> {
        return this.http.get<ClienteDTO>(`${API_CONFIG.baseUrl}/clients/email?value=${email}`);
    }

    insert(obj: ClienteDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/clients`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }
}
