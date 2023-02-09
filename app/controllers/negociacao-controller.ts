import { domInjector } from "../decorators/dom-injector.js";
import { inspecionar } from "../decorators/inspecionar.js";
import { tempoDeExecucao } from "../decorators/tempo-de-execucao.js";
import { DiasDaSemana } from "../enums/DiasDaSemana.js";
import { Negociacoes } from "../models/negiciacoes.js";
import { Negociacao } from "../models/negociacao.js";
import { NegociacoesService } from "../services/negociacoes-service.js";
import { imprimir } from "../utils/imprimir.js";
import { MensagemView } from "../views/mensagemView.js";
import { NegociacoesView } from "../views/negociacoes-view.js";

export class NegociacaoController {
    @domInjector('#data')
    private inputData: HTMLInputElement;
    @domInjector('#quantidade')
    private inputQuantidade: HTMLInputElement;
    @domInjector('#valor')
    private inputValor: HTMLInputElement;
    private negociacoes = new Negociacoes();
    private negociacoesView = new NegociacoesView('#negociacoesView');
    private mensagemView = new MensagemView('#mensagemView');
    private negociacoesService = new NegociacoesService()


    constructor() {
        this.negociacoesView.update(this.negociacoes);

    }

    @inspecionar
    @tempoDeExecucao()

    adiciona(): void {

        const negociacao = Negociacao.criaDe(
            this.inputData.value,
            this.inputQuantidade.value,
            this.inputValor.value
        );
        
        if(!this.ehDiaUtil(negociacao.data)) {
            this.mensagemView
                .update('Apenas negociações en dias útes são aceitas!')
            return
        }

        this.negociacoes.adcionar(negociacao);
        imprimir(negociacao);
        this.limpaFormulario();
        this.atualizaView();

    }

    importaDados(): void {
        this.negociacoesService
            .obterNegociacoesDia()
            .then(negociacoesHoje => {
                return negociacoesHoje.filter(negociacoesHoje => {
                    return !this.negociacoes
                        .lista()
                        .some(negociacao => negociacao
                            .ehIgual(negociacoesHoje)
                        );
                });
            }) 
            .then(negociacoesHoje => {
                for (let negociacao of negociacoesHoje) {
                    this.negociacoes.adcionar(negociacao);
                }
                this.negociacoesView.update(this.negociacoes);
            });

    };


    private criaNegociacao(): Negociacao {
        const exp = /-/g;
        const date = new Date(this.inputData.value.replace(exp, ','));
        const quantidade = parseInt(this.inputQuantidade.value)
        const valor = parseFloat(this.inputValor.value)
        return new Negociacao(date, quantidade, valor)

    }


    private ehDiaUtil(data: Date) {
        return data.getDay() > DiasDaSemana.DOMINDO && data.getDay() < DiasDaSemana.SABADO
    }


    private limpaFormulario(): void {
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';
        this.inputData.focus()

    }


    private atualizaView(): void {
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update('Negociação adicionada com sucesso')
    }
}

