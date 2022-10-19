import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Report} from "../../model/report";

@Component({
  selector: 'app-edit-technician-report',
  templateUrl: './edit-technician-report.component.html',
  styleUrls: ['./edit-technician-report.component.css']
})
export class EditTechnicianReportComponent{

  statusSelected: boolean = false;

  editReportFormGroup= new FormGroup({
    observation: new FormControl('',[Validators.required]),
    diagnosis: new FormControl('',[Validators.required]),
    repairDescription: new FormControl('',[Validators.required]),
    date: new FormControl('',[Validators.required]),
    status: new FormControl(''),
    appointment: new FormControl("")
  });


  constructor(
    public dialogRef: MatDialogRef<EditTechnicianReportComponent>,
    @Inject(MAT_DIALOG_DATA) public  data: Report,
  ){
    
    this.editReportFormGroup.setValue({
      observation:data.observation,
      diagnosis:data.diagnosis,
      repairDescription:data.repairDescription,
      date:data.date,
      status: data.appointment.status,
      appointment: data.appointment
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
