# PokemonTcgAngular
Este projeto foi gerado com [Angular CLI](https://github.com/angular/angular-cli) version 17.3.1.
O layout foi criao no [Figma e poderá ter acesso aqui](https://www.figma.com/design/6GwuYx02u4f2QeSX7K5TMc/Pokemon?m=auto&t=eGatp0PwbMP7aHM1-6)

## Descrição
Usando a API [Pokemon TCG](https://docs.pokemontcg.io/#api_v1cards_list) e o [mockapi.io](https://mockapi.io/) para implementar uma aplicação que consulte as cartas de Pokemon e monte baralhos para o usuário.

### Requisitos

#### Lista de baralhos
- ✔️ O usuário pode ver seus baralhos;
- ✔️ O usuário pode criar um novo baralho;
- ✔️ O usuário pode remover um baralho;
- ✔️ O usuário pode editar um baralho;
- ✔️ O usuário pode clicar num baralho para visualizar seus detalhes.

### Criação de um baralho
- ✔️ O usuário pode colocar um nome no seu baralho;
- ✔️ O usuário pode inserir cartas no baralho;
- ✔️ O baralho tem que ter no mínimo 24 cartas e no máximo 60;
- ✔️ Só podem ter 4 cartas com o mesmo nome, no baralho. (Nome não id) 
```[⚠️ Não Ficou claro se é parte do nome ou o nome inteiro ];```
- ✔️ Após salvar o baralho voltamos para a página de lista de baralhos atualizada;


### Detalhes do baralho
- ✔️ O baralho será salvo apenas em memória. 
```[⚠️ Não ficou claro se usarei um Mockapi, ou localstorage, ou sessionstorage ou um firebase].```
- ✔️ O usuário consegue ver quantos pokemons e cartas de treinador existem no baralho. (atributo supertype) 
- ✔️ O usuário consegue ver de quantas cores é o baralho. quantos types únicos existem no baralho.
- ✔️ Quanto a interface, vamos deixar a sua criatividade falar mais alto, capriche nas suas ideias, nos surpreenda.

### Conclusão
Disponibilize o seu código no github ou bitbucket e compartilhe com a gente, não deixe de detalhar no readme do projeto qual arquitetura, funcionalidades e ambiente de desenvolvimento utilizou.
