let dataLabel = $('label:contains("Data de Emissão")');
let dataElement = dataLabel.next()[0];
let data = dataElement.innerHTML.match(/\s*(\d{2}\/\d{2}\/\d{4})/)[0];

// Cria o elemento da tabela
let table = $("<table></table>");

// Define o ID da tabela
table.attr("id", "tabResult");

// Adiciona a tabela à tag body
$("body").append(table);

$("#tabResult").append("<thead></thead>");
let headValues = [
  "Data",
  "Lugar",
  "Item",
  "Divisão",
  "Código",
  "Qtde",
  "UN",
  "Vl. Unit.",
  "Vl. Total",
];

$("#tabResult thead").append(
  "<tr><th><strong>" +
    headValues.join("</strong></th><th><strong>") +
    "</strong></th></tr>"
);

$("#tabResult").append("<tbody></tbody>");

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
  rowValues.splice(3, 0, "");

  // Cria uma nova linha na tabela com os valores extraídos
  if (rowValues.length > 0) {
    $("#tabResult tbody").append(
      "<tr><td>" + rowValues.join("</td><td>") + "</td></tr>"
    );
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
    descRowValues.push("");
    descRowValues.push("-" + desc[0]);

    $("#tabResult tbody").append(
      "<tr><td>" + descRowValues.join("</td><td>") + "</td></tr>"
    );
  }
});

// Seleciona todos os elementos dentro da tag body, exceto o elemento com ID tabResult, e remove-os
$("body").children().not("#tabResult").remove();
