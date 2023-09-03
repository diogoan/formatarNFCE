function obterConteudoTabelaCompleta() {
  let dataLabel = $('label:contains("Data de Emissão")');
  let dataElement = dataLabel.next()[0];
  let data = dataElement.innerHTML.match(/\s*(\d{2}\/\d{2}\/\d{4})/)[0];
  let headValues = [
    "Data",
    "Lugar",
    "Item",
    "Divisão",
    "Qtde",
    "UN",
    "Vl. Unit.",
    "Vl. Total",
  ];

  let conteudoTabela = headValues.join("\t") + "\n";

  // Seleciona a tabela com o ID tabResult e percorre cada linha
  $("#produtos .row-custom").each(function () {
    // Cria uma matriz para armazenar os valores extraídos de cada linha
    let rowValues = [];
    rowValues.push(data);
    rowValues.push("");

    $(this)
      .find(".label-custom")
      .each(function (index, value) {
        if (index > 1) {
          rowValues.push($(value).text());
        }
      });

    rowValues.splice(3, 0, "");

    // Cria uma nova linha na tabela com os valores extraídos
    if (rowValues.length > 0) {
      conteudoTabela = conteudoTabela + rowValues.join("\t") + "\n";
    }

    let descElemId = $(this).attr("data-target");
    let descLabel = $(descElemId).find('label:contains("Valor do Desconto")');
    let descValue = descLabel.next()[0];
    let desc = descValue.innerHTML.match(/(\d+,\d+)/);

    if (desc) {
      let descRowValues = [];
      descRowValues.push(data);
      descRowValues.push("");
      descRowValues.push("Desconto");
      descRowValues.push("");
      descRowValues.push("");
      descRowValues.push("");
      descRowValues.push("");
      descRowValues.push("-" + desc[0]);

      $("#tabResult tbody").append(
        conteudoTabela = conteudoTabela + descRowValues.join("\t") + "\n"
      );
    }
  });

  return conteudoTabela;
}

function copiarTexto(textoParaCopiar) {
  var textarea = document.createElement("textarea");
  textarea.value = textoParaCopiar;
  document.body.appendChild(textarea);
  textarea.select();

  try {
    var copiado = document.execCommand("copy");
    var mensagem = copiado
      ? "Texto copiado com sucesso!"
      : "Não foi possível copiar o texto.";
    console.log(mensagem);
  } catch (err) {
    console.error("Erro ao copiar o texto:", err);
  }

  document.body.removeChild(textarea);
}

function copiarTabela() {
  copiarTexto(obterConteudoTabelaCompleta());
  alert("Nota fiscal copiada para a Área de Transferência.");
}

$(".btn-toolbar").append(
  '<div id="copiarTabela" class="btn-group mr-2" role="group" aria-label="Quinto grupo"><button type="button" class="btn btn-secondary btn-sm"><i class="fas fa-copy"></i> Copiar Nota </button></div>'
);
$("#copiarTabela").click(copiarTabela);
