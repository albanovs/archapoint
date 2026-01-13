const form = document.querySelector('.cs_unique_form');

const openPolicy = document.getElementById('openPolicy');
const modal = document.getElementById('policyModal');
const closePolicy = document.getElementById('closePolicy');
const checkbox = document.getElementById('policyAgree');
const confirmBtn = document.getElementById('confirmSubmit');

openPolicy.addEventListener('click', () => {
    modal.style.display = 'flex';
});

closePolicy.addEventListener('click', () => {
    modal.style.display = 'none';
    checkbox.checked = false;
    confirmBtn.disabled = true;
});

checkbox.addEventListener('change', () => {
    confirmBtn.disabled = !checkbox.checked;
});

function showModal(message) {
    const modal = document.createElement('div');
    const backdrop = document.createElement('div');

    backdrop.style.cssText = `
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.6);
        z-index: 9998;
    `;

    modal.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #1f2937;
        color: #fff;
        padding: 30px;
        border-radius: 12px;
        max-width: 90%;
        text-align: center;
        z-index: 9999;
    `;

    modal.innerHTML = `
        <p style="margin-bottom: 20px;">${message}</p>
        <button id="closeResultModal"
            style="padding: 10px 20px; border: none; border-radius: 6px; background:#18c9ff; color:#000; cursor:pointer;">
            Закрыть
        </button>
    `;

    document.body.append(backdrop, modal);

    document.getElementById('closeResultModal').onclick = () => {
        modal.remove();
        backdrop.remove();
    };
}


confirmBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    modal.style.display = 'none';

    const submitButton = openPolicy;
    submitButton.disabled = true;
    submitButton.innerHTML = '<div class="loader"></div>';

    const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        from: document.getElementById('from').value,
        detail: document.getElementById('detail').value,
        postamat: document.getElementById('terminal').value,
    };

    try {
        const response = await fetch(
            'https://integration-sov-kg-39bd.onrender.com/api/archasaveFormData',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            }
        );

        if (response.ok) {
            showModal('Заявка успешно оформлена!');
            document.getElementById('name').value = '';
            document.getElementById('phone').value = '';
            document.getElementById('from').value = '';
            document.getElementById('detail').value = '';
            document.getElementById('terminal').value = '';
        } else {
            showModal('Ошибка отправки заявки.');
        }
    } catch (err) {
        showModal('Ошибка подключения.');
    } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = 'Отправить';
    }
});
