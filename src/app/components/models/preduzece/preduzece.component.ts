import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Preduzece } from 'src/app/model/preduzece';
import { PreduzeceService } from 'src/app/services/preduzece.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { PreduzeceDialogComponent } from '../../dialogs/preduzece-dialog/preduzece-dialog.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-preduzece',
  templateUrl: './preduzece.component.html',
  styleUrls: ['./preduzece.component.css'],
})
export class PreduzeceComponent implements OnInit, OnDestroy {
  dataSource!: MatTableDataSource<Preduzece>;
  displayedColumns = [
    'idPreduzece',
    'naziv',
    'opis',
    'pib',
    'sediste',
    'actions',
  ];

  subscription!: Subscription;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  constructor(
    private preduzeceService: PreduzeceService,
    private dialog: MatDialog
  ) {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    (this.subscription = this.preduzeceService
      .getAllPreduzece()
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
    idPreduzece?: number,
    naziv?: string,
    opis?: string,
    pib?: number,
    sediste?: string
  ) {
    const dialogRef = this.dialog.open(PreduzeceDialogComponent, {
      data: { idPreduzece, naziv, opis, pib, sediste },
    });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 1) {
        this.loadData();
      }
    });
  }
}
