document.addEventListener('DOMContentLoaded', function () {
    const launcher = document.querySelector('.chat-launcher');
    const chatWindow = document.querySelector('.chat-window');
    const closeBtn = document.querySelector('.close-btn');
    const sendBtn = document.getElementById('chat-send-btn');
    const inputField = document.getElementById('chat-input');
    const messagesContainer = document.querySelector('.chat-messages');

    // Toggle Chat Window logic (Auto-clear on close)
    function toggleChat() {
        const isOpen = chatWindow.classList.contains('open');

        if (isOpen) {
            // Closes the window
            chatWindow.classList.remove('open');
            // Clear chat after transition (300ms) to reset state
            setTimeout(() => {
                messagesContainer.innerHTML = `
            <div class="message bot">
              Olá! Sou o assistente virtual da Geolog. Como posso ajudar você a otimizar sua logística hoje?
            </div>
            `;
            }, 300);
        } else {
            // Opens the window
            chatWindow.classList.add('open');
            inputField.focus();
        }
    }

    launcher.addEventListener('click', toggleChat);
    closeBtn.addEventListener('click', toggleChat);

    // RULE-BASED RESPONSE LOGIC (Super Expanded)
    function getBotResponse(input) {
        const lowerInput = input.toLowerCase();

        // Greeting & Social
        if (lowerInput.includes('olá') || lowerInput.includes('oi') || lowerInput.includes('bom dia') || lowerInput.includes('boa tarde') || lowerInput.includes('boa noite') || lowerInput.includes('e aí')) {
            return "Olá! 👋 Sou o Logikos, assistente virtual da Geolog. Estou aqui para agilizar seu atendimento. Sobre o que gostaria de saber: Consultoria, Perícias, Treinamentos ou nossa Equipe?";
        }

        if (lowerInput.includes('Qual seu nome?') || lowerInput.includes('nome') || lowerInput.includes('quem é você')) {
            return "Me chamo Logikos, e qual o seu? Estamos à disposição. Se precisar de algo mais técnico, não hesite em chamar.";
        }

        if (lowerInput.includes('falar com atendente') || lowerInput.includes('atendente') || lowerInput.includes('atendimento')) {
            return "Para falar com um atendente, basta clicar no botão do whatsapp ou preencher o formulário.";
        }

        if (lowerInput.includes('obrigado') || lowerInput.includes('valeu') || lowerInput.includes('grato')) {
            return "Por nada! Estamos à disposição. Se precisar de algo mais técnico, não hesite em chamar.";
        }
        if (lowerInput.includes('tchau') || lowerInput.includes('até logo') || lowerInput.includes('encerrar')) {
            return "Até logo! Se precisar, estaremos aqui. Tenha um excelente dia de trabalho! 🚛";
        }

        // Founder / Team / Authority
        if (lowerInput.includes('luiz') || lowerInput.includes('fundador') || lowerInput.includes('dono') || lowerInput.includes('quem é')) {
            return "A Geolog é liderada por Luiz Andrade 🎓. Ele é especialista em Logística com MBA em Gestão Industrial, Pós-graduado em Docência e tem vasta experiência prática em operações e perícias judiciais.";
        }
        if (lowerInput.includes('equipe') || lowerInput.includes('funcionários') || lowerInput.includes('especialistas')) {
            return "Além do nosso fundador, contamos com uma rede de parceiros homologados: engenheiros para laudos técnicos, contadores para perícias fiscais de frete e advogados especializados em direito dos transportes.";
        }

        // Specific Services - Detailed
        if (lowerInput.includes('perícia') || lowerInput.includes('judicial') || lowerInput.includes('litígio') || lowerInput.includes('processo')) {
            return "⚖️ **Perícias Judiciais e Extrajudiciais**: Atuamos como assistentes técnicos em processos que envolvem transporte, armazenagem, avarias e contratos logísticos. Produzimos laudos robustos para defender seus interesses.";
        }

        if (lowerInput.includes('consultoria') || lowerInput.includes('gestão') || lowerInput.includes('projeto') || lowerInput.includes('melhoria')) {
            return "📊 **Consultoria Estratégica**: Redesenhamos sua malha logística, otimizamos rotas e reestruturamos processos de armazém. O foco é reduzir o custo por pedido e aumentar o nível de serviço.";
        }

        if (lowerInput.includes('treinamento') || lowerInput.includes('curso') || lowerInput.includes('palestra') || lowerInput.includes('ensinar')) {
            return "🎓 **Educação Corporativa**: Levamos o conhecimento para dentro da sua empresa. Temas como: Gestão de Estoques, Liderança Operacional, Customer Service Logístico e Excelência em Transportes.";
        }

        if (lowerInput.includes('laudo') || lowerInput.includes('parecer')) {
            return "📄 **Laudos e Pareceres**: Emitimos documentos técnicos para fundamentar decisões ou processos judiciais/administrativos. Análise imparcial e baseada em dados.";
        }

        // Pricing / Hiring
        if (lowerInput.includes('preço') || lowerInput.includes('valor') || lowerInput.includes('quanto custa') || lowerInput.includes('orçamento')) {
            return "Cada operação é única, e nossos projetos também. Para passar um valor justo, precisamos entender sua dor atual. \n\n👉 Clique em 'Fale Conosco' no menu ou use o botão do WhatsApp para um papo rápido sem compromisso.";
        }

        // Location / Coverage
        if (lowerInput.includes('onde') || lowerInput.includes('cidade') || lowerInput.includes('estado') || lowerInput.includes('sc')) {
            return "📍 Nossa base é em Pomerode (SC), o coração do vale europeu. Porém, a logística não tem fronteiras: atendemos projetos em todo o Brasil, seja presencialmente ou via gestão remota.";
        }

        // Methodology
        if (lowerInput.includes('diferencial') || lowerInput.includes('por que') || lowerInput.includes('melhor')) {
            return "🚀 Nosso diferencial é a **Visão 360º**: unimos a prática bruta do chão de fábrica (nós carregamos caixa!) com a sofisticação da análise de dados e a segurança jurídica. Não entregamos 'papel', entregamos resultado.";
        }

        // Contact Direct
        if (lowerInput.includes('contato') || lowerInput.includes('email') || lowerInput.includes('telefone') || lowerInput.includes('zap') || lowerInput.includes('whatsapp')) {
            return "📞 Vamos conversar?\n- WhatsApp: (Botão no site)\n- E-mail: contato@geologconsultoria.com.br\n- Resposta garantida em até 24h úteis.";
        }

        // Default Fallback
        return "🤔 Entendi... ou quase. Ainda estou aprendendo as nuances da logística. \n\nTente perguntar sobre:\n- 'Perícias'\n- 'Consultoria'\n- 'Treinamentos'\n- 'Equipe'\n\nOu peça para 'Falar no WhatsApp' se for urgente.";
    }

    // Send Message Logic
    function sendMessage() {
        const messageText = inputField.value.trim();
        if (messageText === '') return;

        console.log("User sent:", messageText);

        // Add User Message
        addMessage(messageText, 'user');
        inputField.value = '';

        // Disable input briefly
        inputField.disabled = true;
        sendBtn.disabled = true;

        // Show Typing Indicator
        showTypingIndicator();

        // Simulate thinking delay
        setTimeout(() => {
            const botResponse = getBotResponse(messageText);
            removeTypingIndicator();
            addMessage(botResponse, 'bot');

            // Re-enable
            inputField.disabled = false;
            sendBtn.disabled = false;
            inputField.focus();
        }, 1000); // 1 second delay for natural feel
    }

    sendBtn.addEventListener('click', sendMessage);

    inputField.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Helper: Add Message to UI
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);

        // Allow Basic Formatting (Lines) - very simple check
        if (text.includes('\n')) {
            messageDiv.innerHTML = text.replace(/\n/g, '<br>');
        } else {
            messageDiv.textContent = text;
        }

        messagesContainer.appendChild(messageDiv);
        scrollToBottom();
    }

    // Helper: Scroll to bottom
    function scrollToBottom() {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Helper: Show Typing Indicator
    let typingIndicator = null;
    function showTypingIndicator() {
        if (typingIndicator) return;
        typingIndicator = document.createElement('div');
        typingIndicator.classList.add('typing-indicator');
        typingIndicator.innerHTML = `
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    `;
        messagesContainer.appendChild(typingIndicator);
        scrollToBottom();
    }

    function removeTypingIndicator() {
        if (typingIndicator) {
            typingIndicator.remove();
            typingIndicator = null;
        }
    }
});
