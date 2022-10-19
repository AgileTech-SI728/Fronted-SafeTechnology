import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {AppointmentsService} from "../../services/appointments.service";
import {ApplianceModel} from "../../../client-appliance/model/appliancemodel";
import {Appointment} from "../../model/appointment";
import { TechniciansService } from "src/app/technician/technician-profile/services/technicians.service";

@Component({
  selector: 'app-add-client-appointment',
  templateUrl: './add-client-appointment.component.html'
})
export class AddClientAppointmentComponent implements OnInit{
  appointmentFormGroup= new FormGroup({
    dateReserve: new FormControl('',[Validators.required]),
    dateAttention: new FormControl('',[Validators.required]),
    hour: new FormControl('',[Validators.required]),
  });

  constructor(
    public dialogRef: MatDialogRef<AddClientAppointmentComponent>, private technicianService: TechniciansService ,private http:HttpClient,private appointmentsService:AppointmentsService,
  @Inject(MAT_DIALOG_DATA) public  data: {applianceModel:ApplianceModel[],selected:string,appointment:Appointment} ,
  ) {
  }

  technicians: any = [];
  technicianSelected: any;

  ngOnInit(): void {
    this.getAllTechnicians();
  }

  getAllTechnicians(): void {
    this.technicianService.getAll().subscribe(response => {
      this.technicians = response;
    })
  }

  
  onNoClick(): void {
    this.dialogRef.close();
  }
  onClick(): void {
    this.data.appointment.dateReserve=this.appointmentFormGroup.get("dateReserve")?.value;
    this.data.appointment.dateAttention=this.appointmentFormGroup.get("dateAttention")?.value;
    this.data.appointment.hour=this.appointmentFormGroup.get("hour")?.value;
    this.data.appointment.technicianId = this.technicianSelected;
    
  }
}
