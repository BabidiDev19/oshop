function reemplazarFormularioConDatos() {
  const usuario = document.getElementById('usuario').value;
  const clave = document.getElementById('clave').value;

  const form = document.getElementById('loginForm');
  form.outerHTML = `
    <div class="alert alert-success mt-4">
      <h4>Bienvenido, ${usuario}</h4>
      <p><strong>Tu contraseña es:</strong> ${clave}</p>
    </div>
  `;
}
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('loginForm');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    reemplazarFormularioConDatos();
  });
});
function agregarCatalogo(descripcion, cantidad, valor) {
  const importe = cantidad * valor;
  conceptos.push({ cantidad, descripcion, valor, importe });
  actualizarFactura();
}

let conceptos = [];

document.addEventListener('DOMContentLoaded', function () {
  const formConcepto = document.getElementById('formConcepto');
  formConcepto.addEventListener('submit', function (e) {
    e.preventDefault();
    agregarConceptoDesdeFormulario();
  });
});

function agregarConceptoDesdeFormulario() {
  const cantidad = parseFloat(document.getElementById('cantidad').value);
  const descripcion = document.getElementById('descripcion').value;
  const valor = parseFloat(document.getElementById('valor').value);

  if (isNaN(cantidad) || isNaN(valor) || descripcion.trim() === '') return;

  const importe = cantidad * valor;
  conceptos.push({ cantidad, descripcion, valor, importe });

  // Limpiar campos
  document.getElementById('cantidad').value = '';
  document.getElementById('descripcion').value = '';
  document.getElementById('valor').value = '';

  actualizarFactura();
}

function actualizarFactura() {
  const contenedor = document.getElementById('conceptos');
  contenedor.innerHTML = '';
  let subtotal = 0;

  conceptos.forEach((c, i) => {
    subtotal += c.importe;
    contenedor.innerHTML += `
      <div class="border p-2 mb-2">
        <p>${c.cantidad} x ${c.descripcion} @ $${c.valor} = $${c.importe.toFixed(2)}</p>
        <button class="btn btn-danger btn-sm" onclick="eliminarConcepto(${i})">Eliminar</button>
      </div>
    `;
  });

  const iva = subtotal * 0.16;
  const total = subtotal + iva;

  document.getElementById('subtotal').textContent = subtotal.toFixed(2);
  document.getElementById('iva').textContent = iva.toFixed(2);
  document.getElementById('total').textContent = total.toFixed(2);
}

function eliminarConcepto(index) {
  conceptos.splice(index, 1);
  actualizarFactura();
}