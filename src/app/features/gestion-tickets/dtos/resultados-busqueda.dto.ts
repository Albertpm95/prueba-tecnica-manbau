import { TicketDTO } from "./ticket.dto";

export interface ResultadosBusquedaDto {
    first: number;
    prev: number | null;
    next: number | null;
    last: number;
    pages: number; // Numero de paginas
    items: number; // Numero total de items
    data: TicketDTO[];
}
