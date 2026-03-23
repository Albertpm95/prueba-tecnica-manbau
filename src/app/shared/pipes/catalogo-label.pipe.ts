import { inject, Pipe, PipeTransform } from '@angular/core';
import { CatalogoService } from '../../core/services/catalogo.service';
import { CatalogoDTO } from '@core-dtos/catalogo';

type CatalogName = 'estados' | 'prioridades';
@Pipe({
  name: 'catalogLabel',
  standalone: true,
})
export class CatalogoLabelPipe implements PipeTransform {
  private catalogService: CatalogoService = inject(CatalogoService);

  transform(id: number, catalogName: CatalogName): string | number {
    let catalog: CatalogoDTO[] = [];
    switch (catalogName) {
      case 'estados':
        catalog = this.catalogService.estados();
        break;
      case 'prioridades':
        catalog = this.catalogService.prioridades();
        break;
      default:
        break;
    }
    if (!catalog.length) return id;
    const item = catalog.find((i) => i.id == id);
    return item ? item.label : id;
  }
}
