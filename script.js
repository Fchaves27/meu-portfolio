/* ========================================
   INICIALIZAÇÃO DO DOCUMENTO
   ======================================== */

/* Aguarda o carregamento completo do DOM antes de executar o código */
document.addEventListener('DOMContentLoaded', function() {

    /* ========================================
       1. SISTEMA DE TEMA CLARO/ESCURO
       ======================================== */

    // Seleciona o botão de alternância de tema
    const themeBtn = document.getElementById('theme-toggle');
    
    // Seleciona os ícones de lua (tema claro) e sol (tema escuro)
    const moonIcon = document.querySelector('.moon-icon');
    const sunIcon = document.querySelector('.sun-icon');
    
    // Verifica se o botão existe antes de adicionar o evento
    if(themeBtn) {
        themeBtn.addEventListener('click', function() {
            // Alterna a classe 'dark-mode' no elemento body
            // Isto muda todas as variáveis CSS para cores do tema escuro
            document.body.classList.toggle('dark-mode');
            
            // Alterna visibilidade dos ícones: mostra sol no modo escuro, lua no modo claro
            if (document.body.classList.contains('dark-mode')) {
                moonIcon.style.display = 'none';    // Esconde a lua
                sunIcon.style.display = 'block';    // Mostra o sol
            } else {
                moonIcon.style.display = 'block';   // Mostra a lua
                sunIcon.style.display = 'none';     // Esconde o sol
            }
        });
    }


    /* ========================================
       2. FORMULÁRIO DE CONTATO
       ======================================== */

    // Seleciona o formulário de contato pelo ID
    const contactForm = document.getElementById('contact-form');
    
    // Seleciona a div para exibir mensagens de feedback
    const formMessage = document.getElementById('form-message');

    // Verifica se o formulário existe na página
    if (contactForm) {
        // Adiciona listener para o evento de envio do formulário
        contactForm.addEventListener('submit', function(e) {
            // Previne o comportamento padrão (recarregar a página)
            e.preventDefault();

            // Obtém os valores dos campos do formulário
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // --- VALIDAÇÃO: Campos vazios ---
            // Verifica se algum campo está vazio (trim remove espaços em branco)
            if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
                showMessage('Por favor, preencha todos os campos!', 'error');
                return;  // Interrompe a execução
            }

            // --- VALIDAÇÃO: Formato de e-mail ---
            // Valida se o e-mail tem formato correto usando Regex
            if (!isValidEmail(email)) {
                showMessage('Por favor, insira um e-mail válido!', 'error');
                return;  // Interrompe a execução
            }

            // --- ENVIO: Simulação de envio ---
            // Registra os dados no console (útil para debug)
            console.log('Dados do formulário:', { name, email, message });
            
            // Mostra mensagem de sucesso personalizada com o nome do usuário
            showMessage(`Obrigado, ${name}! Sua mensagem foi enviada com sucesso!`, 'success');
            
            // Limpa todos os campos do formulário
            contactForm.reset();

            // Remove a mensagem de feedback após 5 segundos
            setTimeout(() => {
                formMessage.style.display = 'none';
                formMessage.className = 'form-message';
            }, 5000);
        });
    }

    // --- FUNÇÃO AUXILIAR: Validar e-mail ---
    // Usa expressão regular para validar o formato do e-mail
    function isValidEmail(email) {
        // Padrão Regex: texto@texto.extensão
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // --- FUNÇÃO AUXILIAR: Mostrar mensagens ---
    // Exibe mensagens de sucesso ou erro na página
    function showMessage(text, type) {
        if (formMessage) {
            formMessage.textContent = text;                    // Define o texto da mensagem
            formMessage.className = `form-message ${type}`;    // Aplica classe de estilo (success/error)
            formMessage.style.display = 'block';               // Torna a mensagem visível
        }
    }


    /* ========================================
       3. INTERAÇÃO COM CARDS DE PROJETOS
       ======================================== */

    // Seleciona todos os cards de projetos
    const projectCards = document.querySelectorAll('.project-card');
    
    // Itera sobre cada card de projeto
    projectCards.forEach(card => {
        // Adiciona um listener de clique em cada card
        card.addEventListener('click', function() {
            // Busca o título (h3) dentro do card
            const h3 = this.querySelector('h3');
            
            // Verifica se o título existe
            if (h3) {
                // Extrai o nome do projeto do título
                const projectName = h3.textContent;
                
                // Exibe um alerta quando o card é clicado
                alert(`Você clicou no ${projectName}!`);
            }
        });
    });


    /* ========================================
       4. EFEITO DE DIGITAÇÃO NO TÍTULO
       ======================================== */

    // Seleciona o título no header (h1)
    const title = document.querySelector('header h1');
    
    // Verifica se o título existe
    if (title) {
        // Armazena o texto original
        const originalText = title.textContent;
        
        // Limpa o conteúdo do título
        title.textContent = '';
        
        // Inicializa contador para caractere atual
        let i = 0;

        // --- FUNÇÃO: Efeito de digitação (Typewriter) ---
        // Escreve caractere por caractere com delay
        function typeWriter() {
            // Verifica se ainda há caracteres para escrever
            if (i < originalText.length) {
                // Adiciona o próximo caractere ao título
                title.textContent += originalText.charAt(i);
                i++;
                
                // Chama a função novamente após 100ms
                setTimeout(typeWriter, 100);
            }
        }

        // Inicia o efeito de digitação
        typeWriter();
    }


    /* ========================================
       5. SCROLL SUAVE PARA SEÇÕES
       ======================================== */

    // Seleciona todos os links de navegação que começam com # (âncoras)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        // Adiciona listener para clique em cada link
        anchor.addEventListener('click', function (e) {
            // Previne o comportamento padrão de navegação imediata
            e.preventDefault();
            
            // Obtém o seletor do elemento alvo (ex: #sobre)
            const target = document.querySelector(this.getAttribute('href'));
            
            // Verifica se o elemento alvo existe
            if (target) {
                // Faz scroll suave até o elemento
                // behavior: 'smooth' = animação suave
                // block: 'start' = alinha o topo do elemento com o topo da viewport
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

});