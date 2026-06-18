# CLOUTRIK HomePage

Homepage em React Native Web para apresentar a CLOUTRIK.

CLOUTRIK usa a ideia de "cloud tricks": desafios praticos para pessoas treinarem como e trabalhar em projetos grandes com Git, regras de commit, CI/CD, observabilidade, mensageria, microservicos distribuidos e qualidade comprovada por automacoes.

CLK pode aparecer como sigla interna ou apelido tecnico da comunidade.

GitHub da organizacao: https://github.com/Cloutrik

## Rodando localmente

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

O build gera a pasta `dist`.

## Publicacao no GitHub Pages

O workflow em `.github/workflows/deploy.yml` publica automaticamente a cada push na branch `main`.

No GitHub, confira em `Settings > Pages` se a origem esta como `GitHub Actions`.
