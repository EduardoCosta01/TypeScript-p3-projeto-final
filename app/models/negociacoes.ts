import { Modelo } from '../interfaces/modelo.js';
import { Negociacao } from './negociacao.js';

export class Negociacoes implements Modelo <Negociacoes> {
   
    private negociacoes: Negociacao[] = [];

    adiciona(negociacao: Negociacao) {
        this.negociacoes.push(negociacao);
    }

    lista(): readonly Negociacao[] {
        return this.negociacoes;
    }

    paraTexto(): string {
        return JSON.stringify(this.negociacoes, null, 2);
    }

    ehIgual(negiciacoes: Negociacoes): boolean {
        return JSON.stringify(this.negociacoes) === JSON.stringify(negiciacoes.lista);
    }

}
