//_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-//
//. ___.....LSI...........________.......______..................__..__.......//
//./\  \................./\  _____\...../ _____\......LSI......./\ \ \ \......//
//.\ \_ \.......__  _____\ \ \____/..../\ \____/ ______  __  ___\ \ \_\ \..LSI//
//..\//\ \...../\_\/\  __ \ \ \_____...\ \ \____/\  __ \/\ \/ ___\ \____ \....//
//....\ \ \....\/\ \ \ \/ /\ \  ____\...\ \____ \ \ \/ /\ \  /___/\/____\ \...//
//.....\ \ \..._\ \ \ \  /..\ \ \___/....\/____\ \ \  /..\ \ \.........\ \ \..//
//.LSI..\_\ \__\ \ \ \ \ \...\ \ \______....____\ \ \ \...\ \ \.......__\_\ \.//
//....../\________\ \_\ \_\...\ \_______\../\_____/\ \_\...\ \ \...../\_____/.//
//......\/________/\/_/\/_/....\/_______/..\/____/..\/_/....\/_/.....\/____/..//
//¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-//
//    LSI          Felipe Moraes - felipemdeoliveira@live.com          LSI    //
//¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-//

var LSILightbox = (function(){

    var instancia;

    var instanciar = function()
    {
        if (typeof instancia === 'undefined') {
            instancia = new LSILightboxObj();
            return instancia;
        } else
            return instancia;
    }

    var LSILightboxObj = function()
    {
        // Expandindo o escopo
        let lb = this;

        lb.elem = {}

        // background externa
        lb.elem.bg = document.createElement('div');
        lb.elem.bg.classList.add('lightbox-bg');
        //lb.elem.bg.classList.add('fechada');
        lb.elem.bg.addEventListener(
            'click',
            function(ev) {
                if (ev.target === lb.elem.bg)
                    lb.fechar();
            },
            false
        );

        // container principal
        lb.elem.princ = document.createElement('div');
        lb.elem.princ.classList.add('lightbox');

        // cabeçalho
        lb.elem.cabecalho = document.createElement('div');
        lb.elem.cabecalho.classList.add('cabecalho');
            // título do conteúdo carregado
            lb.elem.cabSpan = document.createElement('span');
            // botão fechar
            lb.elem.cabFechar = document.createElement('div');
            lb.elem.cabFechar.classList.add('btn-fechar');
            // imagem do botão fechar
            lb.elem.cabFecharImg = document.createElement('img');
            lb.elem.cabFecharImg.setAttribute(
                'src',
                'lightbox/btn-fechar.png'
            );
            lb.elem.cabFecharImg.addEventListener(
                'click',
                function(){
                    lb.fechar();
                },
                false
            );

        // conteúdo carregado
        lb.elem.conteudo = document.createElement('div');
        lb.elem.conteudo.classList.add('conteudo');
        //lb.elem.conteudo.innerText = 'Olá mundo!';

        lb.elem.bg.appendChild(lb.elem.princ);
        lb.elem.princ.appendChild(lb.elem.cabecalho);
        lb.elem.cabecalho.appendChild(lb.elem.cabSpan);
        lb.elem.cabecalho.appendChild(lb.elem.cabFechar);
        lb.elem.cabFechar.appendChild(lb.elem.cabFecharImg);
        lb.elem.princ.appendChild(lb.elem.conteudo);
        document.querySelector('body').appendChild(lb.elem.bg);

        this.addGatilho = function(userData)
        {
            if (
                typeof userData !== 'object'
                || userData === null
            )
                return false;

            var opcoes = {
                titulo: 'LSILightbox',
                conteudo: 'Criado por LipESprY',
                metodo: 'get',
                dados: null,
                cache: false
            }

            for (let opcao in userData) {
                opcoes[opcao] = userData[opcao];
            }

            if (
                typeof opcoes.alvo !== 'object'
                || opcoes.alvo === null
            )
                return false;

            opcoes.alvo.addEventListener(
                'click',
                function(ev){
                    ev.preventDefault();
                    lb.abrir(opcoes);
                },
                false
            );
            return this;
        }

        this.escondeLoading = function()
        {
            if (typeof lb.elem.loading === 'object') {
                lb.elem.loading.parentNode.removeChild(
                    lb.elem.loading
                );
                lb.elem.loading = undefined;
            }
        }

        this.ajax = function(opcoes)
        {
            let ajax = new XMLHttpRequest();

            // abrindo a conexão
            if (
                typeof opcoes.metodo === 'string'
                && opcoes.metodo.toUpperCase() == 'GET'
                && typeof opcoes.dados === 'string'
            )
                ajax.open(
                    opcoes.metodo,
                    (opcoes.url)
                    +(
                        (/\?/).test(opcoes.url)
                        ? (
                            '&'+opcoes.dados
                            +(
                                opcoes.cache === false
                                ? '&_='+(new Date()).getTime()
                                : ''
                            )
                        )
                        : (
                            '?'+opcoes.dados
                            +(
                                opcoes.cache === false
                                ? '&_='+(new Date()).getTime()
                                : ''
                            )
                        )
                    ),
                    true
                );
            else
                ajax.open(
                    opcoes.metodo,
                    (opcoes.url)
                    +(
                        opcoes.cache === false
                        ? (
                            (/\?/).test(opcoes.url)
                            ? '&_='+(new Date()).getTime()
                            : '?_='+(new Date()).getTime()
                        )
                        : ''
                    ),
                    true);


            // preparando recebimento da resposta
            ajax.onreadystatechange = function(){
                if (ajax.readyState === 4) {
                    if (ajax.status >= 200 && ajax.status < 400) {
                        lb.escondeLoading();
                        lb.elem.conteudo.innerHTML = ajax.responseText;
                    } else {
                        lb.escondeLoading();
                        lb.elem.conteudo.innerHTML = ajax.responseText;
                    }
                }
            }

            // preparando cabeçalhos
            ajax.setRequestHeader(
                'Content-Type',
                'application/x-www-form-urlencoded'
            );
            if (
                typeof opcoes.headers === 'object'
                && opcoes.headers !== null
            ) {
                for (let header in opcoes.headers) {
                    ajax.setRequestHeader(header, opcoes.headers[header]);
                }
            }


            // [preparando dados e] enviando a conexão
            if (
                typeof opcoes.metodo === 'string'
                && opcoes.metodo.toUpperCase() === 'POST'
                && typeof opcoes.dados === 'string'
            )
                ajax.send(opcoes.dados);
            else
                ajax.send(null);
        }

        this.abrir = function(opcoes)
        {
            lb.elem.cabSpan.innerText = opcoes.titulo;

            if (typeof opcoes.url === 'string') {
                lb.elem.conteudo.innerText = '';

                lb.elem.loading = document.createElement('div');
                lb.elem.loading.classList.add('loading');
                lb.elem.conteudo.appendChild(lb.elem.loading);

                lb.ajax(opcoes);
            } else
                lb.elem.conteudo.innerHTML = opcoes.conteudo;

            lb.elem.bg.style.display = 'flex';
            if (lb.elem.bg.classList.contains('fechada'))
                lb.elem.bg.classList.remove('fechada');
            lb.elem.bg.classList.add('aberta');
        }

        this.fechar = function()
        {
            lb.elem.bg.style.display = 'flex';
            if (lb.elem.bg.classList.contains('aberta')) {
                lb.elem.bg.classList.remove('aberta');
                lb.elem.bg.classList.add('fechada');
            }
            setTimeout(function(){
                lb.elem.bg.style.display = 'none';
                lb.escondeLoading();
            }, 700); // tempo [pouco menor] da animação CSS ao fechar
        }

        return lb;
    }

    return instanciar;
})();
