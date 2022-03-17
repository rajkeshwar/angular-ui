import { NgModule } from "@angular/core";
import { ImpsComponent } from "./imps.transfer";
import { RtgsComponent } from "./rtgs.transfer";
import { NeftComponent } from "./neft.transfer";

const ComponentsList = [NeftComponent, RtgsComponent, ImpsComponent];

@NgModule({
  imports: [],
  exports: ComponentsList,
  declarations: ComponentsList,
  providers: [],
})
export class ComponentsModule {}
