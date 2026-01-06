const dersProgrami = {
    saatler: {
        normal: ["08:50-09:30", "09:45-10:25", "10:40-11:20", "11:30-12:10", "12:40-13:20", "13:30-14:10", "14:20-15:00"],
        cuma: ["08:50-09:30", "09:45-10:25", "10:35-11:10", "11:10-11:45", "12:00-12:40", "13:15-13:55", "14:10-14:50"]
    },
    dersler: {
        1: [ // Pazartesi
            {d:"SEÇ.İNG", o:"A.IŞIK"}, {d:"SEÇ.İNG", o:"A.IŞIK"}, {d:"FEN", o:"S.BAKAY"}, {d:"FEN", o:"S.BAKAY"}, 
            {d:"TRK 78", o:"E.GÜRSOY"}, {d:"TEKTAS", o:"D.KARAGÖ"}, {d:"TEKTAS", o:"D.KARAGÖ"}
        ],
        2: [ // Salı
            {d:"MAT", o:"C.KUTLU"}, {d:"MAT", o:"C.KUTLU"}, {d:"İNG 7-8", o:"A.IŞIK"}, {d:"İNG 7-8", o:"A.IŞIK"}, 
            {d:"SOS", o:"M.MERAM"}, {d:"GÖR", o:"E.KARAKA"}, {d:"SEÇ.KÜL", o:"H.KOÇHAN"}
        ],
        3: [ // Çarşamba
            {d:"MAT", o:"C.KUTLU"}, {d:"MAT", o:"C.KUTLU"}, {d:"SEÇ.KÜL", o:"H.KOÇHAN"}, {d:"MÜZ", o:"H.ERDOĞA"}, 
            {d:"TRK 78", o:"E.GÜRSOY"}, {d:"TRK 78", o:"E.GÜRSOY"}, {d:"REH", o:"A.IŞIK"}
        ],
        4: [ // Perşembe
            {d:"İNG 7-8", o:"A.IŞIK"}, {d:"İNG 7-8", o:"A.IŞIK"}, {d:"FEN", o:"S.BAKAY"}, {d:"FEN", o:"S.BAKAY"}, 
            {d:"SEÇ.MAT", o:"S.KARAGÖ"}, {d:"TRK 78", o:"E.GÜRSOY"}, {d:"TRK 78", o:"E.GÜRSOY"}
        ],
        5: [ // Cuma
            {d:"DİN", o:"A.ERSARI"}, {d:"DİN", o:"A.ERSARI"}, {d:"BED", o:"Y.KARACA"}, {d:"BED", o:"Y.KARACA"}, 
            {d:"SOS", o:"M.MERAM"}, {d:"SOS", o:"M.MERAM"}, {d:"MAT", o:"C.KUTLU"}
        ]
    }
};

function sayaciGuncelle() {
    const simdi = new Date();
    const gun = simdi.getDay();
    const suankiDk = simdi.getHours() * 60 + simdi.getMinutes();

    const lessonNameEl = document.getElementById("lesson-name");
    const teacherNameEl = document.getElementById("teacher-name");
    const counterEl = document.getElementById("countdown-timer");

    if (gun === 0 || gun === 6) {
        lessonNameEl.innerText = "İyi Tatiller!";
        counterEl.innerText = "--";
        return;
    }

    const saatler = (gun === 5) ? dersProgrami.saatler.cuma : dersProgrami.saatler.normal;
    const bugunDersler = dersProgrami.dersler[gun];
    let found = false;

    saatler.forEach((s, i) => {
        const [bas, bit] = s.split("-");
        const [bH, bM] = bas.split(":").map(Number);
        const [eH, eM] = bit.split(":").map(Number);
        const basDk = bH * 60 + bM;
        const bitDk = eH * 60 + eM;

        if (suankiDk >= basDk && suankiDk < bitDk) {
            lessonNameEl.innerText = bugunDersler[i].d;
            teacherNameEl.innerText = bugunDersler[i].o;
            counterEl.innerText = bitDk - suankiDk;
            found = true;
        }
    });

    if (!found) {
        lessonNameEl.innerText = "Teneffüs / Kapalı";
        counterEl.innerText = "--";
        teacherNameEl.innerText = "";
    }
}

function tabloyuDoldur() {
    const table = document.getElementById("schedule-table");
    let html = "<thead><tr><th>Saat</th><th>Pzt</th><th>Sal</th><th>Çar</th><th>Per</th><th>Cum</th></tr></thead><tbody>";
    
    for (let i = 0; i < 7; i++) {
        html += `<tr><td>${i+1}. Ders<br><small>${dersProgrami.saatler.normal[i]}</small></td>`;
        for (let g = 1; g <= 5; g++) {
            const ders = dersProgrami.dersler[g][i];
            html += `<td>${ders.d}<br><small>${ders.o}</small></td>`;
        }
        html += "</tr>";
    }
    table.innerHTML = html + "</tbody>";
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

document.addEventListener("DOMContentLoaded", () => {
    sayaciGuncelle();
    setInterval(sayaciGuncelle, 1000);
    tabloyuDoldur();
});
