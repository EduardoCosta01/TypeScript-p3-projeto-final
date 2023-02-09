import { NegociacaoDia } from "../interfaces/negociacao-dia";
import { Negociacao } from "../models/negociacao.js";

export class NegociacoesService {

    public obterNegociacoesDia(): Promise<Negociacao[]> {
        return fetch('http://localhost:8080/dados')
            .then(res => res.json())
            .then((dados: NegociacaoDia[]) => {
                return dados.map(dadoHoje => {
                    return new Negociacao (
                        new Date(),
                        dadoHoje.vezes,
                        dadoHoje.montante
                    )
                })
            });
    }

}