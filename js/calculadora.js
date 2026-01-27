/**
 * CALCULADORA - Objeto global para cálculos de emissão de CO2
 *
 * Contém métodos para calcular emissões, comparar modos de transporte,
 * calcular economias e estimar créditos de carbono
 */

const calculadora = {
    /**
     * Calcula a emissão de CO2 para uma distância e modo de transporte
     * @param {number} distanciaKm - Distância em quilômetros
     * @param {string} transportMode - Modo de transporte (bicicleta, carro, onibus, caminhao)
     * @returns {number} Emissão de CO2 em kg, arredondada para 2 casas decimais
     */
    calcularEmissao: function(distanciaKm, transportMode) {
        // Obter fator de emissão do CONFIG usando transportMode como chave
        const fatorEmissao = CONFIG.FATORES_DE_EMISSAO[transportMode];

        // Calcular: distância * fator
        const emissao = distanciaKm * fatorEmissao;

        // Retornar resultado arredondado para 2 casas decimais
        return Math.round(emissao * 100) / 100;
    },

    /**
     * Calcula as emissões para todos os modos de transporte
     * @param {number} distanciaKm - Distância em quilômetros
     * @returns {Array} Array de objetos com modo, emissão e porcentagem vs carro, ordenado por emissão
     */
    calcularTodosModos: function(distanciaKm) {
        // Criar array para armazenar resultados
        const resultados = [];

        // Calcular emissão do carro como baseline (referência)
        const emissaoCarro = this.calcularEmissao(distanciaKm, 'carro');

        // Para cada modo de transporte em CONFIG.FATORES_DE_EMISSAO:
        Object.keys(CONFIG.FATORES_DE_EMISSAO).forEach(modo => {
            // Calcular emissão para esse modo
            const emissao = this.calcularEmissao(distanciaKm, modo);

            // Calcular porcentagem vs carro: (emissao / emissaoCarro) * 100
            // Se emissaoCarro for 0, definir porcentagem como 0
            const porcentagemVsCarro = emissaoCarro === 0 ? 0 : Math.round((emissao / emissaoCarro) * 100 * 100) / 100;

            // Adicionar objeto ao array: {mode, emissao, porcentagemVsCarro}
            resultados.push({
                mode: modo,
                emissao: emissao,
                porcentagemVsCarro: porcentagemVsCarro
            });
        });

        // Ordenar array por emissão (menor primeiro)
        resultados.sort((a, b) => a.emissao - b.emissao);

        // Retornar array ordenado
        return resultados;
    },

    /**
     * Calcula a economia de emissão comparada a um baseline
     * @param {number} emissao - Emissão atual em kg
     * @param {number} baselineEmissao - Emissão de referência em kg
     * @returns {Object} Objeto com kgSalvo e porcentagem de economia
     */
    calcularSalvos: function(emissao, baselineEmissao) {
        // Calcular kg salvos: baseline - emissao
        const kgSalvo = baselineEmissao - emissao;

        // Calcular porcentagem: (salvo / baseline) * 100
        // Se baseline for 0, definir porcentagem como 0
        const porcentagem = baselineEmissao === 0 ? 0 : (kgSalvo / baselineEmissao) * 100;

        // Retornar objeto com valores arredondados para 2 decimais
        return {
            kgSalvo: Math.round(kgSalvo * 100) / 100,
            porcentagem: Math.round(porcentagem * 100) / 100
        };
    },

    /**
     * Calcula quantos créditos de carbono são necessários
     * @param {number} emissaoKg - Emissão total em kg
     * @returns {number} Número de créditos de carbono necessários, arredondado para 4 decimais
     */
    calcularCreditosCarbono: function(emissaoKg) {
        // Dividir emissão por KG_POR_CREDITO (1 crédito = 1000 kg = 1 tonelada)
        const creditos = emissaoKg / CONFIG.CREDITO_CARBONO.KG_POR_CREDITO;

        // Retornar arredondado para 4 casas decimais
        return Math.round(creditos * 10000) / 10000;
    },

    /**
     * Estima o preço dos créditos de carbono
     * @param {number} creditos - Número de créditos de carbono
     * @returns {Object} Objeto com preços mínimo, máximo e média em BRL
     */
    estimarPrecoCredito: function(creditos) {
        // Calcular preço mínimo: creditos * PRECO_MIN_BRL
        const min = creditos * CONFIG.CREDITO_CARBONO.PRECO_MIN_BRL;

        // Calcular preço máximo: creditos * PRECO_MAX_BRL
        const max = creditos * CONFIG.CREDITO_CARBONO.PRECO_MAX_BRL;

        // Calcular média: (min + max) / 2
        const media = (min + max) / 2;

        // Retornar objeto com valores arredondados para 2 decimais
        return {
            min: Math.round(min * 100) / 100,
            max: Math.round(max * 100) / 100,
            media: Math.round(media * 100) / 100
        };
    }
};

console.log('✅ Módulo calculadora carregado');
