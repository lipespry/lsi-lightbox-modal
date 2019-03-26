# lsi-lightbox-modal

Lightbox com opção de exibir conteúdo recebido via requisição ajax e com dimensionamento automático, conforme conteúdo carregado.

**Agora com JavaScript puro! NÃO necessita jQuery!**

## [Veja a demonstração](https://lipespry.github.io/lsi-lightbox-modal/demo.html)

## Uso:

1) Carregar o script e a folha de estilos da Lightbox na raiz do HTML:

```html
<script type="text/javascript" src="lightbox/script.js"></script>
<link rel="stylesheet" type="text/css" href="lightbox/estilo.css">
```

2) Fazer a chamada da lightbox:

- Página HTML (ajax):

[![LSI-Lightbox](assets/conteudo_dinamico_com_ajax.png)](assets/conteudo_dinamico_com_ajax.png)

```html
<a href="javascript: void(0);" id="lb_html">Conteúdo dinâmico via ajax [página HTML];</a>
<script>
    LSILightbox().addGatilho({
        alvo: document.getElementById('lb_html'),
        titulo: 'Lightbox - por LipESprY [url HTML]',
        conteudo: 'Este não vai aparecer porque é página HTML',
        url: 'demo-conteudo.html',
        metodo: 'GET',
        dados: "nome=LipESprY&email=felipemdeoliveira%40live.com",
        headers: {
            "LSIAPP-by-LipESprY":"LipESprY Lightbox!"
        }
    });
</script>
```

- Texto estático (aceita tags HTML):

[![LSI-Lightbox](assets/conteudo_estatico.png)](assets/conteudo_estatico.png)

```html
<a href="javascript: alert(0);" id="lb_estatico">Conteúdo estático [texto];</a>
<script>
    LSILightbox().addGatilho({
        alvo: document.getElementById('lb_estatico'),
        titulo: 'Lightbox - por LipESprY [texto+html]',
        conteudo: (
            'Lorem ipsum dolor sit amet, consectetur adipisicing'
            +' elit. <b>Veritatis alias iure repellat</b> vel dolore enim'
            +' pariatur eos amet sequi provident doloremque ipsa maxime'
            +' <i>porro autem accusantium</i>, nulla commodi,'
            +' minima architecto.'
        )
    });
</script>
```

## Opções para chamada da LightBox:

Opções disponíveis na chamada da Lightbox.

```javascript
var opcoes = {
    // elemento clicável para abrir a lightbox
    // opção requerida - sem alvo padrão
    alvo: document.getElementById('id_do_elemento'),
    // título
    // padrão: 'LSILightbox'
    titulo: "LSILightbox",
    // texto [não aparece em caso de página html (ajax)]
    // padrão: 'Criado por LipESprY'
    conteudo: "Criado por LipESprY",
    // página html (ajax)
    url: "http://minhapagina.com.br",
    // método http
    // padrão: 'get'
    metodo: "get",
    // dados - deve ser string no formato urlencode ou null.
    // padrão: null
    dados: "nome=LipESprY&email=felipemdeoliveira%40live.com",
    // se true, habilita cache da página html
    // padrão: false
    cache: false,
    // cabeçalhos http
    headers: {
        "LSILightbox":"por LipESprY"
    },
    // executar os scripts carregados no corpo da lightbox?
    // ex.: <script>alert('vai executar?');</script>
    // ou: <script src="meuscript.js"></script>
    // padrão: true
    script: true
}
```

## [Licença: MIT](https://github.com/lipespry/lsi-lightbox-modal/blob/master/LICENSE)

## Agradecimentos especiais pelas contribuições de:

Higo Ribeiro <horbjn@gmail.com>;

Sam <https://pt.stackoverflow.com/users/8063/sam>;

hugocsl <https://pt.stackoverflow.com/users/97477/hugocsl>;
