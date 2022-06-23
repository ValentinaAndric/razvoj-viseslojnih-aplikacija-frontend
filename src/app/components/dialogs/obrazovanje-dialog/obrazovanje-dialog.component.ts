import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Obrazovanje } from 'src/app/model/obrazovanje';
import { ObrazovanjeService } from 'src/app/services/obrazovanje.service';

@Component({
  selector: 'app-obrazovanje-dialog',
  templateUrl: './obrazovanje-dialog.component.html',
  styleUrls: ['./obrazovanje-dialog.component.css'],
})
export class ObrazovanjeDialogComponent implements OnInit {
  flag!: number;

  constructor(
    public snacBar: MatSnackBar,
    public dialogRef: MatDialogRef<ObrazovanjeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Obrazovanje,
    public obrazovanjeService: ObrazovanjeService
  ) {}

  ngOnInit(): void {}

  public add() {
    this.obrazovanjeService.addOrazovanje(this.data).subscribe((data) => {
      this.snacBar.open(
        'Uspesno ste dodali novo obrazovanje: ' + data.naziv,
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
    this.obrazovanjeService.updateOrazovanje(this.data).subscribe((data) => {
      this.snacBar.open(
        'Uspesno ste izmeili novo obrazovanje: ' + data.naziv,
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
    this.obrazovanjeService
      .deleteObrazovanje(this.data.idObrazovanje)
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
