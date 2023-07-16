import fs from 'fs';
import chalk from 'chalk';



//Expressão regular -> regex
function extraiLinks(texto){
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const captura = [...texto.matchAll(regex)];
    const resultados = captura.map(captura => ({[captura[1]]: [captura[2]]}));
    return resultados.length !== 0 ? resultados : 'Não há links no arquivo';
}


function trataErro(erro){
    throw new Error(erro);
}

//Async Await 

async function pegaArquivo(caminhoDoArquivo){
    try{
        const enconding = 'utf-8';
        const texto = await fs.promises.readFile(caminhoDoArquivo, enconding);
        return extraiLinks(texto)

    } catch(erro){
        trataErro(chalk.red(erro))
    }
}

export default pegaArquivo;