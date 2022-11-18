import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminaddComponent } from './adminadd/adminadd.component';
import { AdmineditComponent } from './adminedit/adminedit.component';
import { AdminviewComponent } from './adminview/adminview.component';
import { AuthGuard } from './service/auth.guard';
import { GetComponent } from './userview/get/get.component';
import { UserviewComponent } from './userview/userview.component';

const routes: Routes = [

    {path:'', redirectTo:'userview', pathMatch:'full'},

    {
      path:'userview',
      component:UserviewComponent,
      loadChildren:()=>import('./userview/userview.module').then(x=>x.UserviewModule),
      data:{preload:false}
    },

    {
      path:'get',
      component:GetComponent
    },

    {
    path:'adminview',
    component:AdminviewComponent,
    loadChildren:()=>import('./adminview/adminview.module').then(x=>x.AdminviewModule),
    data:{preload:false},
    canLoad:[AuthGuard]
    },

  {path:'adminadd',component:AdminaddComponent},
  {path:'adminedit/update/:dataid',component:AdmineditComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes ,{preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
