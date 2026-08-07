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
- **Tetris jogável** via emulador (ROM hospedada por você — não vai no Git)

## Stack

| Tecnologia   | Uso                          |
| ------------ | ---------------------------- |
| Next.js 16   | App Router e componentes     |
| TypeScript   | Tipagem                      |
| Tailwind CSS | Estilos e layout responsivo  |
| React 19     | Estado e interações do UI    |
| gameboy-emulator | Emulador GB (Tetris jogável) |

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
    tetris-emulator/  # emulador + teclado (só cartucho Tetris)
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
  roms/           # opcional local (gitignored)
```

## Como usar

1. Com o console **desligado**, clique em um cartucho para inserir.
2. Deslize o switch para **ON**.
3. Ajuste o volume na roda lateral, se quiser.
4. Para trocar de jogo, desligue o console e clique no cartucho inserido (ou escolha outro).

### Controles do Tetris (teclado)

Com o cartucho Tetris inserido e o console ligado:

| Tecla   | Botão Game Boy |
| ------- | -------------- |
| Setas   | D-pad          |
| `Z`     | A              |
| `X`     | B              |
| `Enter` | Start          |
| `Espaço`| Select         |

Os outros cartuchos continuam mostrando gameplay em vídeo.

## ROM do Tetris (obrigatória para jogar)

A ROM **não** entra no repositório. Você hospeda o arquivo e aponta a URL pública.

1. Crie um Blob **Public** no projeto Vercel (**Storage → Blob**), ou use outro CDN.
2. Envie a ROM (exemplo com Vercel CLI):

```bash
npx @vercel/blob upload "caminho/para/tetris.gb" --name tetris.gb
```

3. Defina a variável de ambiente (local e/ou Vercel):

```bash
NEXT_PUBLIC_TETRIS_ROM_URL=https://….public.blob.vercel-storage.com/tetris.gb
```

Localmente, crie um `.env.local` com essa linha e rode `yarn dev`.

Opcional na máquina: coloque a ROM em `public/roms/tetris.gb` (pasta gitignored) e use:

```bash
NEXT_PUBLIC_TETRIS_ROM_URL=/roms/tetris.gb
```

Sem a variável, a tela do Tetris mostra “ROM NÃO CONFIGURADA” e o site não quebra.

Responsabilidade legal da ROM e do hosting é sua.

## Licença

Projeto pessoal / desafio de frontend. Marcas e jogos citados pertencem aos seus respectivos donos.
