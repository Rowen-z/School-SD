import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { RubricComponent } from "./pages/rubric/rubric.component";
import { LoginComponent } from "./pages/login/login.component";

const routing: Routes = [
    { path: "", component: HomeComponent },
    { path: "home", component: HomeComponent },
    { path: "rubric", component: RubricComponent },
    { path: "login", component: LoginComponent}
];

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forRoot(routing)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
