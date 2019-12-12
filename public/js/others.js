    $(document).ready(function () {
        var others = get("others");
        if (others === null) {
            location.href = 'home.html';
        } else{
            if (others == "politicas") {
                $("[data-id='contt']")
                    .append("escribir contenido");
            }
        } else {
            location.href = 'home.html';
        }
    });
