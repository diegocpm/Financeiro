import { Categoria } from './categoria';
import { Conta } from './conta';

export class Transacao {
    constructor(
        public chave: string = '',
        public valor: number = 0.00, 
        public tipo: number = 0, 
        public descricao: string = '', 
        public categoria: Categoria = null, 
        public conta: Conta = null, 
        public data: string = new Date().toISOString()
    ) {}
}
