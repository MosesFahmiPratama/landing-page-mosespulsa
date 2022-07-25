$.ready().then(function(){
	const badge = $('#badge');
	if (badge) {
		load_data_transaksi_pelanggan();
		notification_pelanggan();
	}else{
		load_data_transaksi();
		notification_admin();
	}

	//alertBox.style.cssText='transform: translateY(80%)';
});

const alertBox = $('.alert-box');
const closeAlert = $('.close-alert');

/*window.onload = () => {
	alertBox.style.cssText='transform: translateY(80%)';
}*/

closeAlert.onclick = () => {
	alertBox.style.cssText='transform: translateY(-120%)';
}

function notification_admin()
{
	$.fetch('/admin/data-notifikasi', {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"X-Requested-With": "XMLHttpRequest"
		},
		responseType: "json"
	})
	.then(res => res.response)
	.then(data_notifikasi_admin => {
		$('.badge').innerText = data_notifikasi_admin;
		$('#notif-number').innerText = data_notifikasi_admin;
	});
}

function notification_pelanggan()
{
	$.fetch('/pelanggan/data-notifikasi', {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"X-Requested-With": "XMLHttpRequest"
		},
		responseType: "json"
	})
	.then(res => res.response)
	.then(data_notifikasi_pelanggan => {
		console.log(data_notifikasi_pelanggan)
		if (data_notifikasi_pelanggan == 0) {
			$('#badge').innerText = '0';
			$('.notif-number').innerText = 'Tidak Ada';
		}else{
			$('#badge').innerText = data_notifikasi_pelanggan;
			$('.notif-number').innerText = data_notifikasi_pelanggan;
		}
	});
}

function load_data_transaksi()
{
	$.fetch('/admin/data-transaksi-sidebar', {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"X-Requested-With": "XMLHttpRequest"
		},
		responseType: "json"
	})
	.then(res => res.response)
	.then(data_transaksi_sidebar => {
		let data_transaksi = '';


		for (var data in data_transaksi_sidebar){
			const bilangan = data_transaksi_sidebar[data].harga_produk;

			let	reverse = bilangan.toString().split('').reverse().join(''),
				ribuan 	= reverse.match(/\d{1,3}/g);
				ribuan	= ribuan.join('.').split('').reverse().join('');

			let div = '<div><b>Pulsa</b><p>'+data_transaksi_sidebar[data].status+'</p></div>'
			let data_activities = '<div id="data-activities">'+div+'<b>'+ribuan+'</b></div>'
			let icon = '<div class="icon"><i class="fas fa-phone"></i></div>';
			let li = '<li>'+icon+data_activities+'</li>';

			data_transaksi += li;

			console.log(data_transaksi_sidebar)
		}

		$('#data-activities').innerHTML = data_transaksi;
		$('#tgl-activities').innerHTML = data_transaksi_sidebar[0].created_at;
	})
}

function load_data_transaksi_pelanggan()
{
	$.fetch('/pelanggan/data-transaksi-sidebar', {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"X-Requested-With": "XMLHttpRequest"
		},
		responseType: "json"
	})
	.then(res => res.response)
	.then(data_transaksi_sidebar => {
		let data_transaksi = '';

		console.log(data_transaksi)

		for (var data in data_transaksi_sidebar){
			const bilangan = data_transaksi_sidebar[data].harga_produk;

			let	reverse = bilangan.toString().split('').reverse().join(''),
				ribuan 	= reverse.match(/\d{1,3}/g);
				ribuan	= ribuan.join('.').split('').reverse().join('');

			let div = '<div><b>Pulsa</b><p>'+data_transaksi_sidebar[data].status+'</p></div>'
			let data_activities = '<div class="data-activities">'+div+'<b>'+ribuan+'</b></div>'
			let icon = '<div class="icon"><i class="fas fa-phone"></i></div>';
			let li = '<li>'+icon+data_activities+'</li>';

			data_transaksi += li;
		}

		$('.data-activities').innerHTML = data_transaksi;
		$('.tgl-activities').innerHTML = data_transaksi_sidebar[0].created_at;
	})
}

if ($('#order-pulsa')) {
	$('#order-pulsa').onclick = () => {
		window.location.href = '/pelanggan/transaksi';
	}
}

if ($('#data-transaksi')) {
	$('#data-transaksi').onclick = () => {
		window.location.href = '/pelanggan/data-transaksi';
	}
}

if ($('#about')) {
	$('#about').onclick = () => {
		window.location.href = '/pelanggan/about';
	}
}

var btnProfile = $('.btn-profile');
var cardProfile = $('.profile');

btnProfile.onclick = function(){
	if (cardProfile.style.display === "none") {
		cardProfile.style.display = "flex";
	} else {
		cardProfile.style.display = "none";
	}
}

var btnSidebarRight = $('.open-sidebar-right');
var closeSidebarRight = $('.close-sidebar-right');
var sidebarRight = $('.sidebar-right');

btnSidebarRight.onclick = () => {
	if (sidebarRight.style.transform === "translateX(100%)") {
		sidebarRight.style.cssText = "transform: translateX(5%); transition: 1.5s; background: #f5f5fd";
		btnSidebarRight.style.cssText = "transform: rotate(180deg); transition: 1s";
	} else {
		sidebarRight.style.cssText = "transform: translateX(100%); transition: 1.5s; overflow-x: hidden;";
		btnSidebarRight.style.cssText = "transform: rotate(0deg); transition: 1s";
	}
}

closeSidebarRight.onclick = () => {
	sidebarRight.style.cssText = "transform: translateX(100%); transition: 1.5s; overflow-x: hidden;";
}

var hamburger = $('.hamburger');
var sidebar = $('.sidebar');

hamburger.onclick = () => {
	sidebar.classList.toggle('active-sidebar');
	hamburger.classList.toggle('active');
}

var addForm = $('.add-form');
var closeModal = $('.close-modal');
var	modal   = $('.modal');

if (addForm) {
	addForm.onclick = () => {
		modal.style.top = '0%';
	}

	closeModal.onclick = () => {
		modal.style.top = '-100%';
	}
}

$$('.detail-btn').forEach(function(btn){

	btn.onclick = () => {
		const data = btn.getAttribute('data');
		modal.style.top = '0%';

		$.fetch(`/admin/detail-transaksi/${data}`, {
			method: "get",
			headers: {
				"Content-Type": "application/json",
				"X-Requested-With": "XMLHttpRequest"
			},
			responseType: "json"
		})
		.then(res => res.response)
		.then(data_detail => {
			$('.trx-id').innerHTML=data_detail.data.trx_id;
			$('.via').innerHTML=data_detail.data.via;
			$('.code').innerHTML=data_detail.data.code;
			$('.name').innerHTML=data_detail.data.produk;
			$('.price').innerHTML=data_detail.data.price;
			$('.no').innerHTML=data_detail.data.target;
			$('.note').innerHTML=data_detail.data.note;
			$('.created').innerHTML=data_detail.data.created_at;
			$('.updated').innerHTML=data_detail.data.updated_at;
		});
	}
	closeModal.onclick = () => {
		modal.style.top = '-100%';
	}

});

if($('#operator')){

	$('#operator').onchange = () => {
		let data= $('#operator').value;
		$.fetch(`/admin/operator-transaksi/${data}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"X-Requested-With": "XMLHttpRequest"
				},
				responseType: "json"
			})
			.then(res => res.response)
			.then(data_operator => {
				let content_operator = $('.container-form');

				let dataOperator = "";

				//Urutkan data dari harga termurah sampai harga termahal (ascending)
				data_operator.data.sort(function(a, b) {
					return a.price - b.price
				})

				for (var key in data_operator.data) {

					const bilangan = data_operator.data[key].price;

					let	reverse = bilangan.toString().split('').reverse().join(''),
						ribuan 	= reverse.match(/\d{1,3}/g);
						ribuan	= ribuan.join('.').split('').reverse().join('');

					let h3 = "<h3 class='data-name'>" + data_operator.data[key].name + "</h3>";
					let p = "<p class='data-desc'>"+data_operator.data[key].desc+"</p>";
					let deskripsi = "<div class='deskripsi'>"+h3+p+"</div>";
					let input = "<input type='radio' name='produk' data_price='"+data_operator.data[key].price+"' data_name='"+data_operator.data[key].name+"' data_desc='"+data_operator.data[key].desc+"' value='"+data_operator.data[key].code+"' class='radio' id='"+data_operator.data[key].id+"'>"
					let group_radio = "<div class='group-radio'>"+ input+deskripsi+ "</div>";
					let info_harga = "<div class='info-harga'><span class='harga' data-harga='"+ribuan+"'>Rp "+ribuan+"</span></div>";
					let group_input = "<label for='"+data_operator.data[key].id+"' class='group-input'>" +group_radio+info_harga+ "</label>";
					dataOperator += group_input;

				}

				content_operator.innerHTML = dataOperator;

				$$('.radio').forEach(function(btn_order){
					btn_order.onclick = () => {
						$('.modal').style.top = '0%';

						let data_code = btn_order.value;
						let data_desc = btn_order.getAttribute('data_desc');
						let data_price = btn_order.getAttribute('data_price');
						let no_hp = $('.input-text').value;

						let	reverse = data_price.toString().split('').reverse().join(''),
							ribuan 	= reverse.match(/\d{1,3}/g);
							ribuan	= ribuan.join('.').split('').reverse().join('');

						$('#name-produk').innerText = data_desc;
						$('#harga').innerText = 'Rp.'+ribuan;
						$('#target_noHp').value = no_hp;
						$('#no-hp').innerText = no_hp;
						$('#code_produk').value = data_code;	

					}
				});


				closeModal.onclick = () => {
					modal.style.top = '-100%';
				}
			});
	}

}else if ($('#operator-pelanggan')) {

	$('#operator-pelanggan').onchange = () => {
		let data= $('#operator-pelanggan').value;
		$.fetch(`/pelanggan/operator-transaksi/${data}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"X-Requested-With": "XMLHttpRequest"
				},
				responseType: "json"
			})
			.then(res => res.response)
			.then(data_operator => {
				let content_operator = $('.container-form');

				let dataOperator = "";

				//Urutkan data dari harga termurah sampai harga termahal (ascending)
				data_operator.data.sort(function(a, b) {
					return a.price - b.price
				})

				for (var key in data_operator.data) {
					//regex untuk menghapus huruf
					let str = data_operator.data[key].name;
					var justOneDot = str.replace(/[.](?=.*?\.)/g, '');
					var outStr = parseFloat(justOneDot.replace(/[^0-9.]/g,''));
					//hasil outStr akan menyisakan angka saja 
					let pulsa = outStr + '000';

					let harga_pulsa = parseInt(pulsa) + 1000;

					//ubah harga pulsa menjadi rupiah misal 1000 menjadi 1.000
					let	reverse = harga_pulsa.toString().split('').reverse().join('');
						ribuan 	= reverse.match(/\d{1,3}/g);
						rupiah	= ribuan.join('.').split('').reverse().join('');

					let h3 = "<h3 class='data-name'>" + data_operator.data[key].name + "</h3>";
					let p = "<p class='data-desc'>"+data_operator.data[key].desc+"</p>";
					let deskripsi = "<div class='deskripsi'>"+h3+p+"</div>";
					let input = "<input type='radio' name='produk' data_price='"+ rupiah +"' data_name='"+ data_operator.data[key].name +"' data_desc='"+data_operator.data[key].desc+"' value='"+data_operator.data[key].code+"' class='radio' id='"+data_operator.data[key].id+"'>"
					let group_radio = "<div class='group-radio'>"+ input+deskripsi+ "</div>";
					let info_harga = "<div class='info-harga'><span class='harga'>Rp "+rupiah+"</span></div>";
					let group_input = "<label for='"+data_operator.data[key].id+"' class='group-input'>" +group_radio+info_harga+ "</label>";
					dataOperator += group_input;

				}

				content_operator.innerHTML = dataOperator;

				$$('.radio').forEach(function(btn_order){
					btn_order.onclick = () => {
						$('.modal').style.top = '0%';

						let data_code = btn_order.value;
						let data_desc = btn_order.getAttribute('data_desc');
						let data_name = btn_order.getAttribute('data_name');
						let data_price = btn_order.getAttribute('data_price');
						let no_hp = $('.input-text').value;

						let	reverse = data_price.toString().split('').reverse().join(''),
							ribuan 	= reverse.match(/\d{1,3}/g);
							ribuan	= ribuan.join('.').split('').reverse().join('');

						$('#name-produk').innerText = data_desc;
						$('#harga').innerText = 'Rp.'+ribuan;
						$('#no-hp').innerText = no_hp;

						$('#nama_produk').value = data_name;
						$('#harga_produk').value = data_price;
						$('#target_noHp').value = no_hp;
						$('#code_produk').value = data_code;	

					}
				});


				closeModal.onclick = () => {
					modal.style.top = '-100%';
				}
			});
	}
}

if ($('#cari-data')) {
	$('#cari-data').onchange = () => {
		const data = $('#cari-data').value;

		$.fetch(`/admin/cari-transaksi/${data}`, {
				method: "GET",
				headers: {
					"X-Requested-With": "XMLHttpRequest"
				}
			})
			.then(res => res.response)
			.then(data_cari => {
				const data = JSON.parse(data_cari);

				let dataTransaksi = '';

				for(let key in data)
				{
					let td1 = '<td data-label="Order Id">'+data[key].transaksi_id+'</td>';
					let td2 = '<td data-label="Tanggal">'+data[key].created_at+'</td>';
					let td3 = '<td data-label="Nama Pelanggan">'+data[key].nama_lengkap+'</td>';
					let td4 = '<td data-label="Nama Produk">'+data[key].nama_produk+'</td>';
					let td5 = '<td data-label="Harga">'+data[key].harga_produk+'</td>';
					let td6 = '<td data-label="No. Tujuan">'+data[key].no_pelanggan+'</td>';
					let td7 = (data[key].status === "Berhasil") ?
					'<td data-label="Status"><span style="color:white;background:rgb(47, 248, 26, 0.7);padding:10px;border-radius:10px;">'+data[key].status+'</span></td>' 
					: '<td data-label="Status"><span style="color: white;background: rgb(254, 22, 22, 0.7);padding: 10px;border-radius: 10px;">'+data[key].status+'</span></td>';
					let td8 = (data[key].konfirmasi === "Sudah Dibayar") ? 
					'<td data-label="Keterangan"><span style="color:white;background:rgb(47, 248, 26, 0.7);padding:10px;border-radius:10px;">'+data[key].konfirmasi+'</span></td>' 
					: '<td data-label="Keterangan"><span style="color:white;background:rgb(254, 22, 22, 0.7);padding:10px;border-radius:10px;">'+data[key].konfirmasi+'</span></td>';
					let td9 = (data[key].konfirmasi === "Sudah Dibayar") ? 
					'<td data-label="Actions"><button type="button"><i class="fas fa-check"></i></button></td>' 
					: '<td data-label="Actions"><button type="button" id="konfirmasi_button" onclick="konfirmasi_pembelian()" id-data="'+data[key].transaksi_id+'" keterangan-data="'+data[key].konfirmasi+'" status-data="'+data[key].status+'" nama-data="'+data[key].nama_produk+'" kode-data="'+data[key].kode_produk+'" no-data="'+data[key].no_pelanggan+'" ><i class="fas fa-paper-plane"></i></button></td>';

					let tr = '<tr>'+td1+td2+td3+td4+td5+td6+td7+td8+td9+'</tr>';

					dataTransaksi += tr;
				}

				$('#live_data').innerHTML = dataTransaksi;


			})

			$$('#konfirmasi_button').forEach(function(btn_konfirm){
				btn_konfirm.onclick = () => {
					const data_id = btn_konfirm.getAttribute('id-data');
					const data_kode = btn_konfirm.getAttribute('kode-data');
					const data_nama = btn_konfirm.getAttribute('nama-data');
					const data_no = btn_konfirm.getAttribute('no-data');

					$('#nama-produk').innerText = data_nama;
					$('#no-hp').innerText = data_no;
					$('#order-id').innerText = data_id;

					$('#id_trx').value = data_id;
					$('#code_produk').value = data_kode;
					$('#target_noHp').value = data_no;

					modal.style.top = '0%';
				}
			})
	}
}

function konfirmasi_pembelian()
{
	$$('#konfirmasi_button').forEach(function(btn_konfirm){
		btn_konfirm.onclick = () => {
			const data_id = btn_konfirm.getAttribute('id-data');
			const data_kode = btn_konfirm.getAttribute('kode-data');
			const data_nama = btn_konfirm.getAttribute('nama-data');
			const data_no = btn_konfirm.getAttribute('no-data');

			$('#nama-produk').innerText = data_nama;
			$('#no-hp').innerText = data_no;
			$('#order-id').innerText = data_id;

			$('#id_trx').value = data_id;
			$('#code_produk').value = data_kode;
			$('#target_noHp').value = data_no;
			
			modal.style.top = '0%';
		}
	})

	$('.container-modal').style.display = 'block';

	$('#modal_edit_data').style.display = 'none';

	closeModal.onclick = () => {
		modal.style.top = '-100%';
	}
}

function edit_data_transaksi()
{

	$$('#update_data_transaksi').forEach(function(btn_editDataTransaksi){
		btn_editDataTransaksi.onclick = () => {
			const data_id = btn_editDataTransaksi.getAttribute('id-transaksi');

			$('#id_transaksi').value = data_id;


			modal.style.top = '0%';
		}
	})

	$('.container-modal').style.display = 'none';

	$('#modal_edit_data').style.display = 'flex';

	$('#cancel_edit').onclick = () => {
		modal.style.top = '-100%';
	}
}

var notification = $('.notification');
var openNotif 	 = $('.notif');

openNotif.onclick = () => {
	notification.classList.toggle('active-notification');
}

var btnCalendar = $('.btn-calendar');
var Calendar = $('.calendar');

btnCalendar.onclick = () => {
	Calendar.classList.toggle('active');
}

const dayNumber = new Date().getDate();
const year = new Date().getFullYear();
const dayName = new Date().toLocaleString("default", {weekday: "long"});
const monthName = new Date().toLocaleString("default", {month: "long"});

$(".month-name").innerHTML = monthName;
$(".day-name").innerHTML = dayName;
$(".year").innerHTML = year;
$(".date-number").innerHTML = dayNumber;

