# Sistema de Venda Online

MVP estatico de loja online com catalogo, filtros, carrinho, checkout e painel de pedidos.

## Como abrir

Abra `index.html` no navegador. Nao precisa de instalacao, servidor ou banco de dados.

## O que ja existe

- Logo configuravel no topo da loja pelo painel de administrador.
- Catalogo com produtos, categorias, imagens e stock.
- Pesquisa por nome e filtro por categoria.
- Menu de categorias no hover com opcoes rapidas do que o cliente procura.
- Vitrine com produtos em movimento automatico.
- Opcoes no hover para ver/adicionar outros produtos relacionados.
- Painel de administrador para criar, editar e excluir produtos.
- Cadastro de produto com link de imagem ou envio de ficheiro do computador.
- Previa da imagem antes de guardar o produto.
- Geracao rapida de SKU no formulario de produto.
- Icone automatico nas categorias do menu e dos cards.
- Leitor de QR/codigo com camera quando o navegador permitir.
- Entrada manual de codigo por ID ou SKU, como `p1`, `QR-p1` ou `SKU-1001`.
- Favoritos, ordenacao e indicadores rapidos da loja.
- Precos e totais em FCFA.
- Janela de ajuda rapida.
- Confirmacao do pedido via WhatsApp com mensagem pronta.
- Carrinho lateral com quantidades, remocao e totais.
- Checkout com dados do cliente e metodo de pagamento.
- Pedidos guardados no `localStorage` do navegador.
- Resumo de receita e pedidos do dia.

## Administrador

Clique em `Administrador` no canto direito do topo e entre com a senha inicial:

`admin123`

Depois de entrar, o administrador pode:

- Trocar o nome e o link do logo da loja.
- Criar novos produtos.
- Enviar imagem do produto pelo computador ou colar um link de imagem.
- Editar produtos existentes.
- Excluir produtos.
- Limpar pedidos.

Esta protecao e apenas visual/local porque o projeto ainda e estatico. Antes de publicar de verdade, crie um backend com login real e troque a senha no arquivo `app.js`.

## Proximos passos recomendados

- Trocar os produtos fixos por uma base de dados.
- Criar login seguro de cliente e administrador com backend.
- Integrar pagamentos reais, como Mobile Money, cartao ou gateway local.
- Adicionar envio de emails de confirmacao.
- Criar API backend para pedidos, stock e faturacao.
