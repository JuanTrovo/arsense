var btnAbriAdd = document.getElementById("btnAbrirAdd")
        var ModalAdd = document.getElementById("modalAdd")
        var btnFecharAdd = document.getElementById("fecharAdd")

        btnAbriAdd.addEventListener("click", () => {
            ModalAdd.style.display = (ModalAdd.style.display === "block") ? "none" : "block";
        });

        btnFecharAdd.addEventListener("click", () => {
            ModalAdd.style.display = "none";
        });