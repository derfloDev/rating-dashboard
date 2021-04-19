import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NutritionOverviewComponent } from './components/nutrition-overview/nutrition-overview.component';
import { NutritionDetailComponent } from './components/nutrition-detail/nutrition-detail.component';

const routes: Routes = [
  {
    path: '', component: NutritionOverviewComponent,
    children: [
      { path: 'details', component: NutritionDetailComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NutritionRoutingModule { }
