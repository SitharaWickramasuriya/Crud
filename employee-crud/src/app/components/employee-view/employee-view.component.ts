import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-employee-view',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <a class="btn" routerLink="/employees">⬅️ Back</a>
    <h2>Employee Details</h2>

    <div *ngIf="emp; else loading" class="card">
      <div class="row"><strong>ID:</strong> <span>{{ emp.id }}</span></div>
      <div class="row"><strong>Name:</strong> <span>{{ emp.name }}</span></div>
      <div class="row"><strong>Email:</strong> <span>{{ emp.email }}</span></div>
      <div class="row"><strong>Job Title:</strong> <span>{{ emp.jobTitle }}</span></div>
      <div class="row"><strong>Department:</strong> <span>{{ emp.department }}</span></div>
      <div class="row"><strong>Phone:</strong> <span>{{ emp.phone }}</span></div>
      <div class="row"><strong>Salary:</strong> <span>{{ emp.salary | number }}</span></div>
      <div class="row"><strong>Joined:</strong> <span>{{ emp.dateOfJoining }}</span></div>

      <div class="actions">
        <a class="btn" [routerLink]="['/employees', emp.id, 'edit']">Edit</a>
        <button class="btn danger" (click)="remove()">Delete</button>
      </div>
    </div>

    <ng-template #loading>
      <p>Loading...</p>
    </ng-template>
  `,
  styles: [`
    .btn {
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  background-color: #e1f787ff;
  font-weight: 600;
  color: #34495e;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn.danger {
  background-color: #f17070ff;
  color: white;
}

.btn.danger:hover {
  background-color: #a12626;
}

.card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-top: 20px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.row {
  display: flex;
  gap: 18px;
  padding: 12px 0;
  border-bottom: 1px dashed #e0e0e0;
  color: #34495e;
  font-weight: 500;
}

.row:last-child {
  border-bottom: none;
}

.actions {
  margin-top: 20px;
  display: flex;
  gap: 12px;
}

  `]
})
export class EmployeeViewComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private api = inject(EmployeeService);
  private location = inject(Location);

  emp?: Employee;

  ngOnInit(): void {
    const id = +(this.route.snapshot.paramMap.get('id') ?? 0);
    this.api.getEmployee(id).subscribe(e => this.emp = e);
  }

  remove() {
    if (!this.emp) return;
    if (!confirm('Delete this employee?')) return;
    this.api.deleteEmployee(this.emp.id).subscribe(() => this.location.back());
  }
}
