import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapComponent } from "../../pages/map/map.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UserComponent } from "../../pages/user/user.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
// import { RtlComponent } from "../../pages/rtl/rtl.component";


import { TableComponent } from '../../mycomponents/table/table.component';
import { LineChartComponent } from '../../mycomponents/line-chart/line-chart.component';
import { BarChartComponent } from '../../mycomponents/bar-chart/bar-chart.component';
import { CompareComponent } from '../../mycomponents/compare/compare.component';
import { FundDetailComponent } from '../../mycomponents/fund-detail/fund-detail.component';

import { HighchartsChartModule } from 'highcharts-angular';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";



@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
        FormsModule,
        HttpClientModule,
        NgbModule,
        HighchartsChartModule
    ],
    declarations: [
        DashboardComponent,
        UserComponent,
        TablesComponent,
        IconsComponent,
        TypographyComponent,
        NotificationsComponent,
        MapComponent,
        TableComponent,
        CompareComponent,
        FundDetailComponent,
        LineChartComponent,
        BarChartComponent        
        // RtlComponent
    ]
})
export class AdminLayoutModule { }
