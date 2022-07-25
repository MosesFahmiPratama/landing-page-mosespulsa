const menuBar = $('.menu-bar');
const navigasi = $('.navigasi');

menuBar.onclick = () => {
	navigasi.classList.toggle('active');
	menuBar.classList.toggle('active');
}

function get_operator()
{
	let nama_operator = $('#nama-operator').value;
	$.fetch(`/harga-produk/${nama_operator}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"X-Requested-With": "XMLHttpRequest"
		},
		responseType: "json"
	})
	.then(res => res.response)
	.then(data_harga_produk => {
		let data_harga = '';
		for(let key in data_harga_produk.data){

			console.log(data_harga_produk.data);
			let data_name = data_harga_produk.data[key].name;

			var justOneDot = data_name.replace(/[.](?=.*?\.)/g, '');
			var angka = justOneDot.replace(/[^0-9.]/g,'');

			let data = '<option value="'+angka+'">Rp.'+angka+'</option>';

			data_harga += data;
		}

		$('#harga-pulsa').innerHTML = data_harga;
	});
}

const btn_harga_pulsa = $('#harga-pulsa');
if (btn_harga_pulsa) {
	btn_harga_pulsa.onchange = () => {
		let ubah = btn_harga_pulsa.value;

		var justOneDot = ubah.replace(/[.](?=.*?\.)/g, '');
		var outStr = parseFloat(justOneDot.replace(/[^0-9.]/g,''));
		//hasil outStr akan menyisakan angka saja 
		let pulsa = outStr + '000';

		let harga_pulsa = parseInt(pulsa) + 1000;

		//ubah harga pulsa menjadi rupiah misal 1000 menjadi 1.000
		let	reverse = harga_pulsa.toString().split('').reverse().join(''),
		ribuan 	= reverse.match(/\d{1,3}/g);
		rupiah	= ribuan.join('.').split('').reverse().join('');

		$('#harga').value = 'Rp.'+rupiah;
	}
}

const cek_produk = $('#cek-produk');

cek_produk.onchange = () => {
	const id = cek_produk.value;

	$.fetch(`/cek-daftar-produk/${id}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"X-Requested-With": "XMLHttpRequest"
		},
		responseType: "json"
	})
	.then(res => res.response)
	.then(data_produk => {
		let list_produk = '';

		for (let list in data_produk.data) {
			let td1 = '<td>'+data_produk.data[list].name+'</td>';
			let td2 = '';

			if (data_produk.data[list].status = 1) {
				td2 = '<td>Tersedia</td>';
			}
			let tr = '<tr>'+td1+td2+'</tr>';
			
			list_produk += tr;
		}

		let text = data_produk.data[0].name;

		//regex hapus angka
		const hapus_angka = text.replace(/[0-9]/g, '');

		//regex hapus titik
		const hapus_titik = hapus_angka.replace(/[^a-zA-Z0-9 ]/g, "");

		//regex hapus spasi
		const uppercase = hapus_titik.replace(/\s/g, '');

		const lowercase = uppercase.toLowerCase();

		$('.provider').innerHTML = '<img src="img/provider/logo-'+lowercase+'.png">'
		$('tbody').innerHTML= list_produk;
	})
}