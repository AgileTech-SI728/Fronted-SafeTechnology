export interface Report {
  id: number;
  technicianId: number;
  observation: string;
  diagnosis:string;
  repairDescription:string;
  date:string;
  status: boolean;
  appointment?: any;
}
