# Game Boy

Recriação interativa do Game Boy clássico (DMG) na web.

Projeto feito com **Next.js**, **TypeScript** e **Tailwind CSS**, com o console montado em componentes — tela, D-pad, botões A/B, Select/Start, luz de bateria, ranhuras do alto-falante e demais detalhes do hardware.

## Demo

- App: [gameboy-three-snowy.vercel.app](https://gameboy-three-snowy.vercel.app)
- Código: [github.com/sergiofisio/gameboy](https://github.com/sergiofisio/gameboy)

## O que tem

- Switch **OFF / ON** no topo do console
- Sons nos botões, no D-pad e ao ligar/desligar
- Controle de volume na lateral direita
- Rack de cartuchos com labels reais:
  - Pokémon Red
  - Tetris
  - Super Mario Land
  - The Legend of Zelda: Link's Awakening
  - Metroid II: Return of Samus
- Inserção do cartucho pelo topo
- Troca de jogo só com o console **desligado**
- Tela com mensagem de erro sem cartucho e gameplay ao ligar com um cartucho inserido

## Stack

| Tecnologia   | Uso                          |
| ------------ | ---------------------------- |
| Next.js 16   | App Router e componentes     |
| TypeScript   | Tipagem                      |
| Tailwind CSS | Estilos e layout responsivo  |
| React 19     | Estado e interações do UI    |

## Como rodar

Pré-requisitos: Node.js 20+ e Yarn.

```bash
yarn
yarn dev
```

Abra [http://localhost:3000](http://localhost:3000).

### Scripts

```bash
yarn dev    # ambiente de desenvolvimento
yarn build  # build de produção
yarn start  # sobe o build
yarn lint   # ESLint
```

## Estrutura

```text
app/
  components/     # UI do console (header, botões, tela, cartuchos…)
  pages/          # composição principal do Game Boy
  layout.tsx
  page.tsx
lib/
  cartridges.ts   # dados dos jogos
  sounds.ts       # helper de áudio
public/
  cartridges/     # imagens dos cartuchos
  sounds/         # efeitos sonoros
  videos/         # gameplays por cartucho
```

## Como usar

1. Com o console **desligado**, clique em um cartucho para inserir.
2. Deslize o switch para **ON**.
3. Ajuste o volume na roda lateral, se quiser.
4. Para trocar de jogo, desligue o console e clique no cartucho inserido (ou escolha outro).

## Licença

Projeto pessoal / desafio de frontend. Marcas e jogos citados pertencem aos seus respectivos donos.
