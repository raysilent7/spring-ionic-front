import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_CONFIG} from '../../config/api.config';
import {EstadoDTO} from '../../models/estado.DTO';
import {Observable} from 'rxjs';

@Injectable()
export class EstadoService {

    constructor(public http: HttpClient) {}

    findAll(): Observable<EstadoDTO[]> {
        return this.http.get<EstadoDTO[]>(`${API_CONFIG.baseUrl}/states`);
    }
}
