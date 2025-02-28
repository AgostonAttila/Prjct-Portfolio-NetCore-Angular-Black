import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapComponent } from "../../pages/map/map.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UserComponent } from "../../pages/user/user.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
// import { RtlComponent } from "../../pages/rtl/rtl.component";
import { AuthorizeGuard } from 'src/api-authorization/authorize.guard';
import { CompareComponent } from '../../mycomponents/compare/compare.component';
import { FundDetailComponent } from '../../mycomponents/fund-detail/fund-detail.component';

export const AdminLayoutRoutes: Routes = [
    { path: "dashboard", component: DashboardComponent },
    { path: "detail", component: FundDetailComponent },
    { path: "compare", component: CompareComponent },
    { path: "icons", component: IconsComponent },
    { path: "maps", component: MapComponent },
    { path: "notifications", component: NotificationsComponent },
    { path: "user", component: UserComponent },
    { path: "tables", component: TablesComponent },
    { path: "typography", component: TypographyComponent },
    // { path: "rtl", component: RtlComponent }
];
