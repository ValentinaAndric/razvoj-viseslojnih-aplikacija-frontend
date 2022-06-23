import { Obrazovanje } from './obrazovanje';
import { Sektor } from './sektor';

export class Radnik {
  idRadnik!: number;
  ime!: string;
  prezime!: string;
  brojLk!: string;
  obrazovanje!: Obrazovanje;
  sektor!: Sektor;
}
