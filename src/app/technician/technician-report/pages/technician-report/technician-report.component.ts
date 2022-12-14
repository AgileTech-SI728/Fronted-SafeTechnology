import { Component, OnInit,ViewChild } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Technician} from "../../../technician-profile/model/technician";
import {Report} from "../../model/report";
import {TechniciansService} from "../../../technician-profile/services/technicians.service";
import {ReportsService} from "../../services/reports.service";
import {EditTechnicianReportComponent} from "../edit-technician-report/edit-technician-report.component";
import {MatDialog} from "@angular/material/dialog";
import {ApplianceModel} from "../../../../client/client-appliance/model/appliancemodel";
import {
  AddClientApplianceModelComponent
} from "../../../../client/client-appliance/page/add-client-applianceModel/add-client-applianceModel.component";
import {AddTechnicianReportComponent} from "../add-technician-report/add-technician-report.component";
import { AppointmentsService } from 'src/app/client/client-appointment/services/appointments.service';

@Component({
  selector: 'app-technician-report',
  templateUrl: './technician-report.component.html',
  styleUrls: ['./technician-report.component.css']
})
export class TechnicianReportComponent implements OnInit {
  id: String;

  technicianData: Technician[];
  reportsData: Report[];

  constructor(private technicianService: TechniciansService,
              private reportsService:ReportsService, private route: ActivatedRoute,private dialog: MatDialog, private appointmentService: AppointmentsService) {
    this.technicianData = [] as Technician[];
    this.reportsData = [] as Report[];
    this.id=this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.updateReportData();
  }
  openDialogAdd(): void{
    let report: Report;
    report={} as Report;
    report.id=0;
    report.technicianId=Number(this.id);
    const dialogRef=this.dialog.open(AddTechnicianReportComponent,{
      data: report
    });

    dialogRef.afterClosed().subscribe(result =>{
      if(result!=undefined){
        report.diagnosis=result.get("diagnosis")?.value;
        report.observation=result.get("observation")?.value;
        report.date=result.get("date")?.value;
        report.repairDescription=result.get("repairDescription")?.value;
        this.reportsService.create(report,report.technicianId).subscribe((response:any)=>{
          this.updateReportData();
          alert("Add report Successfully");
        });
      }
    });
  }
  updateReportData(){
    this.reportsService.getAll().subscribe((response:any)=>{
      console.log(response);
      
      this.reportsData=response;
    });
  }

  openDialogUpdate(data: Report): void{
    const dialogRef=this.dialog.open(EditTechnicianReportComponent,{
      data: {...data}
    });

    dialogRef.afterClosed().subscribe(result =>{
      if(result!=undefined){
        data.observation=result.get("observation")?.value;
        data.diagnosis=result.get("diagnosis")?.value;
        data.repairDescription=result.get("repairDescription")?.value;
        data.date=result.get("date")?.value;
        this.reportsService.update(data.id,data).subscribe(response=>{
          this.updateReportData();
          
          let data = {
            id:result.value.appointment.id,
            clientId:result.value.appointment.client.id,
            dateReserve:result.value.appointment.dateReserve,
            dateAttention:result.value.appointment.dateAttention,
            hour:result.value.appointment.hour,
            applianceModelId:result.value.appointment.applianceModel.id,
            applianceModel:{
              urlToImage:result.value.appointment.applianceModel.urlToImage,
              name:result.value.appointment.applianceModel.name,
              model:result.value.appointment.applianceModel.model
            },
            technicianId: result.value.appointment.technician.id,
            status: result.get("status")?.value,
          }
          
          /*this.appointmentService.update(result.value.appointment.id, data).subscribe(response => {
            
          })*/
        })

      }
    });
  }
}
