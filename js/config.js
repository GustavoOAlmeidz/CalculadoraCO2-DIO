/**
 * CONFIG - Objeto de configuração global da aplicação
 *
 * Contém fatores de emissão, metadados dos modos de transporte,
 * configurações de crédito de carbono e métodos utilitários
 */

const CONFIG = {
    /**
     * Fatores de emissão de CO2 por modo de transporte
     * Valores em kg CO2 por km
     */
    FATORES_DE_EMISSAO: {
        bicicleta: 0,       // 0 kg CO2/km - Zero emissão
        carro: 0.12,        // 120g CO2/km
        onibus: 0.089,      // 89g CO2/km
        caminhao: 0.96      // 960g CO2/km
    },

    /**
     * Metadados dos modos de transporte
     * Inclui labels em português, emojis e cores para UI
     */
    MODOS_DE_TRANSPORTE: {
        bicicleta: {
            label: "Bicicleta",
            icon: "🚲",
            color: "#10b981"    // Verde - ecológico
        },
        carro: {
            label: "Carro",
            icon: "🚗",
            color: "#3b82f6"    // Azul
        },
        onibus: {
            label: "Ônibus",
            icon: "🚌",
            color: "#f59e0b"    // Laranja
        },
        caminhao: {
            label: "Caminhão",
            icon: "🚚",
            color: "#ef4444"    // Vermelho - alta emissão
        }
    },

    /**
     * Configurações de crédito de carbono
     */
    CREDITO_CARBONO: {
        KG_POR_CREDITO: 1000,       // 1 crédito = 1000 kg (1 tonelada)
        PRECO_MIN_BRL: 50,           // Preço mínimo em reais
        PRECO_MAX_BRL: 150           // Preço máximo em reais
    },

    /**
     * Popula o datalist com a lista de cidades disponíveis
     * Obtém cidades do routesDB e cria elementos <option>
     */
    popularDatalist: function() {
        // Obter lista de cidades do routesDB
        const cidades = routesDB.getTodasCidades();

        // Obter elemento datalist pelo id
        const datalist = document.getElementById('cidades-list');

        // Limpar datalist antes de preencher (caso já tenha conteúdo)
        datalist.innerHTML = '';

        // Criar elementos option para cada cidade
        cidades.forEach(cidade => {
            const option = document.createElement('option');
            option.value = cidade;
            datalist.appendChild(option);
        });

        console.log(`✅ Datalist populado com ${cidades.length} cidades`);
    },

    /**
     * Configura o preenchimento automático da distância
     * Adiciona listeners para origem e destino, busca rota automaticamente
     */
    preencherDistanciaAuto: function() {
        // Get elementos de entrada de origem, destino e distância
        const inputOrigem = document.getElementById('origem');
        const inputDestino = document.getElementById('destino');
        const inputDistancia = document.getElementById('distancia');
        const checkboxManual = document.getElementById('distancia-manual');
        const helperText = document.querySelector('.calculator-form__help-text');

        /**
         * Função para tentar encontrar e preencher a distância
         */
        const tentarPreencherDistancia = () => {
            // Se modo manual estiver ativo, não fazer nada
            if (checkboxManual.checked) {
                return;
            }

            // Get valores trimmed de ambas as entradas
            const origem = inputOrigem.value.trim();
            const destino = inputDestino.value.trim();

            // If both are filled, call routesDB.acharDistancia()
            if (origem && destino) {
                const distancia = routesDB.acharDistancia(origem, destino);

                // If distance found
                if (distancia !== null) {
                    // Fill distance input with value
                    inputDistancia.value = distancia;

                    // Make it readonly
                    inputDistancia.setAttribute('readonly', 'readonly');

                    // Show success message (change helper text color to green)
                    helperText.textContent = `✓ Distância encontrada: ${distancia} km`;
                    helperText.style.color = '#10b981';
                    helperText.style.fontWeight = '600';
                } else {
                    // If not found
                    // Clear distance input
                    inputDistancia.value = '';

                    // Change helper text to suggest manual input
                    helperText.textContent = '⚠️ Rota não encontrada. Marque "Inserir distância manualmente" ou escolha outra rota.';
                    helperText.style.color = '#f59e0b';
                    helperText.style.fontWeight = '600';
                }
            } else {
                // Se um dos campos estiver vazio, resetar
                inputDistancia.value = '';
                helperText.textContent = 'A distância será preenchida automaticamente';
                helperText.style.color = '';
                helperText.style.fontWeight = '';
            }
        };

        // Adicionar 'change' listener tanto à entrada de origem quanto de destino
        inputOrigem.addEventListener('change', tentarPreencherDistancia);
        inputDestino.addEventListener('change', tentarPreencherDistancia);

        // Também adicionar 'input' para feedback mais rápido
        inputOrigem.addEventListener('input', () => {
            // Resetar mensagem quando usuário está digitando
            if (!checkboxManual.checked && inputOrigem.value.trim() && inputDestino.value.trim()) {
                helperText.textContent = 'Digite e selecione a cidade da lista...';
                helperText.style.color = '#6b7280';
                helperText.style.fontWeight = '';
            }
        });

        inputDestino.addEventListener('input', () => {
            // Resetar mensagem quando usuário está digitando
            if (!checkboxManual.checked && inputOrigem.value.trim() && inputDestino.value.trim()) {
                helperText.textContent = 'Digite e selecione a cidade da lista...';
                helperText.style.color = '#6b7280';
                helperText.style.fontWeight = '';
            }
        });

        // Adicionar 'change' listener to manual checkbox
        checkboxManual.addEventListener('change', function() {
            if (this.checked) {
                // When checked: remove readonly from distance, allow manual entry
                inputDistancia.removeAttribute('readonly');
                inputDistancia.focus();
                inputDistancia.select();

                // Atualizar helper text
                helperText.textContent = '✏️ Modo manual ativado. Digite a distância em km.';
                helperText.style.color = '#3b82f6';
                helperText.style.fontWeight = '600';
            } else {
                // When unchecked: try to find route again
                inputDistancia.setAttribute('readonly', 'readonly');

                // Resetar helper text
                helperText.textContent = 'A distância será preenchida automaticamente';
                helperText.style.color = '';
                helperText.style.fontWeight = '';

                // Tentar preencher automaticamente
                tentarPreencherDistancia();
            }
        });

        console.log('✅ Preenchimento automático de distância configurado');
    }
};

