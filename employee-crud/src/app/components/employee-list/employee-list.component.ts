import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <section class="bar">
      <h2>Employees</h2>
      <a class="btn primary" routerLink="/employees/create"> New Employee</a>
    </section>

    <input class="search" type="text" placeholder="Search by name, email, job, dept..."
           [(ngModel)]="query" (input)="onSearch()" />

    <div class="table-wrap" *ngIf="filtered().length; else empty">
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Job Title</th><th>Department</th><th>Joined</th><th></th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let e of paged(); let i = index">
            <td>{{ e.id }}</td>
            <td><a [routerLink]="['/employees', e.id]">{{ e.name }}</a></td>
            <td>{{ e.email }}</td>
            <td>{{ e.jobTitle }}</td>
            <td>{{ e.department }}</td>
            <td>{{ e.dateOfJoining }}</td>
            <td class="actions">
              <a class="btn" [routerLink]="['/employees', e.id, 'edit']">Edit</a>
              <button class="btn danger" (click)="remove(e.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pager" *ngIf="pages > 1">
        <button (click)="page = page - 1" [disabled]="page===1">Prev</button>
        <span>Page {{page}} / {{pages}}</span>
        <button (click)="page = page + 1" [disabled]="page===pages">Next</button>
      </div>
    </div>

    <ng-template #empty>
      <p>No employees yet. <a routerLink="/employees/create">Create the first one</a>.</p>
    </ng-template>
  `,
  styles: [`
   .bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 16px 0 24px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

.btn {
    padding: 8px 16px;
    border: none;
    background-color: #f8fafd;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    color: #34495e;
    transition: background-color 0.3s ease;
    }

.btn:hover {
    background-color: #e3f2fd;
    }

.btn.primary {
    background-color: #2979ff;
    color: white;
    }

.btn.primary:hover {
    background-color: #1c54b2;
    }

.btn.danger {
    background-color: #d32f2f;
    color: white;
    }

.btn.danger:hover {
    background-color: #a12626;
    }

.table-wrap {
    overflow-x: auto;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
    }

table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 8px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

th, td {
    padding: 14px 18px;
    background: white;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
    border-radius: 8px;
    text-align: left;
    color: #34495e;
    }

th {
    font-weight: 700;
    font-size: 1rem;
    color: #1a237e;
    }

.actions {
  display: flex;
  gap: 12px;
}

.pager {
  display: flex;
  gap: 16px;
  align-items: center;
  margin-top: 16px;
}

.search {
  width: 100%;
  padding: 10px 14px;
  margin-bottom: 14px;
  border-radius: 8px;
  border: 1.5px solid #d1d9e6;
  font-weight: 400;
  font-size: 1rem;
  color: #34495e;
  transition: border-color 0.3s ease;
}

.search:focus {
  border-color: #2979ff;
  outline: none;
  box-shadow: 0 0 8px rgba(41, 121, 255, 0.3);
}

  `]
})
export class EmployeeListComponent implements OnInit {
  private service = inject(EmployeeService);

  employees = signal<Employee[]>([]);
  query = '';
  page = 1;
  pageSize = 8;

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.service.getEmployees().subscribe(list => {
      this.employees.set(list);
      this.page = 1;
    });
  }

  filtered = computed(() => {
    const q = this.query.trim().toLowerCase();
    if (!q) return this.employees();
    return this.employees().filter(e =>
      [e.name, e.email, e.jobTitle, e.department].some(v => v.toLowerCase().includes(q))
    );
  });

  get pages(): number {
    return Math.max(1, Math.ceil(this.filtered().length / this.pageSize));
  }

  paged() {
    const start = (this.page - 1) * this.pageSize;
    return this.filtered().slice(start, start + this.pageSize);
  }

  onSearch() {
    this.page = 1;
  }

  remove(id: number) {
    if (!confirm('Delete this employee?')) return;
    this.service.deleteEmployee(id).subscribe(() => this.load());
  }
}
