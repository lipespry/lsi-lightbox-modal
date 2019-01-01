// Requer jQuery
// Criado e testado com jQuery 3.3.1
// <script type="text/javascript" src="https://code.jquery.com/jquery-3.3.1.min.js"></script>

jQuery.fn.extend({
    ajaxLb: function (opcoesUsuario) {
        this.on('click', function(e){

            e.preventDefault();
            e.stopPropagation();

            let opcoesPadrao = {
                titulo: $(this).attr('titulo'),
                conteudo: 'Carregando...',
                url: $(this).attr('href'),
                method: $(this).attr('method'),
                data: $(this).attr('data'),
                dataType: 'html',
                cache: false
            }
            let opcoes = $.extend({}, opcoesPadrao, opcoesUsuario);

            $.toggleLb(opcoes);
            $.ajax(opcoes)
                .done(function(resp) {
                    $('div.lightbox-bg > div.lightbox > div.conteudo')
                        .html(resp);
                })
                .fail(function(erro) {
                    $('div.lightbox-bg > div.lightbox > div.conteudo')
                        .html(
                            'Algo está impedindo o carregamento. Tente novamente mais tarde.'
                        );
                });
        });
    },
    abreLb: function (opcoesUsuario) {
        this.on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            let opcoesPadrao = {
                titulo: 'Lightbox',
                conteudo: undefined
            }
            let opcoes = $.extend({}, opcoesPadrao, opcoesUsuario);
            $.toggleLb(opcoes);
        });
    }
});

jQuery.extend({
    toggleLb: function (opcoes) {
        if ($('div.lightbox-bg').is(':visible')) { // Fecha
            $('body').removeClass('lightbox-aberta');
            $('div.lightbox-bg').animate({
                opacity: 0
            }, 600, function(){
                $('div.lightbox-bg').toggle();
                $('div.lightbox-bg > div.lightbox > div.cabecalho > span')
                    .html('Lightbox - por LipESprY');
            });
        } else { // Abre
            $('div.lightbox-bg > div.lightbox > div.cabecalho > span')
                .html(
                    (typeof opcoes.titulo === 'string')
                    ? opcoes.titulo
                    : 'Lightbox'
                );
            if ((typeof opcoes.conteudo === 'string')) {
                $('div.lightbox-bg > div.lightbox > div.conteudo')
                    .html(opcoes.conteudo);
            }
            $('div.lightbox-bg').toggle();
            $('div.lightbox-bg').animate({
                opacity: 1
            }, 600, function(){
                $('body').addClass('lightbox-aberta');
            });
        }
    }
});

$(document).ready(function(){
    $('.lightbox-close').on('click', function(){
        $.toggleLb();
    });
    $('.lightbox-bg').on('click', function(e){
        if (e.target.id == 'lsi_lightbox') {
            $.toggleLb();
        }
    });
});
