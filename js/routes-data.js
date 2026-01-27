/**
 * RoutesDB - Banco de dados de rotas brasileiras
 *
 * Objeto global contendo rotas entre cidades brasileiras
 * e métodos para manipular os dados de rotas
 */

const routesDB = {
    /**
     * Array de rotas entre cidades brasileiras
     * Cada rota contém origem, destino e distância em km
     */
    rotas: [
        // ===== Conexões Capital a Capital =====

        // Região Sudeste
        { origem: "São Paulo, SP", destino: "Rio de Janeiro, RJ", distanciaKm: 430 },
        { origem: "São Paulo, SP", destino: "Belo Horizonte, MG", distanciaKm: 586 },
        { origem: "São Paulo, SP", destino: "Vitória, ES", distanciaKm: 882 },
        { origem: "Rio de Janeiro, RJ", destino: "Belo Horizonte, MG", distanciaKm: 434 },
        { origem: "Rio de Janeiro, RJ", destino: "Vitória, ES", distanciaKm: 521 },
        { origem: "Belo Horizonte, MG", destino: "Vitória, ES", distanciaKm: 524 },

        // Sudeste - Centro-Oeste
        { origem: "São Paulo, SP", destino: "Brasília, DF", distanciaKm: 1015 },
        { origem: "São Paulo, SP", destino: "Goiânia, GO", distanciaKm: 926 },
        { origem: "São Paulo, SP", destino: "Campo Grande, MS", distanciaKm: 1014 },
        { origem: "São Paulo, SP", destino: "Cuiabá, MT", distanciaKm: 1679 },
        { origem: "Rio de Janeiro, RJ", destino: "Brasília, DF", distanciaKm: 1148 },
        { origem: "Belo Horizonte, MG", destino: "Brasília, DF", distanciaKm: 716 },
        { origem: "Brasília, DF", destino: "Goiânia, GO", distanciaKm: 209 },
        { origem: "Goiânia, GO", destino: "Campo Grande, MS", distanciaKm: 835 },
        { origem: "Goiânia, GO", destino: "Cuiabá, MT", distanciaKm: 934 },

        // Sudeste - Sul
        { origem: "São Paulo, SP", destino: "Curitiba, PR", distanciaKm: 408 },
        { origem: "São Paulo, SP", destino: "Florianópolis, SC", distanciaKm: 705 },
        { origem: "São Paulo, SP", destino: "Porto Alegre, RS", distanciaKm: 1120 },
        { origem: "Curitiba, PR", destino: "Florianópolis, SC", distanciaKm: 300 },
        { origem: "Curitiba, PR", destino: "Porto Alegre, RS", distanciaKm: 711 },
        { origem: "Florianópolis, SC", destino: "Porto Alegre, RS", distanciaKm: 476 },

        // Nordeste - Capitais
        { origem: "Salvador, BA", destino: "Aracaju, SE", distanciaKm: 356 },
        { origem: "Salvador, BA", destino: "Maceió, AL", distanciaKm: 632 },
        { origem: "Salvador, BA", destino: "Recife, PE", distanciaKm: 839 },
        { origem: "Salvador, BA", destino: "Fortaleza, CE", distanciaKm: 1389 },
        { origem: "Recife, PE", destino: "Maceió, AL", distanciaKm: 285 },
        { origem: "Recife, PE", destino: "João Pessoa, PB", distanciaKm: 120 },
        { origem: "Recife, PE", destino: "Natal, RN", distanciaKm: 297 },
        { origem: "Recife, PE", destino: "Fortaleza, CE", distanciaKm: 800 },
        { origem: "Fortaleza, CE", destino: "Natal, RN", distanciaKm: 537 },
        { origem: "Fortaleza, CE", destino: "Teresina, PI", distanciaKm: 634 },
        { origem: "Fortaleza, CE", destino: "São Luís, MA", distanciaKm: 1070 },

        // Norte
        { origem: "Manaus, AM", destino: "Belém, PA", distanciaKm: 1294 },
        { origem: "Manaus, AM", destino: "Porto Velho, RO", distanciaKm: 901 },
        { origem: "Manaus, AM", destino: "Boa Vista, RR", distanciaKm: 785 },
        { origem: "Belém, PA", destino: "São Luís, MA", distanciaKm: 806 },
        { origem: "Belém, PA", destino: "Palmas, TO", distanciaKm: 1268 },

        // ===== Rotas Regionais Importantes =====

        // Interior de São Paulo
        { origem: "São Paulo, SP", destino: "Campinas, SP", distanciaKm: 95 },
        { origem: "São Paulo, SP", destino: "Santos, SP", distanciaKm: 72 },
        { origem: "São Paulo, SP", destino: "Sorocaba, SP", distanciaKm: 87 },
        { origem: "São Paulo, SP", destino: "Ribeirão Preto, SP", distanciaKm: 313 },
        { origem: "Campinas, SP", destino: "Ribeirão Preto, SP", distanciaKm: 232 },

        // Região Metropolitana do Rio
        { origem: "Rio de Janeiro, RJ", destino: "Niterói, RJ", distanciaKm: 13 },
        { origem: "Rio de Janeiro, RJ", destino: "Petrópolis, RJ", distanciaKm: 68 },
        { origem: "Rio de Janeiro, RJ", destino: "Cabo Frio, RJ", distanciaKm: 165 },

        // Minas Gerais
        { origem: "Belo Horizonte, MG", destino: "Ouro Preto, MG", distanciaKm: 100 },
        { origem: "Belo Horizonte, MG", destino: "Uberlândia, MG", distanciaKm: 543 },
        { origem: "Belo Horizonte, MG", destino: "Juiz de Fora, MG", distanciaKm: 283 }
    ],

    /**
     * Retorna array único e ordenado de todas as cidades
     * @returns {string[]} Array de nomes de cidades ordenado alfabeticamente
     */
    getTodasCidades: function() {
        // Set para armazenar cidades únicas (automaticamente remove duplicados)
        const cidadesUnicas = new Set();

        // Extrair origem e destino de todas as rotas
        this.rotas.forEach(rota => {
            cidadesUnicas.add(rota.origem);
            cidadesUnicas.add(rota.destino);
        });

        // Converter Set para Array e ordenar alfabeticamente
        return Array.from(cidadesUnicas).sort();
    },

    /**
     * Encontra a distância entre duas cidades
     * @param {string} origem - Nome da cidade de origem
     * @param {string} destino - Nome da cidade de destino
     * @returns {number|null} Distância em km se encontrada, null caso contrário
     */
    acharDistancia: function(origem, destino) {
        // Normalizar entrada: remover espaços extras e converter para minúsculas
        const origemNormalizada = origem.trim().toLowerCase();
        const destinoNormalizado = destino.trim().toLowerCase();

        // Buscar rota em ambas as direções (origem->destino e destino->origem)
        const rotaEncontrada = this.rotas.find(rota => {
            const rotaOrigem = rota.origem.trim().toLowerCase();
            const rotaDestino = rota.destino.trim().toLowerCase();

            // Verificar correspondência em ambas as direções
            return (
                (rotaOrigem === origemNormalizada && rotaDestino === destinoNormalizado) ||
                (rotaOrigem === destinoNormalizado && rotaDestino === origemNormalizada)
            );
        });

        // Retornar distância se encontrada, null caso contrário
        return rotaEncontrada ? rotaEncontrada.distanciaKm : null;
    }
};

// routesDB já está disponível globalmente como constante
