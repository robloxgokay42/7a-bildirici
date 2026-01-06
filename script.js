const dersProgrami = {
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
    dersler: {
        1: [{d:"SEÇ.İNG", o:"A.IŞIK"}, {d:"SEÇ.İNG", o:"A.IŞIK"}, {d:"FEN", o:"S.BAKAY"}, {d:"FEN", o:"S.BAKAY"}, {d:"TRK 78", o:"E.GÜRSOY"}, {d:"TEKTAS", o:"D.KARAGÖ"}, {d:"TEKTAS", o:"D.KARAGÖ"}],
        2: [{d:"MAT", o:"C.KUTLU"}, {d:"MAT", o:"C.KUTLU"}, {d:"İNG 7-8", o:"A.IŞIK"}, {d:"İNG 7-8", o:"A.IŞIK"}, {d:"SOS", o:"M.MERAM"}, {d:"GÖR", o:"E.KARAKA"}, {d:"SEÇ.KÜL", o:"H.KOÇHAN"}],
        3: [{d:"MAT", o:"C.KUTLU"}, {d:"MAT", o:"C.KUTLU"}, {d:"SEÇ.KÜL", o:"H.KOÇHAN"}, {d:"MÜZ", o:"H.ERDOĞA"}, {d:"TRK 78", o:"E.GÜRSOY"}, {d:"TRK 78", o:"E.GÜRSOY"}, {d:"REH", o:"A.IŞIK"}],
        4: [{d:"İNG 7-8", o:"A.IŞIK"}, {d:"İNG 7-8", o:"A.IŞIK"}, {d:"FEN", o:"S.BAKAY"}, {d:"FEN", o:"S.BAKAY"}, {d:"SEÇ.MAT", o:"S.KARAGÖ"}, {d:"TRK 78", o:"E.GÜRSOY"}, {d:"TRK 78", o:"E.GÜRSOY"}],
        5: [{d:"DİN", o:"A.ERSARI"}, {d:"DİN", o:"A.ERSARI"}, {d:"BED", o:"Y.KARACA"}, {d:"BED", o:"Y.KARACA"}, {d:"SOS", o:"M.MERAM"}, {d:"SOS", o:"M.MERAM"}, {d:"MAT", o:"C.KUTLU"}]
    }
};

function updateTimer() {
    const simdi = new Date();
    const gun = simdi.getDay();
    const suankiDk = simdi.getHours() * 60 + simdi.getMinutes();

    const title = document.getElementById("lesson-name");
    const counter = document.getElementById("countdown-timer");

    if (gun === 0 || gun === 6) {
        title.innerText = "Hafta Sonu";
        counter.innerText = "--";
        return;
    }

    const aktifSaatler = (gun === 5) ? dersProgrami.saatler.cuma : dersProgrami.saatler.normal;
    const bugunDersler = dersProgrami.dersler[gun];
    let bulundu = false;

    aktifSaatler.forEach((s, i) => {
        const [bH, bM] = s.bas.split(":").map(Number);
        const [eH, eM] = s.bit.split(":").map(Number);
        const basDk = bH * 60 + bM;
        const bitDk = eH * 60 + eM;

        if (suankiDk >= basDk && suankiDk < bitDk) {
            title.innerText = bugunDersler[i].d;
            document.getElementById("teacher-name").innerText = bugunDersler[i].o;
            counter.innerText = bitDk - suankiDk;
            bulundu = true;
        }
    });

    if (!bulundu) {
        title.innerText = "Teneffüs / Kapalı";
        counter.innerText = "--";
        document.getElementById("teacher-name").innerText = "";
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

function tabloDoldur() {
    const table = document.getElementById("schedule-table");
    let html = "<thead><tr><th>Saat</th><th>Pzt</th><th>Sal</th><th>Çar</th><th>Per</th><th>Cum</th></tr></thead><tbody>";
    for(let i=0; i<7; i++) {
        html += `<tr><td>${i+1}</td>`;
        for(let g=1; g<=5; g++) { html += `<td>${dersProgrami.dersler[g][i].d}</td>`; }
        html += "</tr>";
    }
    table.innerHTML = html + "</tbody>";
}

setInterval(updateTimer, 1000);
updateTimer();
tabloDoldur();
