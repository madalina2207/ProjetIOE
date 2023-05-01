import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RulesComponent } from "./rules/rules.component";
import { AccueilComponent } from "./accueil/accueil.component";
import { DialogboxComponent } from "./dialogbox/dialogbox.component";

const routes: Routes = [
    //modification for routing
    {
        path: '', component: AccueilComponent
    },
    {
        path: 'Rules', component: RulesComponent
    },
    {
        path: 'Question', component: DialogboxComponent
    }    
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}