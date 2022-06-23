import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Obrazovanje } from 'src/app/model/obrazovanje';
import { ObrazovanjeService } from 'src/app/services/obrazovanje.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ObrazovanjeDialogComponent } from '../../dialogs/obrazovanje-dialog/obrazovanje-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-obrazovanje',
  templateUrl: './obrazovanje.component.html',
  styleUrls: ['./obrazovanje.component.css'],
})
export class ObrazovanjeComponent implements OnInit, OnDestroy {
  dataSource!: MatTableDataSource<Obrazovanje>;
  displayedColumns = [
    'idObrazovanje',
    'naziv',
    'opis',
    'stepenStrucneSpreme',
    'actions',
  ];
  subscription!: Subscription;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  constructor(
    private obrazovanjeService: ObrazovanjeService,
    private dialog: MatDialog
  ) {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    (this.subscription = this.obrazovanjeService
      .getAllObrazovanje()
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
    idObrazovanje?: number,
    naziv?: string,
    opis?: string,
    stepenStrucneSpreme?: string
  ) {
    const dialogRef = this.dialog.open(ObrazovanjeDialogComponent, {
      data: { idObrazovanje, naziv, opis, stepenStrucneSpreme },
    });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 1) {
        this.loadData();
      }
    });
  }
  public applyFilter(filter: any) {
    filter = filter.target.value;
    filter = filter.trim();
    filter = filter.toLocaleLowerCase();
    this.dataSource.filter = filter;
  }
}
