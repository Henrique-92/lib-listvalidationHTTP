import chalk from "chalk";

function extraiLinks(arrLinks){
    return arrLinks.map((objetoLinks) => Object.values(objetoLinks).join())
}

async function checaStatus (listaURLS) {
    const arrStatus = await Promise.all(
        listaURLS.map(async (url) => {
            try {
                const response = await fetch(url)
                return `${response.status} - ${response.statusText}` 
            } catch (erro) {
                return manejaErros(erro)
            }
        })
    )
    return arrStatus;
}

function manejaErros (erro){
    if(erro.cause.code === 'ENOTFOUND'){
        return 'Link não encontrado';
    } else{
        return 'ocorrou algum erro';
    }
}

export default async function listaValidada(listaDeLinks){
   const links = extraiLinks(listaDeLinks);
   const status = await checaStatus(links);
   /* console.log(status); */
   /* return status; */

 return listaDeLinks.map((objeto, indice) => ({
    ...objeto, 
    status: status[indice]
 }))  
}

