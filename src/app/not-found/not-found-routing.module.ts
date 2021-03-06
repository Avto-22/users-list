
import { NgModule } from '@angular/core';
import { Route, RouterModule } from "@angular/router";
import { NotFoundComponent } from './not-found.component';

export const routes:Route[]=[
    {
        path: '',
        component: NotFoundComponent
    },
];

@NgModule({
    imports: [RouterModule. forChild(routes)],
    exports: [RouterModule],
})
export class NotFoundRoutingModule {}