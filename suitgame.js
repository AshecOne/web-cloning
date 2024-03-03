    let score = {
        menang: 0,
        kalah: 0,
        seri: 0
    };
    
    function komputer() {
        const pilihanBot = ['gunting', 'batu', 'kertas'];
        const randomSuit = Math.floor(Math.random() * pilihanBot.length);
        return pilihanBot[randomSuit];
    }

    function pemenangSuit(pemain, bot) {
        if (pemain === bot) {
            return 'Seri!';
        }
    
        const menang = (pemain === 'gunting' && bot === 'kertas') ||
                        (pemain === 'batu' && bot === 'gunting') ||
                        (pemain === 'kertas' && bot === 'batu');
        
        return menang ? 'Anda Menang!' : 'Anda Kalah!';
    }

    function main() {
        alert("Welcome to SUIT GAME");
        let terusBermain = true;
    
        while (terusBermain) {
    
            // INPUT
            let suitPemain = prompt("Silakan memilih:\n1. Gunting \u2702\uFE0F\n2. Batu \u270A\n3. Kertas \u270B");
            let pilihan = ['gunting', 'batu', 'kertas'];
            suitPemain = pilihan[parseInt(suitPemain) - 1];
    
            if (!suitPemain) {
                alert("Input tidak valid. Silakan masukkan 1, 2, atau 3.");
                continue; // Kembali ke awal loop jika input tidak valid
            }
    
            // PROSES
            const suitBot = komputer();
            const hasil = pemenangSuit(suitPemain, suitBot);
    
            // OUTPUT dengan emoji
            let emojiHasil = hasil.includes("Menang") ? "\u{1F389}" : hasil.includes("Kalah") ? "\u{1F44E}" : "\u{1F610}";
            alert(`Anda memilih: ${suitPemain}\nKomputer memilih: ${suitBot}\nHasil: ${hasil} ${emojiHasil}`);
    
            // Menghitung hasil
            if (hasil.includes("Anda Menang")) {
                score.menang++;
            } else if (hasil.includes("Anda Kalah")) {
                score.kalah++;
            } else {
                score.seri++;
            }
            
            // Menampilkan hasil sementara
            alert(`Hasil saat ini: Menang = ${score.menang}, Kalah = ${score.kalah}, Seri = ${score.seri}\n`);

            // Memutuskan untuk bermain lagi atau tidak
            terusBermain = confirm("Main lagi?");
        }
    
        // Menampilkan total poin dan hasil permainan
        const totalPoin = score.menang * 25;
        alert(`Total permainan: Menang = ${score.menang}, Kalah = ${score.kalah}, Seri = ${score.seri}\nTotal Poin: ${totalPoin}`);
    }