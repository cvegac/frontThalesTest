import { Component, ViewChild, inject } from '@angular/core';

import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTable, MatTableModule } from '@angular/material/table';

import { EmployeeService } from '../employee/services/employee.service';
import { Employee } from '../employee/interface/Employee.interface';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatTableModule,
    CommonModule,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  private employeeService = inject(EmployeeService);

  public searchInput = new FormControl('');

  displayedColumns: string[] = [
    'id',
    'image',
    'name',
    'salary',
    'age',
    'annualSalary',
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();

  public employees: Employee[] = [];
  public employee?: Employee;

  public displayError: Boolean = false;
  public errorMessage: String = '';

  searchEmployee() {
    const value: string = this.searchInput.value || '';

    const idEmployee = +value;

    if (idEmployee > 0) {
      console.log('search value:' + idEmployee);
      this.employeeService.getEmployeeById(idEmployee).subscribe({
        next: (employee) => {
          if (employee != undefined) {
            this.employees = [employee];
            this.displayError = false;
          }
        },
        error: (e: HttpErrorResponse) => {
          console.log(e.error.message);
          this.searchInput.setValue('');
          this.displayError = true;
          this.errorMessage = e.error.message;
        },
      });
    } else {
      console.log('search void');
      this.employeeService.getEmployees().subscribe({
        next: (employees) => {
          this.employees = employees;
          this.displayError = false;
        },
        error: (e: HttpErrorResponse) => {
          console.log(e.error.message);
          this.searchInput.setValue('');
          this.displayError = true;
          this.errorMessage = e.error.message;
        },
      });
    }
  }
}
