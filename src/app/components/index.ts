import { NgModule } from "@angular/core";
import { ImpsComponent } from "./imps.transfer";
import { RtgsComponent } from "./rtgs.transfer";
import { NeftComponent } from "./neft.transfer";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { PipesModule } from "../common/pipes";
import { NgbAlertModule } from "@ng-bootstrap/ng-bootstrap";


const ComponentsList = [NeftComponent, RtgsComponent, ImpsComponent];

@NgModule({
  imports: [
    FormsModule, ReactiveFormsModule, CommonModule, PipesModule, NgbAlertModule
  ],
  exports: ComponentsList,
  declarations: ComponentsList,
  providers: [],
})
export class ComponentsModule {
  

}
