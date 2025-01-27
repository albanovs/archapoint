document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modal");
    const orderBtn = document.getElementById("openModal");
    const closeModal = document.getElementById("closeModal");

    orderBtn.addEventListener("click", () => {
        modal.style.display = "block";
    });

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});
