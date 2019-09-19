import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_CONFIG} from '../../config/api.config';
import {CidadeDTO} from '../../models/cidade.DTO';
import {Observable} from 'rxjs';

@Injectable()
export class CidadeService {

    constructor(public http: HttpClient) {}

    findAll(stateId: string): Observable<CidadeDTO[]> {
        return this.http.get<CidadeDTO[]>(`${API_CONFIG.baseUrl}/states/${stateId}/cities`);
    }
}
