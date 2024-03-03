class Product {
    constructor(name, stock, price) {
        this.name = name;
        this.stock = stock;
        this.price = price;
    }

    formatHarga() {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(this.price);
    }

    updateStock(quantity) {
        this.stock -= quantity;
    }
}

class User {
    constructor(id, name, role = 'user') {
        this.id = id;
        this.name = name;
        this.role = role;
    }
}

class Store {
    constructor() {
        this.products = [
            new Product("Sepatu", 20, 85000),
            new Product("Kaos", 10, 55000),
            new Product("Jaket", 6, 105000),
        ];
        this.users = [
            new User("01", "Dika"),
            new User("02", "Puji"),
            new User("03", "Iman"),
        ];
    }

    tambahData() {
        let produk = prompt("Masukkan nama produk:");
        if (!produk) {
            alert("Pilihan tidak valid");
            return;
        }
    
        let stokBarang = parseInt(prompt("Berapa stok produk"), 10);
        if (isNaN(stokBarang)) {
            alert("Pilihan tidak valid");
            return;
        }
    
        let hargaBarang = parseInt(prompt("Masukkan harga satuan produk"), 10);
        if (isNaN(hargaBarang)) {
            alert("Pilihan tidak valid");
            return;
        }
    
        this.products.push(new Product(produk, stokBarang, hargaBarang));
        alert("Data berhasil ditambahkan");
    }

    hapusData() {
        let result = this.products.map((item, index) => `${index + 1}. ${item.name}`).join('\n');
        let pilih = parseInt(prompt(`Pilih data yang ingin dihapus:\n${result}`), 10) - 1;
        if (pilih >= 0 && pilih < this.products.length) {
            this.products.splice(pilih, 1);
            alert("Data berhasil dihapus");
        } else {
            alert("Pilihan tidak valid");
            return;
        }
    }

    updateData() {
        let result = this.products.map((item, index) => `${index + 1}. ${item.name}`).join('\n');
        let pilih = parseInt(prompt(`Pilih data yang ingin diupdate:\n${result}`), 10) - 1;
        if (pilih >= 0 && pilih < this.products.length) {
            let update = prompt(`A. Ubah nama produk\nB. Update stok\nC. Update harga`);

            if (!['A', 'B', 'C'].includes(update.toUpperCase())) {
                alert("Pilihan tidak valid");
                return;
            }

            let input = prompt(`Silakan merubah data`);
            if (!input) {
                alert("Pilihan tidak valid");
                return;
            }

            switch (update.toUpperCase()) {
                case "A":
                    this.products[pilih].name = input;
                    break;
                case "B":
                    let stok = parseInt(input, 10);
                    if (isNaN(stok) || stok < 0) {
                        alert("Pilihan tidak valid");
                        return;
                    }
                    this.products[pilih].stock = stok;
                    break;
                case "C":
                    let harga = parseFloat(input);
                    if (isNaN(harga) || harga < 0) {
                        alert("Pilihan tidak valid");
                        return;
                    }
                    this.products[pilih].price = harga;
                    break;
            }
            alert("Data berhasil diupdate");
        } else {
            alert("Pilihan tidak valid");
            return;
        }
    }

    tambahUser(id, name) {
        const newUser = new User(id, name);
        this.users.push(newUser);
        return newUser;
    }

    showUserList() {
        let userList = this.users.map(user => `ID: ${user.id}, Nama: ${user.name}, Role: ${user.role}`).join('\n');
        alert(userList);
    }

    adminPanel() {
        let running = true;
        while (running) {
            let choice = prompt("Admin Panel:\n1. Tambah Produk\n2. Hapus Produk\n3. Update Produk\n4. Daftar User\n5. Keluar");
            switch (choice) {
                case "1":
                    this.tambahData();
                    break;
                case "2":
                    this.hapusData();
                    break;
                case "3":
                    this.updateData();
                    break;
                case "4":
                    this.showUserList();
                    break;
                case "5":
                    running = false;
                    break;
                default:
                    alert("Pilihan tidak valid");
                    break;
            }
        }
    }

    userPanel(user) {
alert(`Selamat datang ${user.name}! Anda sekarang berada di panel belanja.`);
let totalBelanja = 0;
let keranjang = [];

while (true) {
    let produkList = this.products
        .map((item, index) => `${index + 1}. ${item.name} - Harga: ${item.formatHarga()} - Stok: ${item.stock}`)
        .join('\n');
    let pilihanProdukIndex = parseInt(prompt(`Pilih produk yang ingin dibeli:\n${produkList}\n0. Selesai`), 10) - 1;

    if (pilihanProdukIndex === -1) {
        break;
    }

    if (pilihanProdukIndex >= 0 && pilihanProdukIndex < this.products.length) {
        let produk = this.products[pilihanProdukIndex];
        if (produk.stock === 0) {
            alert("Stok barang sedang dalam keranjang.");
            continue;
        }

        let jumlahBeli = parseInt(prompt(`Stock ${produk.name}: ${produk.stock}. Berapa banyak yang ingin dibeli?`), 10);
        if (jumlahBeli > 0 && jumlahBeli <= produk.stock) {
            totalBelanja += jumlahBeli * produk.price;
            produk.stock -= jumlahBeli; // Kurangi stok langsung
            keranjang.push({ produk: produk, jumlah: jumlahBeli }); // Simpan ke keranjang
        } else {
            alert("Jumlah tidak valid atau melebihi stok.");
        }
    } else {
        alert("Pilihan tidak valid.");
    }

    if (!confirm("Ingin belanja lagi?")) {
        break;
    }
}

if (totalBelanja > 0) {
    let formatTotalBelanja = new Product('', 0, totalBelanja).formatHarga();
    alert(`Total belanjaan Anda adalah: ${formatTotalBelanja}`);

    if (confirm("Lanjutkan ke pembayaran?")) {
        // Proses pembayaran...
        let pembayaran = null;
        do {
            let input = prompt(`Total belanjaan Anda: ${formatTotalBelanja}. Masukkan jumlah uang:`);
            if (input === null) {
                alert("Pembayaran dibatalkan.");
                keranjang.forEach(item => {
                    item.produk.stock += item.jumlah; // Kembalikan stok jika pembayaran dibatalkan
                });
                return; 
            }
            pembayaran = parseInt(input, 10);
            if (isNaN(pembayaran)) {
                alert("Mohon masukkan angka yang valid.");
            } else if (pembayaran < totalBelanja) {
                alert("Uang tidak cukup. Silakan masukkan jumlah yang benar.");
            }
        } while (isNaN(pembayaran) || pembayaran < totalBelanja);

        if (pembayaran >= totalBelanja) {
            let kembalian = pembayaran - totalBelanja;
            alert(`Terima kasih telah berbelanja. Kembalian Anda: ${new Product('', 0, kembalian).formatHarga()}`);
            // Produk sudah diupdate stoknya saat dimasukkan ke keranjang, tidak perlu update lagi di sini
        }
    } else {
        alert("Pembelian dibatalkan.");
        keranjang.forEach(item => {
            item.produk.stock += item.jumlah; // Kembalikan stok jika pembelian dibatalkan
        });
    }
} else {
    alert("Anda tidak melakukan pembelian.");
}
}

}

class App {
    constructor() {
        this.store = new Store();
    }

    start() {
        let operasi = true;
        while (operasi) {
            let masuk = prompt("Selamat datang di Toko.ku\n1. Login\n2. Register\n3. Exit");
            switch (masuk) {
                case "1":
                    this.loginUser();
                    break;
                case "2":
                    this.registerUser();
                    break;
                case "3":
                    operasi = false;
                    alert("Terima kasih telah menggunakan aplikasi kami.");
                    break;
                default:
                    alert("Pilihan tidak valid");
                    break;
            }
        }
    }

    loginUser() {
        let userName = prompt("Masukkan nama Anda untuk login:");
        if (userName.toLowerCase() === "admin") {
            this.store.adminPanel();
        } else {
            let user = this.store.users.find(u => u.name.toLowerCase() === userName.toLowerCase());
            if (user) {
                this.store.userPanel(user);
            } else {
                alert("User tidak ditemukan. Silakan daftar terlebih dahulu.");
            }
        }
    }

    registerUser() {
        let userName = prompt("Silakan masukkan nama Anda untuk mendaftar:");
        if (userName) {
            let newId = `0${this.store.users.length + 1}`;
            this.store.tambahUser(newId, userName);
            alert(`User ${userName} berhasil didaftarkan dengan ID: ${newId}`);

        } else {
            alert("Pendaftaran dibatalkan.");
        }
    }
}

function bukaToko() {
const myApp = new App();
myApp.start();
}