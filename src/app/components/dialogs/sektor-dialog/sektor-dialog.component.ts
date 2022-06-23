import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sektor } from 'src/app/model/sektor';
import { SektorService } from 'src/app/services/sektor.service';
import { Preduzece } from 'src/app/model/preduzece';
import { PreduzeceService } from 'src/app/services/preduzece.service';

@Component({
  selector: 'app-sektor-dialog',
  templateUrl: './sektor-dialog.component.html',
  styleUrls: ['./sektor-dialog.component.css'],
})
export class SektorDialogComponent implements OnInit {
  flag!: number;
  preduzece!: Preduzece[];

  constructor(
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<SektorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Sektor,
    public sektorService: SektorService,
    public preduzeceService: PreduzeceService
  ) {}

  ngOnInit(): void {
    this.preduzeceService.getAllPreduzece().subscribe((result) => {
      this.preduzece = result;
    });
  }

  public compare(a: any, b: any) {
    return a.id == b.id;
  }

  public add() {
    this.sektorService.addSektor(this.data).subscribe((data) => {
      this.snackBar.open(
        'Uspesno ste dodali novo sektor: ' + data.naziv,
        'U redu',
        { duration: 3500 }
      );
    }),
      (error: Error) => {
        console.log(error.name + ' ' + error.message),
          this.snackBar.open('Dogodila se greska', 'U redu', {
            duration: 3500,
          });
      };
  }

  public update() {
    this.sektorService.updateSektor(this.data).subscribe((data) => {
      this.snackBar.open(
        'Uspesno ste izmeili novi sektor: ' + data.naziv,
        'U redu',
        { duration: 3500 }
      );
    }),
      (error: Error) => {
        console.log(error.name + ' ' + error.message),
          this.snackBar.open('Dogodila se greska', 'U redu', {
            duration: 3500,
          });
      };
  }

  public delete() {
    this.sektorService.deleteSektor(this.data.idSektor).subscribe(() => {
      this.snackBar.open('Uspesno ste obrisali sektor: ', 'U redu', {
        duration: 3500,
      });
    }),
      (error: Error) => {
        console.log(error.name + ' ' + error.message),
          this.snackBar.open('Dogodila se greska', 'U redu', {
            duration: 3500,
          });
      };
  }

  public cancel() {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste od izmena', 'U redu', { duration: 3500 });
  }
}
