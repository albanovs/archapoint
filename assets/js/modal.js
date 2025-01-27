const form = document.querySelector('.cs_unique_form');

function showModal(message) {
    const modal = document.createElement('div');

    const backdrop = document.createElement('div');
    backdrop.style.position = 'fixed';
    backdrop.style.top = '0';
    backdrop.style.left = '0';
    backdrop.style.width = '100%';
    backdrop.style.height = '100%';
    backdrop.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    backdrop.style.zIndex = '999';
    backdrop.style.animation = 'fadeIn 0.3s ease-out';

    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%) scale(0)';
    modal.style.backgroundColor = 'rgba(106, 106, 131, 0.33)';
    modal.style.padding = '90px';
    modal.style.color = 'white';
    modal.style.textAlign = 'center';
    modal.style.zIndex = '1000';
    modal.style.border = '0.5px solid #2d3e61';
    modal.style.transition = 'transform 0.3s ease-out';
    modal.style.animation = 'scaleIn 0.3s ease-out forwards';

    modal.innerHTML = `
    <p>${message}</p>
    <button id="closeModal" style="margin-top: 10px; padding: 10px 20px; background-color: #18c9ff; color: white; border: none; border-radius: 4px; cursor: pointer;">
      Закрыть
    </button>
  `;

    document.body.appendChild(backdrop);
    document.body.appendChild(modal);

    const closeModal = document.getElementById('closeModal');
    closeModal.addEventListener('click', () => {
        backdrop.remove();
        modal.remove();
    });
}

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `
    @keyframes fadeIn {
        0% { opacity: 0; }
        100% { opacity: 1; }
    }
    @keyframes scaleIn {
        0% { transform: translate(-50%, -50%) scale(0); }
        100% { transform: translate(-50%, -50%) scale(1); }
    }
    .loader {
        border: 3px solid #f3f3f3; /* Light grey */
        border-top: 3px solid #18c9ff; /* Blue */
        border-radius: 50%;
        width: 20px;
        height: 20px;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(styleSheet);

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const submitButton = document.querySelector('button[type="submit"]');
    const loader = document.createElement('div');
    loader.classList.add('loader');

    submitButton.disabled = true;
    submitButton.innerHTML = '';
    submitButton.appendChild(loader);

    const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        from: document.getElementById('from').value,
        postamat: document.getElementById('terminal').value,
    };
    try {
        const response = await fetch('https://integration-sov-kg.onrender.com/api/archasaveFormData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            showModal('Заявка успешно оформлена!');
            form.reset();
        } else {
            showModal('Ошибка отправки заявки. Попробуйте ещё раз.');
        }
    } catch (error) {
        showModal('Ошибка подключения. Проверьте соединение с интернетом.');
    } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = 'Отправить';
    }
});