// Inicialização da aplicação

document.addEventListener('DOMContentLoaded', function() {
    // Preencher datalist com cidades usando CONFIG
    CONFIG.popularDatalist();

    // Configurar preenchimento automático de distância usando CONFIG
    CONFIG.preencherDistanciaAuto();

    // Elementos do formulário
    const form = document.getElementById('calculator-form');

    // Manipular envio do formulário
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const origem = document.getElementById('origem').value.trim();
        const destino = document.getElementById('destino').value.trim();
        const distancia = parseFloat(document.getElementById('distancia').value);
        const transporte = document.querySelector('input[name="transport"]:checked').value;

        // Validações
        if (!origem || !destino) {
            alert('Por favor, selecione origem e destino.');
            return;
        }

        if (!distancia || distancia <= 0) {
            alert('Por favor, insira uma distância válida.');
            return;
        }

        // Calcular emissões usando CONFIG.FATORES_DE_EMISSAO
        const fatorEmissao = CONFIG.FATORES_DE_EMISSAO[transporte];
        const emissaoKg = distancia * fatorEmissao;
        const emissaoToneladas = emissaoKg / 1000;

        const resultado = {
            origem: origem,
            destino: destino,
            distancia: distancia,
            transporte: transporte,
            emissaoKg: emissaoKg,
            emissaoToneladas: emissaoToneladas
        };

        // Calcular comparações entre todos os modos
        const comparacoes = {};
        Object.keys(CONFIG.FATORES_DE_EMISSAO).forEach(modo => {
            const emissao = distancia * CONFIG.FATORES_DE_EMISSAO[modo];
            comparacoes[modo] = {
                emissaoKg: emissao,
                emissaoToneladas: emissao / 1000
            };
        });

        // Calcular créditos de carbono
        const creditosNecessarios = emissaoToneladas / (CONFIG.CREDITO_CARBONO.KG_POR_CREDITO / 1000);
        const custoMinimo = creditosNecessarios * CONFIG.CREDITO_CARBONO.PRECO_MIN_BRL;
        const custoMaximo = creditosNecessarios * CONFIG.CREDITO_CARBONO.PRECO_MAX_BRL;
        const custoMedio = (custoMinimo + custoMaximo) / 2;

        const creditos = {
            creditosNecessarios: creditosNecessarios,
            custoMinimo: custoMinimo,
            custoMaximo: custoMaximo,
            custoMedio: custoMedio,
            emissaoToneladas: emissaoToneladas
        };

        // Mostrar resultados
        mostrarResultados(resultado);
        mostrarComparacao(comparacoes);
        mostrarCreditosCarbono(creditos);

        // Scroll suave para os resultados
        document.getElementById('resultados').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });

    console.log('✅ Calculadora de CO² inicializada com sucesso!');
    console.log(`📍 Total de cidades disponíveis: ${routesDB.getTodasCidades().length}`);
    console.log(`🛣️ Total de rotas cadastradas: ${routesDB.rotas.length}`);
    console.log(`🚗 Modos de transporte disponíveis: ${Object.keys(CONFIG.MODOS_DE_TRANSPORTE).length}`);
});
