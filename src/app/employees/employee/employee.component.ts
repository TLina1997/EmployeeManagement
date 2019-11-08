import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
 
import { EmployeeService } from '../../shared/employee.service';
import { DepartmentService } from '../../shared/department.service';
import { NotificationService } from '../../shared/notification.service'; 

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private service: EmployeeService, private departmentService: DepartmentService, 
    private notificationService: NotificationService, public dialogRef: MatDialogRef<EmployeeComponent>) { }

  // departments = [
  //   {id: 1, value: 'Department 1'},
  //   {id: 2, value: 'Department 2'},
  //   {id: 3, value: 'Department 3'},
  // ];

  ngOnInit() {

    this.service.getEmployees();
  }

  onClear() {

    this.service.form.reset();
    this.service.initializeFormGroup();
    
  }

  onSubmit() {

    if(this.service.form.valid){

      if(!this.service.form.get('$key').value)
        this.service.insertEmployee(this.service.form.value);
      

      else
        this.service.updateEmployee(this.service.form.value);
        this.service.form.reset();
        this.service.initializeFormGroup();
        this.notificationService.success('Successfully Submitted!');
        this.onClose();
      
    }
    else{

      this.notificationService.notSuccess('Empty fields!');
    }
  }

  onClose() {

    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }
}
