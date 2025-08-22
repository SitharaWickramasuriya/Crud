import { Routes } from '@angular/router';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { EmployeeViewComponent } from './components/employee-view/employee-view.component';
export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'employees' },
  { path: 'employees', component: EmployeeListComponent, title: 'Employees' },
  { path: 'employees/create', component: EmployeeFormComponent, title: 'Create Employee' },
  { path: 'employees/:id/edit', component: EmployeeFormComponent, title: 'Edit Employee' },
  { path: 'employees/:id', component: EmployeeViewComponent, title: 'View Employee' },
  { path: '**', redirectTo: 'employees' },
];
