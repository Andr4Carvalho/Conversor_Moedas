function preencherMoedas(){
    var modalCarregando = new bootstrap.Modal(document.getElementById("modalCarregando"), {});

    $.ajax({
        url : "https://economia.awesomeapi.com.br/json/all",
        type : 'GET',
        contentType: 'application/json',
        dataType: 'json',
        success: function (data){
            modalCarregando.hide();
            var html;
            html = '<option value="default" selected>Selecione uma moeda</option>';
            for(const i in data) {
                html += '<option value="' + data[i]["code"] + " - " + data[i]["bid"] + '">' + data[i]["name"] + '</option>';
            }
            $('#selectMoeda').append(html);
        },
        error: function(xhr){ 
            modalCarregando.hide();
            alert('Ocorreu um erro, descrição: ' + xhr.responseText); 
        },
        beforeSend: function(){
            modalCarregando.show();
        }
    })
}

function preencherNomeMoedaInput(sel) {
    if(sel.options[sel.selectedIndex].value == "default"){
        $("#divConversaoCompra").hide();
        return 1;
    }

    $("#inputMoedaConversao").val("");
    $("#inputMoedaBRL").val("");

    var valueSelect = [];
    valueSelect = sel.options[sel.selectedIndex].value.split("-");
    $('#nomeMoedaConversao').html(valueSelect[0]);

    $("#divConversaoCompra").show();
}

function converterMoedaSelecionada(){
    var valueSelect = [], sel = document.getElementById("selectMoeda");;
    valueSelect = sel.options[sel.selectedIndex].value.split("-");

    var valueMoedaSelecionada = $("#inputMoedaConversao").val();
    valueMoedaSelecionada = valueMoedaSelecionada.replaceAll(".", "");
    valueMoedaSelecionada = valueMoedaSelecionada.replaceAll(",", "");

    var resultado = (valueMoedaSelecionada * valueSelect[1]).toFixed(2);

    $("#inputMoedaBRL").val($('#inputMoedaBRL').masked(resultado));
}

function mostrarConversorMoedas(){
    $("#conversorMoedas").show();
    $("#informacoesConversor").hide();

    $(".btnComprarMoedas").addClass("btnAtivo");
    $(".btnInformacoes").removeClass("btnAtivo");
}

function mostrarInformacoes(){
    $("#conversorMoedas").hide();
    $("#informacoesConversor").show();

    $(".btnInformacoes").addClass("btnAtivo");
    $(".btnComprarMoedas").removeClass("btnAtivo");
}