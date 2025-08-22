import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/employee';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:5021/api/employees';

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl);
  }

  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}/${id}`);
  }

  createEmployee(emp: Omit<Employee, 'id'>): Observable<Employee> {
    return this.http.post<Employee>(this.baseUrl, emp);
  }

  updateEmployee(id: number, emp: Omit<Employee, 'id'>): Observable<Employee> {
    return this.http.put<Employee>(`${this.baseUrl}/${id}`, emp);
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
