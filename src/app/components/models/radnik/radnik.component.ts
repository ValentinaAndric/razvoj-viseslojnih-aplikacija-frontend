import { Obrazovanje } from 'src/app/model/obrazovanje';
import { Sektor } from 'src/app/model/sektor';
import { Radnik } from 'src/app/model/radnik';
import { Component, Input, OnInit, OnChanges, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs/internal/Subscription';
import { MatDialog } from '@angular/material/dialog';
import { RadnikService } from 'src/app/services/radnik.service';
import { RadnikDialogComponent } from '../../dialogs/radnik-dialog/radnik-dialog.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-radnik',
  templateUrl: './radnik.component.html',
  styleUrls: ['./radnik.component.css'],
})
export class RadnikComponent implements OnInit, OnChanges {
  displayedColumns = [
    'idRadnik',
    'ime',
    'prezime',
    'brojLk',
    'obrazovanje',
    'sektor',
    'actions',
  ];
  dataSource!: MatTableDataSource<Radnik>;
  subscription!: Subscription;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  @Input() selectedSektorBottom!: Sektor;

  constructor(
    private radnikService: RadnikService,
    private dialog: MatDialog
  ) {}

  ngOnChanges(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe;
  }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    (this.subscription = this.radnikService
      .getRadnikBySektor(this.selectedSektorBottom.idSektor)
      .subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      })),
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
      };
  }

  public openDialog(
    flag: number,
    idRadnik?: number,
    ime?: string,
    prezime?: string,
    brojLk?: string,
    obrazovanje?: Obrazovanje,
    sektor?: Sektor
  ) {
    const dialogRef = this.dialog.open(RadnikDialogComponent, {
      data: { idRadnik, ime, prezime, brojLk, obrazovanje, sektor },
    });
    dialogRef.componentInstance.flag = flag;
    dialogRef.componentInstance.data.sektor = this.selectedSektorBottom;
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 1) {
        this.loadData();
      }
    });
  }
}
