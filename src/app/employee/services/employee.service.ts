import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';

import { environments } from '../../../environments/environments';
import { Employee } from '../interface/Employee.interface';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private baseUrl: string = environments.baseUrl;

  private http = inject(HttpClient);

  constructor() {}

  getEmployees(): Observable<Employee[]> {
    console.log('get: ' + `${this.baseUrl}/employees`);
    return this.http.get<Employee[]>(`${this.baseUrl}/employees`);
  }

  getEmployeeById(id: number): Observable<Employee | undefined> {
    console.log('get: ' + `${this.baseUrl}/employees/${id}`);
    return this.http.get<Employee>(`${this.baseUrl}/employees/${id}`);
  }
}
