// Resimdeki program verileri
const programVerisi = {
    saatler: {
        normal: [
            { bas: "08:50", bit: "09:30" }, { bas: "09:45", bit: "10:25" },
            { bas: "10:40", bit: "11:20" }, { bas: "11:30", bit: "12:10" },
            { bas: "12:40", bit: "13:20" }, { bas: "13:30", bit: "14:10" },
            { bas: "14:20", bit: "15:00" }
        ],
        cuma: [
            { bas: "08:50", bit: "09:30" }, { bas: "09:45", bit: "10:25" },
            { bas: "10:35", bit: "11:10" }, { bas: "11:10", bit: "11:45" },
            { bas: "12:00", bit: "12:40" }, { bas: "13:15", bit: "13:55" },
            { bas: "14:10", bit: "14:50" }
        ]
    },
    gunler: {
        1: ["SEÇ.İNG", "SEÇ.İNG", "FEN", "FEN", "TÜRKÇE", "TEKTAS", "TEKTAS"],
        2: ["MAT", "MAT", "İNG", "İNG", "SOS", "GÖRSEL", "SEÇ.KÜL"],
        3: ["MAT", "MAT", "SEÇ.KÜL", "MÜZİK", "TÜRKÇE", "TÜRKÇE", "REHBERLİK"],
        4: ["İNG", "İNG", "FEN", "FEN", "SEÇ.MAT", "TÜRKÇE", "TÜRKÇE"],
        5: ["DİN", "DİN", "BEDEN", "BEDEN", "SOS", "SOS", "MAT"]
    }
};

function guncelle() {
    const simdi = new Date();
    const gun = simdi.getDay();
    const suankiDakika = simdi.getHours() * 60 + simdi.getMinutes();

    if (gun === 0 || gun === 6) {
        document.getElementById("lesson-name").innerText = "Hafta Sonu";
        document.getElementById("countdown-timer").innerText = "--";
        return;
    }

    const aktifSaatler = (gun === 5) ? programVerisi.saatler.cuma : programVerisi.saatler.normal;
    const bugunDersler = programVerisi.gunler[gun];
    
    let bulundu = false;
    aktifSaatler.forEach((saat, index) => {
        const [bH, bM] = saat.bas.split(":").map(Number);
        const [eH, eM] = saat.bit.split(":").map(Number);
        const baslangic = bH * 60 + bM;
        const bitis = eH * 60 + eM;

        if (suankiDakika >= baslangic && suankiDakika < bitis) {
            document.getElementById("lesson-name").innerText = bugunDersler[index];
            document.getElementById("countdown-timer").innerText = bitis - suankiDakika;
            bulundu = true;
        }
    });

    if (!bulundu) {
        document.getElementById("lesson-name").innerText = "Teneffüs / Okul Kapalı";
        document.getElementById("countdown-timer").innerText = "--";
    }
}

function toggleMenu() {
    document.getElementById("sideMenu").classList.toggle("active");
    document.querySelector(".overlay").classList.toggle("active");
}

function showSection(id) {
    document.querySelectorAll("section").forEach(s => s.classList.remove("active-section"));
    document.getElementById(id + "-section").classList.add("active-section");
    toggleMenu();
}

setInterval(guncelle, 1000);
guncelle();
