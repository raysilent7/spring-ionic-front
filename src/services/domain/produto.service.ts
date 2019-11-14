import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {API_CONFIG} from '../../config/api.config';
import {Observable} from "rxjs";

@Injectable()
export class ProdutoService {

    constructor(public http: HttpClient) {
    }

    findByCategoria (categoria_id: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/products/categories?categories=${categoria_id}`);
    }

    findAll () {
        return this.http.get(`${API_CONFIG.baseUrl}/products`);
    }

    getSmallImageFromBucket (id: string) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`
        return this.http.get(url, {responseType: 'blob'});
    }
}