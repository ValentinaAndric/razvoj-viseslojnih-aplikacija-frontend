import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Preduzece } from 'src/app/model/preduzece';
import { PreduzeceService } from 'src/app/services/preduzece.service';

@Component({
  selector: 'app-preduzece-dialog',
  templateUrl: './preduzece-dialog.component.html',
  styleUrls: ['./preduzece-dialog.component.css'],
})
export class PreduzeceDialogComponent implements OnInit {
  flag!: number;

  constructor(
    public snacBar: MatSnackBar,
    public dialogRef: MatDialogRef<PreduzeceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Preduzece,
    public preduzeceService: PreduzeceService
  ) {}

  ngOnInit(): void {}

  public add() {
    this.preduzeceService.addPreduzece(this.data).subscribe((data) => {
      this.snacBar.open(
        'Uspesno ste dodali novo preduzece: ' + data.naziv,
        'U redu',
        { duration: 3500 }
      );
    }),
      (error: Error) => {
        console.log(error.name + ' ' + error.message),
          this.snacBar.open('Dogodila se greska', 'U redu', { duration: 3500 });
      };
  }

  public update() {
    this.preduzeceService.updatePreduzece(this.data).subscribe((data) => {
      this.snacBar.open(
        'Uspesno ste izmeili novo preduzece: ' + data.naziv,
        'U redu',
        { duration: 3500 }
      );
    }),
      (error: Error) => {
        console.log(error.name + ' ' + error.message),
          this.snacBar.open('Dogodila se greska', 'U redu', { duration: 3500 });
      };
  }

  public delete() {
    this.preduzeceService
      .deletePreduzece(this.data.idPreduzece)
      .subscribe(() => {
        this.snacBar.open('Uspesno ste obrisali obrazovanje: ', 'U redu', {
          duration: 3500,
        });
      }),
      (error: Error) => {
        console.log(error.name + ' ' + error.message),
          this.snacBar.open('Dogodila se greska', 'U redu', { duration: 3500 });
      };
  }

  public cancel() {
    this.dialogRef.close();
    this.snacBar.open('Odustali ste od izmena', 'U redu', { duration: 3500 });
  }
}
