import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductOverviewComponent } from './components/product-overview/product-overview.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductListComponent } from './components/product-list/product-list.component';

const routes: Routes = [
  {
    path: '',
    component: ProductOverviewComponent,
    children: [
      { path: 'product/:productId', component: ProductDetailComponent },
      { path: 'products', component: ProductListComponent },
      { path: 'products/:searchTerm', component: ProductListComponent },
      { path: '', redirectTo: 'products', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NutritionRoutingModule {}
