var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
    constructor() {
        this.negociacoes = new Negociacoes();
        this.negociacoesView = new NegociacoesView('#negociacoesView');
        this.mensagemView = new MensagemView('#mensagemView');
        this.negociacoesService = new NegociacoesService();
        this.negociacoesView.update(this.negociacoes);
    }
    adiciona() {
        const negociacao = Negociacao.criaDe(this.inputData.value, this.inputQuantidade.value, this.inputValor.value);
        if (!this.ehDiaUtil(negociacao.data)) {
            this.mensagemView
                .update('Apenas negociações en dias útes são aceitas!');
            return;
        }
        this.negociacoes.adcionar(negociacao);
        imprimir(negociacao);
        this.limpaFormulario();
        this.atualizaView();
    }
    importaDados() {
        this.negociacoesService
            .obterNegociacoesDia()
            .then(negociacoesHoje => {
            return negociacoesHoje.filter(negociacoesHoje => {
                return !this.negociacoes
                    .lista()
                    .some(negociacao => negociacao
                    .ehIgual(negociacoesHoje));
            });
        })
            .then(negociacoesHoje => {
            for (let negociacao of negociacoesHoje) {
                this.negociacoes.adcionar(negociacao);
            }
            this.negociacoesView.update(this.negociacoes);
        });
    }
    ;
    criaNegociacao() {
        const exp = /-/g;
        const date = new Date(this.inputData.value.replace(exp, ','));
        const quantidade = parseInt(this.inputQuantidade.value);
        const valor = parseFloat(this.inputValor.value);
        return new Negociacao(date, quantidade, valor);
    }
    ehDiaUtil(data) {
        return data.getDay() > DiasDaSemana.DOMINDO && data.getDay() < DiasDaSemana.SABADO;
    }
    limpaFormulario() {
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';
        this.inputData.focus();
    }
    atualizaView() {
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update('Negociação adicionada com sucesso');
    }
}
__decorate([
    domInjector('#data')
], NegociacaoController.prototype, "inputData", void 0);
__decorate([
    domInjector('#quantidade')
], NegociacaoController.prototype, "inputQuantidade", void 0);
__decorate([
    domInjector('#valor')
], NegociacaoController.prototype, "inputValor", void 0);
__decorate([
    inspecionar,
    tempoDeExecucao()
], NegociacaoController.prototype, "adiciona", null);
//# sourceMappingURL=negociacao-controller.js.map