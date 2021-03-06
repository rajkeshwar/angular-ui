import { NgModule } from "@angular/core";
import { ImpsComponent } from "./imps.transfer";
import { RtgsComponent } from "./rtgs.transfer";
import { NeftComponent } from "./neft.transfer";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

const ComponentsList = [NeftComponent, RtgsComponent, ImpsComponent];

@NgModule({
  imports: [
    FormsModule, ReactiveFormsModule
  ],
  exports: ComponentsList,
  declarations: ComponentsList,
  providers: [],
})
export class ComponentsModule {
  

}
