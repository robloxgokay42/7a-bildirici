const programVerisi = {
    saatler: {
        normal: [["08:50", "09:30"], ["09:45", "10:25"], ["10:40", "11:20"], ["11:30", "12:10"], ["12:40", "13:20"], ["13:30", "14:10"], ["14:20", "15:00"]],
        cuma: [["08:50", "09:30"], ["09:45", "10:25"], ["10:35", "11:10"], ["11:10", "11:45"], ["12:00", "12:40"], ["13:15", "13:55"], ["14:10", "14:50"]]
    },
    gunler: {
        1: ["SEÇ.İNG", "SEÇ.İNG", "FEN", "FEN", "TÜRKÇE", "TEKTAS", "TEKTAS"], // Pazartesi
        2: ["MAT", "MAT", "İNG", "İNG", "SOS", "GÖRSEL", "SEÇ.KÜL"], // Salı
        3: ["MAT", "MAT", "SEÇ.KÜL", "MÜZİK", "TÜRKÇE", "TÜRKÇE", "REHBERLİK"], // Çarşamba
        4: ["İNG", "İNG", "FEN", "FEN", "SEÇ.MAT", "TÜRKÇE", "TÜRKÇE"], // Perşembe
        5: ["DİN", "DİN", "BEDEN", "BEDEN", "SOS", "SOS", "MAT"] // Cuma
    }
};

function guncelle() {
    const simdi = new Date();
    const gun = simdi.getDay(); // 1: Pzt, 5: Cuma
    if (gun === 0 || gun === 6) {
        document.getElementById("lesson-status").innerText = "Hafta Sonu!";
        return;
    }

    const aktifSaatler = (gun === 5) ? programVerisi.saatler.cuma : programVerisi.saatler.normal;
    const bugunDersler = programVerisi.gunler[gun];
    const suankiDakika = simdi.getHours() * 60 + simdi.getMinutes();

    let bulundu = false;
    aktifSaatler.forEach((saat, index) => {
        const [basS, basD] = saat[0].split(":").map(Number);
        const [bitS, bitD] = saat[1].split(":").map(Number);
        const baslangic = basS * 60 + basD;
        const bitis = bitS * 60 + bitD;

        if (suankiDakika >= baslangic && suankiDakika < bitis) {
            const kalan = bitis - suankiDakika;
            document.getElementById("lesson-status").innerText = bugunDersler[index] + " Dersindesin";
            document.getElementById("countdown").innerText = kalan + " dk";
            bulundu = true;
        }
    });

    if (!bulundu) {
        document.getElementById("lesson-status").innerText = "Teneffüs veya Okul Kapalı";
        document.getElementById("countdown").innerText = "--";
    }
}

function toggleMenu() { document.getElementById("sideMenu").classList.toggle("active"); }
function showPage(id) {
    ["home", "info", "games"].forEach(p => document.getElementById(p).style.display = (p === id ? "block" : "none"));
    toggleMenu();
}

setInterval(guncelle, 1000);
guncelle();
