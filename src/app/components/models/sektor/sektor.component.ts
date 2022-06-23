import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Sektor } from 'src/app/model/sektor';
import { SektorService } from 'src/app/services/sektor.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { SektorDialogComponent } from '../../dialogs/sektor-dialog/sektor-dialog.component';
import { Preduzece } from 'src/app/model/preduzece';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-sektor',
  templateUrl: './sektor.component.html',
  styleUrls: ['./sektor.component.css'],
})
export class SektorComponent implements OnInit {
  displayedColumns = ['idSektor', 'naziv', 'oznaka', 'preduzece', 'actions'];
  dataSource!: MatTableDataSource<Sektor>;
  subscription!: Subscription;
  selectedSektorTop!: Sektor;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  constructor(
    private sektorService: SektorService,
    private dialog: MatDialog
  ) {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    (this.subscription = this.sektorService.getAllSektor().subscribe((data) => {
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
    idSektor?: number,
    naziv?: string,
    oznaka?: string,
    preduzece?: Preduzece
  ) {
    const dialogRef = this.dialog.open(SektorDialogComponent, {
      data: { idSektor, naziv, oznaka, preduzece },
    });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 1) {
        this.loadData();
      }
    });
  }

  public selectRow(row: Sektor) {
    console.log(row);
    this.selectedSektorTop = row;
  }
}
