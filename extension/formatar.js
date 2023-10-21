function obterConteudoTabela() {
  let infoPart = $("#infos").find("li")[0];
  let data = infoPart.innerHTML.match(/\s*(\d{2}\/\d{2}\/\d{4})/)[0];
  let headValues = ["Data", "Lugar", "Item", "Divisão", "Código", "Qtde", "UN", "Vl. Unit.", "Vl. Total"];
  let conteudoTabela = headValues.join("\t") + "\n";

  // Seleciona a tabela com o ID tabResult e percorre cada linha
  $("#tabResult tr").each(function () {
    // Cria uma matriz para armazenar os valores extraídos de cada linha
    let rowValues = [];
    rowValues.push(data);
    rowValues.push("");

    // Encontra os elementos filho na linha e extrai o texto deles
    $(this)
      .find(
        "span.txtTit, span.RCod, span.Rqtd, span.RUN, span.RvlUnit, span.valor"
      )
      .each(function () {
        var texto = $(this).text().trim();
        if ($(this).hasClass("RCod")) {
          texto = texto.replace(/.*\:\s*(\d+).*/, "$1");
        } else if ($(this).hasClass("Rqtd")) {
          texto = texto.replace("Qtde.: ", "");
        } else if ($(this).hasClass("RUN")) {
          texto = texto.replace(/.*\:\s*(\w+).*/, "$1");
        } else if ($(this).hasClass("RvlUnit")) {
          texto = texto.replace(/.*\:\s*([\d\,]+).*/, "R$ $1");
        } else if ($(this).hasClass("valor")) {
          texto = "R$ " + texto;
        }
        rowValues.push(texto);
      });

    rowValues.splice(3, 0, "");

    conteudoTabela = conteudoTabela + rowValues.join("\t") + "\n";
  });
  
  return conteudoTabela;
}

function copiarTexto(textoParaCopiar){
  var textarea = document.createElement("textarea");
  textarea.value = textoParaCopiar;
  document.body.appendChild(textarea);
  textarea.select();

  try {
      var copiado = document.execCommand("copy");
      var mensagem = copiado ? "Texto copiado com sucesso!" : "Não foi possível copiar o texto.";
      console.log(mensagem);
  } catch (err) {
      console.error("Erro ao copiar o texto:", err);
  }

  document.body.removeChild(textarea);
}

function copiarTabela() {
  copiarTexto(obterConteudoTabela());
  alert("Nota fiscal copiada para a Área de Transferência.");
}

function copiarCodigoAcesso() {
  let url = $('.ui-page-active').attr('data-url');
  let code = url.match(/(\d{44})/g);
  copiarTexto(code);
  alert("Código de Acesso copiado para a Área de Transferência");
}

$(".ui-header").append("<div id=\'copiarTabela\' class=\'txtCenter\'><a href=\'#\'>Copiar Tabela Formatada</a></div>");
$("#copiarTabela").click(copiarTabela);

$(".ui-header").append("<div id=\'copiarCodigoAcesso\' class=\'txtCenter\'><a href=\'#\'>Copiar Código de Acesso</a></div>");
$("#copiarCodigoAcesso").click(copiarCodigoAcesso);