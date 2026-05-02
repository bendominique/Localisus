export const COORDENADAS_HOSPITAL = {
    SAO_CAMILO: [-23.5505, -46.6333] as [number, number],
    SAO_JOSE: [-23.5600, -46.6400] as [number, number],
    SANTA_MARCELINA: [-23.5300, -46.4500] as [number, number],
}

/*       Implementações de Objetos Constantes e Enums do Typescript 

como funcionam os Objetos Constantes do Typescript? 

Como o nome propos, os objetos constantes do typescript se tratam daqueles nos quais as suas propriedades
 e valores são tratados de forma imutável, por conta disso eles são apenas read-only a nível de compilação.

O Javascript por padrão (até mesmo por se tratar de uma linguagem com a tipagem fraca), nos permite criar valores de constantes
 que depois podem ser reatribuídas com um novo valor, aqui no Type não my friend, então nós devemos específica-las para que isso aconteça.

Isso evita que um erro como o Type mismatch ocorra, erro esse que impossibilita o typescript de interpretar ou realizar
 determinadas ações pois ele compreende que estamos tentando realizar uma atribuição para algo que é apenas para leitura. 


 TUPLAS: são tabelas que contém um número fixo de elementos e um tipo para a definição da posição desses elementos, aqui no nosso código
 utilizamos as tuplas representando as suas coordenadas e coordenadas essas que representam números.

 No código, a única coisa que está protegida são as nossas referências, ou seja quando alguém tentar atribuir para SAO_CAMILO = [0.312, 3412.21] dá erro,
 pois se trata de uma constante, agora seu valores inclusos podem ser alterados se modificarmos da seguinte forma:
 SAO_CAMILO[-46.6333] = [0], pois não está utilizando as const, uma atribuição que transforma todos os elementos em constantes.


*/