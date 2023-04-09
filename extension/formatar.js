$('#containerSis').remove();
$('.ui-header').remove();
$('#conteudo').children()[0].remove();
$('#conteudo').children()[0].remove();
$('#totalNota').remove();
$('#infos').remove();
$('#rodape').remove();
$('.ui-loader').remove();

// Seleciona a tabela com o ID tabResult e percorre cada linha
$('#tabResult tr').each(function() {

    // Cria uma matriz para armazenar os valores extraídos de cada linha
    let rowValues = [];

    // Encontra os elementos filho na linha e extrai o texto deles
    $(this).find('span.txtTit, span.RCod, span.Rqtd, span.RUN, span.RvlUnit, span.valor').each(function() {
      var texto = $(this).text().trim();
      if ($(this).hasClass('RCod')) {
        texto = texto.replace(/.*\:\s*(\d+).*/, '$1');
      } else if ($(this).hasClass('Rqtd')) {
        texto = texto.replace('Qtde.: ', '');
      } else if ($(this).hasClass('RUN')) {
        texto = texto.replace(/.*\:\s*(\w+).*/, '$1');
      } else if ($(this).hasClass('RvlUnit')) {
        texto = texto.replace(/.*\:\s*([\d\,]+).*/, 'R$ $1');
      } else if ($(this).hasClass('valor')) {
        texto = 'R$ ' + texto;
      }
      rowValues.push(texto);
    });
  
    // Remove a linha antiga
    $(this).remove();
  
    // Cria uma nova linha na tabela com os valores extraídos
    if (rowValues.length > 0) {
      $('#tabResult tbody').append('<tr><td>' + rowValues.join('</td><td>') + '</td></tr>');
    }
});

$('#tabResult').prepend('<thead></thead>');
let headValues = ['Item', 'Código', 'Qtde', 'UN', 'Vl. Unit.', 'Vl. Total'];
$('#tabResult thead').append('<tr><th><strong>' + headValues.join('</strong></th><th><strong>') + '</strong></th></tr>');
