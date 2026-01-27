// Funções de interface do usuário

/**
 * Formata número para exibição em português
 */
function formatarNumero(numero, casasDecimais = 2) {
    return numero.toLocaleString('pt-BR', {
        minimumFractionDigits: casasDecimais,
        maximumFractionDigits: casasDecimais
    });
}

/**
 * Mostra os resultados da emissão de CO2
 */
function mostrarResultados(resultado) {
    const secao = document.getElementById('resultados');
    const conteudo = document.getElementById('conteudo-de-resultados');

    const modoInfo = CONFIG.MODOS_DE_TRANSPORTE[resultado.transporte];

    const html = `
        <div class="resultado-card">
            <p class="resultado-info"><strong>📍 Origem:</strong> ${resultado.origem}</p>
            <p class="resultado-info"><strong>🎯 Destino:</strong> ${resultado.destino}</p>
            <p class="resultado-info"><strong>📏 Distância:</strong> ${formatarNumero(resultado.distancia)} km</p>
            <p class="resultado-info">
                <strong>🚗 Transporte:</strong> 
                <span style="color: ${modoInfo.color}">
                    ${modoInfo.icon} ${modoInfo.label}
                </span>
            </p>
            <div class="resultado-destaque">
                <strong>💨 Emissão de CO²:</strong> 
                <div style="margin-top: 0.5rem;">
                    <span class="resultado-valor">${formatarNumero(resultado.emissaoKg)} kg</span>
                    <span class="resultado-secundario">(${formatarNumero(resultado.emissaoToneladas, 4)} toneladas)</span>
                </div>
            </div>
        </div>
    `;

    conteudo.innerHTML = html;
    secao.classList.remove('escondido');
}

/**
 * Mostra comparação entre os modos de transporte
 */
function mostrarComparacao(comparacoes) {
    const secao = document.getElementById('comparacao');
    const conteudo = document.getElementById('resultado-de-comparacao');

    // Ordenar por emissão (menor para maior)
    const modosOrdenados = Object.keys(comparacoes).sort((a, b) => {
        return comparacoes[a].emissaoKg - comparacoes[b].emissaoKg;
    });

    const html = modosOrdenados.map(modo => {
        const comp = comparacoes[modo];
        const modoInfo = CONFIG.MODOS_DE_TRANSPORTE[modo];

        // Determinar classe CSS baseada na emissão
        let classeEmissao = '';
        if (comp.emissaoKg === 0) {
            classeEmissao = 'emissao-zero';
        } else if (comp.emissaoKg < 50) {
            classeEmissao = 'emissao-baixa';
        } else if (comp.emissaoKg < 100) {
            classeEmissao = 'emissao-media';
        } else {
            classeEmissao = 'emissao-alta';
        }

        return `
            <div class="comparacao-item ${classeEmissao}">
                <span class="comparacao-icone">${modoInfo.icon}</span>
                <span class="comparacao-nome" style="color: ${modoInfo.color}">
                    ${modoInfo.label}
                </span>
                <span class="comparacao-valor" style="color: ${modoInfo.color}">
                    ${formatarNumero(comp.emissaoKg)} kg CO²
                </span>
            </div>
        `;
    }).join('');

    conteudo.innerHTML = `
        <div class="comparacao-lista">
            <p style="margin-bottom: 1rem; color: #6b7280;">
                Compare as emissões de CO² para a mesma viagem com diferentes meios de transporte:
            </p>
            ${html}
        </div>
    `;
    secao.classList.remove('escondido');
}

/**
 * Mostra informações sobre créditos de carbono
 */
function mostrarCreditosCarbono(creditos) {
    const secao = document.getElementById('creditos-carbono');
    const conteudo = document.getElementById('conteudo-de-creditos-carbono');

    // Calcular número de árvores (estimativa: 1 árvore absorve ~20kg CO2/ano)
    const arvoresNecessarias = Math.ceil(creditos.emissaoToneladas * 1000 / 20);

    const html = `
        <div class="creditos-card">
            <h3 style="margin-bottom: 1rem; color: #f59e0b;">
                💰 Compensação de Carbono
            </h3>
            
            <p class="creditos-info">
                <strong>🎫 Créditos Necessários:</strong> 
                ${formatarNumero(creditos.creditosNecessarios, 4)} créditos
            </p>
            
            <p class="creditos-info">
                <strong>💵 Custo Estimado:</strong>
            </p>
            <ul style="margin-left: 2rem; margin-bottom: 1rem;">
                <li>Mínimo: R$ ${formatarNumero(creditos.custoMinimo)}</li>
                <li>Médio: R$ ${formatarNumero(creditos.custoMedio)}</li>
                <li>Máximo: R$ ${formatarNumero(creditos.custoMaximo)}</li>
            </ul>
            
            <p class="creditos-info">
                <strong>🌳 Árvores para Compensação:</strong> 
                ${arvoresNecessarias} árvores
            </p>
            
            <div class="creditos-nota">
                <p><strong>ℹ️ Como funciona:</strong></p>
                <ul style="margin-left: 1.5rem; margin-top: 0.5rem;">
                    <li>1 crédito de carbono = ${CONFIG.CREDITO_CARBONO.KG_POR_CREDITO} kg CO²</li>
                    <li>Preço por crédito: R$ ${CONFIG.CREDITO_CARBONO.PRECO_MIN_BRL} - R$ ${CONFIG.CREDITO_CARBONO.PRECO_MAX_BRL}</li>
                    <li>1 árvore absorve ~20 kg CO² por ano</li>
                </ul>
            </div>
        </div>
    `;

    conteudo.innerHTML = html;
    secao.classList.remove('escondido');
}
