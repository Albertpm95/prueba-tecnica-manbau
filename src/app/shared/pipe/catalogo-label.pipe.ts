import { Pipe, PipeTransform } from '@angular/core';
import { CatalogoService } from '../../core/services/catalogo.service';
import { CatalogoDTO } from 'app/core/dtos/catalogo.dto';

@Pipe({
  name: 'catalogLabel',
  standalone: true,
})
export class CatalogLabelPipe implements PipeTransform {
  constructor(private catalogService: CatalogoService) {}

  transform(id: number | string, catalogName: string): string | number {
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
    const item = catalog.find((i) => i.id === id);
    return item ? item.label : id;
  }
}
