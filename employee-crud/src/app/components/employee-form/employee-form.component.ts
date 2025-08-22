import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <h2>{{ isEdit ? 'Edit' : 'Create' }} Employee</h2>

    <form [formGroup]="form" (ngSubmit)="save()" class="form">
      <div class="grid">
        <label>Name
          <input formControlName="name" type="text" required />
        </label>
        <label>Email
          <input formControlName="email" type="email" required />
        </label>
        <label>Job Title
          <input formControlName="jobTitle" type="text" required />
        </label>
        <label>Department
          <input formControlName="department" type="text" required />
        </label>
        <label>Phone
          <input formControlName="phone" type="tel" />
        </label>
        <label>Salary (LKR)
          <input formControlName="salary" type="number" min="0" />
        </label>
        <label>Date of Joining
          <input formControlName="dateOfJoining" type="date" required />
        </label>
      </div>

      <div class="actions">
        <button class="btn primary" type="submit" [disabled]="form.invalid">{{ isEdit ? 'Update' : 'Create' }}</button>
        <a class="btn" [routerLink]="['/employees']">Cancel</a>
      </div>
    </form>
  `,
  styles: [`
    .form {
  margin-top: 20px;
  background: transparent;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(31, 50, 75, 0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
}

label {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-weight: 600;
  color: #223953;
  font-size: 0.95rem;
}

input {
  padding: 10px 12px;
  border: 1.5px solid #d9e1e8;
  border-radius: 8px;
  font-weight: 400;
  font-size: 1rem;
  transition: border-color 0.2s ease;
  color: #2a3b55;
  background: #f9fafb;
}

input:focus {
  border-color: #f6c24b;
  outline: none;
  box-shadow: 0 0 6px rgba(246, 194, 75, 0.4);
}

.actions {
  margin-top: 20px;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.btn {
  padding: 8px 16px;
  border: none;
  background: #f9fafb;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  color: #223953;
  transition: background-color 0.3s, color 0.3s;
  box-shadow: 0 1px 3px rgb(31 50 75 / 0.1);
}

.btn:hover {
  background-color: #f6c24b;
  color: #1f324b;
}

.btn.primary {
  background: #f6c24b;
  color: #1f324b;
  box-shadow: 0 2px 6px rgba(246, 194, 75, 0.5);
}

.btn.primary:hover {
  background-color: #d4a933;
  color: #152535;
}

  `]
})
export class EmployeeFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private api = inject(EmployeeService);
  private location = inject(Location);

  isEdit = false;
  id!: number;

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    jobTitle: ['', Validators.required],
    department: ['', Validators.required],
    phone: [''],
    salary: [0, [Validators.min(0)]],
    dateOfJoining: ['', Validators.required],
  });

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEdit = true;
      this.id = +idParam;
      this.api.getEmployee(this.id).subscribe(emp => {
        const patch = { ...emp, dateOfJoining: emp.dateOfJoining?.slice(0, 10) } as any;
        this.form.patchValue(patch);
      });
    }
  }

  save() {
    if (this.form.invalid) return;

    const payload = this.form.value as Omit<Employee, 'id'>;

    const req = this.isEdit
      ? this.api.updateEmployee(this.id, payload)
      : this.api.createEmployee(payload);

    req.subscribe({
      next: () => this.router.navigate(['/employees']),
      error: err => alert('Failed to save: ' + (err?.error?.message ?? 'Unknown error')),
    });
  }
}
