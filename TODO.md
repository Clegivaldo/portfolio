# TODO - Ajustes para GitHub Pages (static)

- [ ] Confirmar estratégia de build estático e saída (branch gh-pages via workflow inexistente no repo; pode precisar adicionar workflow em `.github/workflows`).
- [x] Atualizar `next.config.ts` para `output: 'export'` (ou estratégia equivalente) e configurar `basePath` para `/portfolio` se aplicável.
- [ ] Atualizar `package.json` para scripts de export estático (`next build` + `next export`) e remover/ajustar scripts que usam standalone.
- [ ] Garantir que componentes no app não dependem de Prisma/DB durante render/build (passo seguinte após eliminar /api).
- [ ] Ajustar qualquer uso de `next-auth`/Prisma em páginas/headers/sections para renderização somente no cliente (ou evitar completamente para Pages).
- [ ] Rodar build/export localmente e validar: confirmar geração estática (pasta `.next/static`) e testar assets/linking.
- [ ] Adicionar workflow GitHub Actions (se necessário) para publicar `out/` no branch `gh-pages`.

