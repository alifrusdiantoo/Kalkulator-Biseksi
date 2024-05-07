class Biseksi {
  constructor(k0, k1, k2, k3, k4, k5, k6, k7, a, b, e) {
    this.koefisien0 = k0;
    this.koefisien1 = k1;
    this.koefisien2 = k2;
    this.koefisien3 = k3;
    this.koefisien4 = k4;
    this.koefisien5 = k5;
    this.koefisien6 = k6;
    this.koefisien7 = k7;
    this.a = a;
    this.b = b;
    this.error = e;
  }

  // Method untuk set nilai batas bawah
  setA(a) {
    this.a = a;
  }

  // Method untuk set nilai batas atas
  setB(b) {
    this.b = b;
  }

  // Method untuk mengambil nilai batas bawah
  getA() {
    return this.a;
  }

  // Method untuk mengambil nilai batas atas
  getB() {
    return this.b;
  }

  // Method untuk mengambil nilai error
  getError() {
    return this.error;
  }

  // Method untuk mengitung fungsi f(a)
  hitungFa() {
    return (
      this.koefisien7 * this.a ** 7 +
      this.koefisien6 * this.a ** 6 +
      this.koefisien5 * this.a ** 5 +
      this.koefisien4 * this.a ** 4 +
      this.koefisien3 * this.a ** 3 +
      this.koefisien2 * this.a ** 2 +
      this.koefisien1 * this.a ** 1 +
      this.koefisien0 * this.a ** 0
    );
  }

  // Mehod untuk menghitung fungsi f(b)
  hitungFb() {
    return (
      this.koefisien7 * this.b ** 7 +
      this.koefisien6 * this.b ** 6 +
      this.koefisien5 * this.b ** 5 +
      this.koefisien4 * this.b ** 4 +
      this.koefisien3 * this.b ** 3 +
      this.koefisien2 * this.b ** 2 +
      this.koefisien1 * this.b ** 1 +
      this.koefisien0 * this.b ** 0
    );
  }

  // Method untuk menghitung nilai x
  hitungX() {
    return (this.a + this.b) / 2;
  }

  // Method untuk menghitung nilai fungsi dari f(x)
  hitungFx(x) {
    return this.koefisien7 * x ** 7 + this.koefisien6 * x ** 6 + this.koefisien5 * x ** 5 + this.koefisien4 * x ** 4 + this.koefisien3 * x ** 3 + this.koefisien2 * x ** 2 + this.koefisien1 * x ** 1 + this.koefisien0 * x ** 0;
  }

  // Method untuk mengecek apakah terdapat akar persamaan atau tidak
  cekAkarPersamaan() {
    if (this.hitungFa() * this.hitungFb() > 0) {
      return true;
    } else {
      return false;
    }
  }
}

function pilihPangkat(x) {
  let input = '';
  for (x; x >= 0; x--) {
    input += `<div class="fungsi-x"> <label for="k${+x}">X<sup>${+x}</sup></label> <input type="number" class="input-control-fungsi" name="k${+x}" id="k${+x}" autocomplete="off" required /> </div>`;
  }
  return input;
}

function tampilInput() {
  var x = parseInt(document.getElementById('pangkat').value);

  const form = document.getElementById('input-koe');
  form.innerHTML = pilihPangkat(x);
}

function resetForm() {
  document.getElementById('kalkulator').reset();
  tampilInput();
}

function buatTabel(hasil) {
  let table = '<table class="tb-group">';
  table += `<tr class="tr-control"> <th class="th-control">Iterasi</th> <th class="th-control">a</th> <th class="th-control">b</th> <th class="th-control">x</th> <th class="th-control">f(a)</th> <th class="th-control">f(b)</th> <th class="th-control">f(x)</th> </tr>`;

  hasil.forEach((element, index) => {
    table += `<tr class="tr-control-2">
        <td class="th-control">${index + 1}</td>
        <td class="th-control">${element.a}</td>
        <td class="th-control">${element.b}</td>
        <td class="th-control">${element.x}</td>
        <td class="th-control">${element.fa}</td>
        <td class="th-control">${element.fb}</td>
        <td class="th-control">${element.fx}</td>
    </tr>`;
  });

  table += '</table>';
  return table;
}

let myChart = null;

function buatChart(hasil) {
  const ctx = document.getElementById('chart').getContext('2d');

  const label = [];
  for (let i = 0; i < hasil.length; i++) {
    label.push(i + 1);
  }

  if (myChart) {
    myChart.destroy();
  }

  myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: label,
      datasets: [
        {
          label: 'Hasil f(X)',
          data: hasil,
          parsing: {
            yAxisKey: 'x',
          },
          borderColor: '#1A4D2E',
          borderWidth: 3,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

function hitung(x0, x1, x2, x3, x4, x5, x6, x7, a, b, e) {
  const iterasi1 = new Biseksi(x0, x1, x2, x3, x4, x5, x6, x7, a, b, e);

  let hasil = [];
  if (iterasi1.cekAkarPersamaan() == false) {
    do {
      let a = iterasi1.getA(),
        b = iterasi1.getB(),
        fa = iterasi1.hitungFa(),
        fb = iterasi1.hitungFb(),
        x = iterasi1.hitungX(),
        fx = iterasi1.hitungFx(x);

      let hasilIterasi = { a: a, b: b, x: x, fa: fa, fb: fb, fx: fx };
      hasil.push(hasilIterasi);

      if (fx * fa < 0) {
        iterasi1.setB(x);
        a = iterasi1.getA();
        fb = fx;
      } else {
        iterasi1.setA(x);
        b = iterasi1.getB();
        fa = fx;
      }

      if (Math.abs(fx) < iterasi1.getError()) break;
    } while (true);

    const tableContainer = document.getElementById('tabel');

    tableContainer.innerHTML = buatTabel(hasil);
    buatChart(hasil);
  } else {
    const tableContainer = document.getElementById('tabel');
    tableContainer.innerHTML = 'Tidak terdapat akar persamaan';
  }
}

function tampil() {
  // Ambil value input
  var x = parseInt(document.getElementById('pangkat').value);
  let k = new Array(8).fill(0);

  for (let i = 0; i <= x; i++) {
    k[i] = parseFloat(document.getElementById('k' + i).value);
  }

  let a = parseFloat(document.getElementById('batas-atas').value);
  let b = parseFloat(document.getElementById('batas-bawah').value);
  let e = parseFloat(document.getElementById('error').value);

  hitung(k[0], k[1], k[2], k[3], k[4], k[5], k[6], k[7], a, b, e);
}
