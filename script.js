// --- Veri Yapısı ---
const dersProgrami = {
    saatler: {
        normal: [ // Pzt - Perşembe
            { bas: "08:50", bit: "09:30" }, { bas: "09:45", bit: "10:25" },
            { bas: "10:40", bit: "11:20" }, { bas: "11:30", bit: "12:10" },
            { bas: "12:40", bit: "13:20" }, { bas: "13:30", bit: "14:10" },
            { bas: "14:20", bit: "15:00" }
        ],
        cuma: [ // Cuma Günü Özel Saatler
            { bas: "08:50", bit: "09:30" }, { bas: "09:45", bit: "10:25" },
            { bas: "10:35", bit: "11:10" }, { bas: "11:10", bit: "11:45" },
            { bas: "12:00", bit: "12:40" }, { bas: "13:15", bit: "13:55" },
            { bas: "14:10", bit: "14:50" }
        ]
    },
    dersler: { // Ders Adı ve Öğretmeni
        1: [ // Pazartesi
            { ders: "SEÇ. İNG", ogrt: "A. IŞIK" }, { ders: "SEÇ. İNG", ogrt: "A. IŞIK" },
            { ders: "FEN", ogrt: "S. BAKAY" }, { ders: "FEN", ogrt: "S. BAKAY" },
            { ders: "TRK 78", ogrt: "E. GÜRSOY" }, { ders: "TEK TAS", ogrt: "D. KARAGÖ" },
            { ders: "TEK TAS", ogrt: "D. KARAGÖ" }
        ],
        2: [ // Salı
            { ders: "MAT", ogrt: "C. KUTLU" }, { ders: "MAT", ogrt: "C. KUTLU" },
            { ders: "İNG 7-8", ogrt: "A. IŞIK" }, { ders: "İNG 7-8", ogrt: "A. IŞIK" },
            { ders: "SOS", ogrt: "M. MERAM" }, { ders: "GÖR", ogrt: "E. KARAKA" },
            { ders: "SEÇ. KÜL", ogrt: "H. KOÇHAN" }
        ],
        3: [ // Çarşamba
            { ders: "MAT", ogrt: "C. KUTLU" }, { ders: "MAT", ogrt: "C. KUTLU" },
            { ders: "SEÇ. KÜL", ogrt: "H. KOÇHAN" }, { ders: "MÜZ", ogrt: "H. ERDOĞA" },
            { ders: "TRK 78", ogrt: "E. GÜRSOY" }, { ders: "TRK 78", ogrt: "E. GÜRSOY" },
            { ders: "REH", ogrt: "A. IŞIK" }
        ],
        4: [ // Perşembe
            { ders: "İNG 7-8", ogrt: "A. IŞIK" }, { ders: "İNG 7-8", ogrt: "A. IŞIK" },
            { ders: "FEN", ogrt: "S. BAKAY" }, { ders: "FEN", ogrt: "S. BAKAY" },
            { ders: "SEÇ. MAT", ogrt: "S. KARAGÖ" }, { ders: "TRK 78", ogrt: "E. GÜRSOY" },
            { ders: "TRK 78", ogrt: "E. GÜRSOY" }
        ],
        5: [ // Cuma
            { ders: "DİN", ogrt: "A. ERSARI" }, { ders: "DİN", ogrt: "A. ERSARI" },
            { ders: "BED", ogrt: "Y. KARACA" }, { ders: "BED", ogrt: "Y. KARACA" },
            { ders: "SOS", ogrt: "M. MERAM" }, { ders: "SOS", ogrt: "M. MERAM" },
            { ders: "MAT", ogrt: "C. KUTLU" }
        ]
    }
};

// --- Yardımcı Fonksiyonlar ---
function saatDakikaToDakika(saatStr) {
    const [saat, dakika] = saatStr.split(":").map(Number);
    return saat * 60 + dakika;
}

function formatSayi(sayi) {
    return sayi < 10 ? "0" + sayi : sayi;
}

// --- Ana Mantık (Sayaç Güncelleme) ---
function sayaciGuncelle() {
    const simdi = new Date();
    // Test için saati manuel ayarlayabilirsin:
    // simdi.setHours(10, 5, 0); simdi.setDate(simdi.getDate() + (1 - simdi.getDay())); // Pazartesi 10:05
    
    const gun = simdi.getDay();
    const suankiDakika = simdi.getHours() * 60 + simdi.getMinutes();

    const lessonNameEl = document.getElementById("lesson-name");
    const teacherNameEl = document.getElementById("teacher-name");
    const countdownEl = document.getElementById("countdown-timer");
    const countdownLabelEl = document.querySelector(".countdown-label");
    const nextLessonEl = document.getElementById("next-lesson-info");

    // Hafta sonu kontrolü
    if (gun === 0 || gun === 6) {
        lessonNameEl.innerText = "Hafta Sonu!";
        teacherNameEl.innerText = "İyi tatiller.";
        countdownEl.innerText = "--";
        countdownLabelEl.innerHTML = "";
        nextLessonEl.innerText = "Pazartesi görüşmek üzere!";
        return;
    }

    const bugunkuSaatler = (gun === 5) ? dersProgrami.saatler.cuma : dersProgrami.saatler.normal;
    const bugunkuDersler = dersProgrami.dersler[gun];
    let dersteMi = false;

    for (let i = 0; i < bugunkuSaatler.length; i++) {
        const baslangic = saatDakikaToDakika(bugunkuSaatler[i].bas);
        const bitis = saatDakikaToDakika(bugunkuSaatler[i].bit);

        if (suankiDakika >= baslangic && suankiDakika < bitis) {
            // ŞU AN BİR DERSTESİN
            dersteMi = true;
            const kalanDakika = bitis - suankiDakika;
            const suankiDers = bugunkuDersler[i];

            lessonNameEl.innerText = suankiDers.ders;
            teacherNameEl.innerText = suankiDers.ogrt;
            countdownEl.innerText = kalanDakika;
            countdownLabelEl.innerHTML = "DK.<br>KALDI";

            // Sonraki ders bilgisi
            if (i + 1 < bugunkuDersler.length) {
                nextLessonEl.innerText = `Sonraki ders: ${bugunkuDersler[i+1].ders}`;
            } else {
                nextLessonEl.innerText = "Gün bitti!";
            }
            break;
        }
    }

    if (!dersteMi) {
        // Teneffüs veya okul dışı zaman kontrolü
        const ilkDersBas = saatDakikaToDakika(bugunkuSaatler[0].bas);
        const sonDersBit = saatDakikaToDakika(bugunkuSaatler[bugunkuSaatler.length - 1].bit);

        if (suankiDakika < ilkDersBas) {
            lessonNameEl.innerText = "Gün Başlamadı";
            teacherNameEl.innerText = "";
            countdownEl.innerText = "--";
             countdownLabelEl.innerHTML = "";
            nextLessonEl.innerText = `İlk ders: ${bugunkuDersler[0].ders} (${bugunkuSaatler[0].bas})`;
        } else if (suankiDakika >= sonDersBit) {
            lessonNameEl.innerText = "Okul Bitti";
            teacherNameEl.innerText = "İyi akşamlar.";
            countdownEl.innerText = "--";
             countdownLabelEl.innerHTML = "";
            nextLessonEl.innerText = "Yarın görüşmek üzere!";
        } else {
            // Teneffüstesin, bir sonraki dersi bul
            lessonNameEl.innerText = "Teneffüs";
            teacherNameEl.innerText = "";
            countdownLabelEl.innerHTML = "DK.<br>KALDI";
            for (let i = 0; i < bugunkuSaatler.length; i++) {
                const baslangic = saatDakikaToDakika(bugunkuSaatler[i].bas);
                if (suankiDakika < baslangic) {
                    const kalanDakika = baslangic - suankiDakika;
                    countdownEl.innerText = kalanDakika;
                    nextLessonEl.innerText = `Sonraki ders: ${bugunkuDersler[i].ders} (${bugunkuSaatler[i].bas})`;
                    break;
                }
            }
        }
    }
}

// --- Arayüz İşlevleri ---
function toggleMenu() {
    document.getElementById("sideMenu").classList.toggle("active");
    document.querySelector(".overlay").classList.toggle("active");
}

function showSection(sectionId) {
    // Tüm bölümleri gizle
    document.querySelectorAll("section").forEach(sec => {
        sec.classList.remove("active-section");
    });
    // Seçilen bölümü göster
    document.getElementById(sectionId + "-section").classList.add("active-section");
    // Menüyü kapat
    toggleMenu();
}

// --- Tabloyu Doldurma ---
function tabloyuDoldur() {
    const table = document.getElementById("schedule-table");
    let html = `<thead><tr><th>Saat</th><th>Pzt</th><th>Salı</th><th>Çarş</th><th>Perş</th><th>Cuma</th></tr></thead><tbody>`;
    
    // Normal saatlere göre satırları oluştur (Cuma'nın farklı saatlerini de göstermek için biraz karmaşık bir yapı gerekebilir ama şimdilik basit tutalım, sadece ders adlarını gösterelim)
    for (let i = 0; i < 7; i++) {
        html += `<tr>`;
        // Saat sütunu (Pzt-Perş saatlerini baz alıyoruz)
        html += `<td style="font-weight:bold;">${i+1}. Ders</td>`;
        // Günler
        for (let gun = 1; gun <= 5; gun++) {
            const dersBilgisi = dersProgrami.dersler[gun][i];
            html += `<td>${dersBilgisi.ders}<br><small>${dersBilgisi.ogrt}</small></td>`;
        }
        html += `</tr>`;
    }
    html += `</tbody>`;
    table.innerHTML = html;
}

// --- Başlangıç ---
document.addEventListener("DOMContentLoaded", () => {
    sayaciGuncelle(); // Sayacı hemen başlat
    setInterval(sayaciGuncelle, 1000); // Her saniye güncelle
    tabloyuDoldur(); // Ders programı tablosunu oluştur
});
