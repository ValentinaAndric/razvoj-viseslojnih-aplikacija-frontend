import { Radnik } from 'src/app/model/radnik';
import { RadnikService } from 'src/app/services/radnik.service';
import { Obrazovanje } from 'src/app/model/obrazovanje';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ObrazovanjeService } from 'src/app/services/obrazovanje.service';

@Component({
  selector: 'app-radnik-dialog',
  templateUrl: './radnik-dialog.component.html',
  styleUrls: ['./radnik-dialog.component.css'],
})
export class RadnikDialogComponent implements OnInit {
  public flag!: number;
  obrazovanje!: Obrazovanje[];

  constructor(
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<RadnikDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Radnik,
    public radnikService: RadnikService,
    public obrazovanjeService: ObrazovanjeService
  ) {}

  ngOnInit(): void {
    this.obrazovanjeService.getAllObrazovanje().subscribe((result) => {
      this.obrazovanje = result;
    });
  }

  public compare(a: any, b: any) {
    return a.id == b.id;
  }

  public add() {
    this.radnikService.addRadnik(this.data).subscribe((data) =>
      this.snackBar.open('Uspesno ste radnika: ' + data.idRadnik, 'U redu', {
        duration: 3500,
      })
    ),
      (error: Error) => {
        console.log(error.name + ' ' + error.message),
          this.snackBar.open('Doslo je do greske', 'U redu', {
            duration: 2500,
          });
      };
  }

  public update() {
    this.radnikService.updateRadnik(this.data).subscribe((data) => {
      this.snackBar.open(
        'Radnik : ' + data.idRadnik + ' je uspesno azuriran',
        'U redu',
        { duration: 3500 }
      );
    }),
      (error: Error) => {
        console.log(error.name + ' ' + error.message),
          this.snackBar.open('Doslo je do greske', 'U redu', {
            duration: 2500,
          });
      };
  }

  public delete() {
    this.radnikService.deleteRadnik(this.data.idRadnik).subscribe(() => {
      this.snackBar.open('Radnik je uspesno obrisan', 'U redu', {
        duration: 3500,
      });
    }),
      (error: Error) => {
        console.log(error.name + ' ' + error.message),
          this.snackBar.open('Doslo je do greske', 'U redu', {
            duration: 2500,
          });
      };
  }

  public cancel() {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste od promena', 'U redu', { duration: 3500 });
  }
}
