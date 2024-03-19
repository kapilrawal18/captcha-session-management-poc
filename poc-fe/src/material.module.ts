import { NgModule } from "@angular/core";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatCardModule} from "@angular/material/card";
import {MatRadioModule} from "@angular/material/radio";
import {MatTableModule} from "@angular/material/table";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from "@angular/material/core";
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatToolbarModule} from '@angular/material/toolbar'
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';




@NgModule({
exports:[
    MatInputModule,
MatSelectModule,
MatCardModule,
MatRadioModule,
MatCheckboxModule,
MatTableModule,
MatPaginatorModule,
MatSortModule,
MatDialogModule,
MatButtonModule,
MatFormFieldModule,
MatTabsModule,
MatDatepickerModule,
MatNativeDateModule,
MatInputModule,
FlexLayoutModule,
MatSidenavModule,
MatToolbarModule,
MatListModule,
MatMenuModule,
MatIconModule,
MatGridListModule


]
})
export class MaterialModule {}