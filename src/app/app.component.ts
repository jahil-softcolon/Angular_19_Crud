import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  employeeForm!: FormGroup;

  emplyeeObj: EmployeeModel = new EmployeeModel();
  employeeList: EmployeeModel[] = [];

  // constructor(){}

  // ngOnInit(): void {
  //   this.createForm();
  // }

  constructor() {
    this.createForm();
    const oldData = localStorage.getItem("EmpData");
    if (oldData != null) {
      const parseData = JSON.parse(oldData);
      this.employeeList = parseData;
    }
  }

  createForm() {
    this.employeeForm = new FormGroup({
      empId: new FormControl(this.emplyeeObj.empId),
      name: new FormControl(this.emplyeeObj.name,[Validators.required]),
      city: new FormControl(this.emplyeeObj.city),
      state: new FormControl(this.emplyeeObj.state),
      emailId: new FormControl(this.emplyeeObj.emailId),
      contactNo: new FormControl(this.emplyeeObj.contactNo,[Validators.minLength(10)]),
      address: new FormControl(this.emplyeeObj.address),
      pincode: new FormControl(this.emplyeeObj.pincode,[Validators.required, Validators.minLength(6)]),
    })
  }

  onSave() {
    const oldData = localStorage.getItem("EmpData");
    if (oldData != null) {
      const parseData = JSON.parse(oldData);
      this.employeeForm.controls['empId'].setValue(parseData.length + 1);
      this.employeeList.unshift(this.employeeForm.value);
    } else {
      this.employeeList.unshift(this.employeeForm.value);
    }
    localStorage.setItem("EmpData", JSON.stringify(this.employeeList))
    this.onReset()
  }

  onEdit(item: EmployeeModel) {
    this.emplyeeObj = item;
    this.createForm()
  }
  onUpdate() {
    const record = this.employeeList.find(m => m.empId == this.employeeForm.controls['empId'].value);
    if (record != undefined) {
      record.address = this.employeeForm.controls['address'].value;
      record.name = this.employeeForm.controls['name'].value;
      record.contactNo = this.employeeForm.controls['contactNo'].value;
    }
    localStorage.setItem("EmpData", JSON.stringify(this.employeeList))
    this.onReset()
  }
  onDelete(empId: number){
    const isDelete = confirm("Are you sure want to Delete?");
    if(isDelete){
      const index = this.employeeList.findIndex(m=>m.empId == empId);
      this.employeeList.splice(index,1);
      localStorage.setItem("EmpData", JSON.stringify(this.employeeList))
    }
  }

  onReset(){
    this.emplyeeObj = new EmployeeModel();
    this.createForm()
  }
}

export class EmployeeModel {
  empId: number;
  name: string;
  city: string;
  state: string;
  emailId: string;
  contactNo: string;
  address: string;
  pincode: string;

  constructor() {
    this.address = "";
    this.city = "";
    this.contactNo = "";
    this.emailId = "",
      this.empId = 1
    this.name = "";
    this.state = "";
    this.pincode = "";
  }
}
