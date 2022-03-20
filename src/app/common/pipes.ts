import { NgModule } from "@angular/core";

import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "heading" })
export class HeadingPipe implements PipeTransform {
  transform(value: any): any {
    return value
      .replace(/([A-Z])/g, " $1")
      .replace(/^(\w)/, (t: string) => t.toUpperCase());
  }
}

const PipesList = [HeadingPipe];

@NgModule({
  exports: PipesList,
  declarations: PipesList,
})
export class PipesModule {}
