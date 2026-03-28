let soalIndex = 0;
let salahPG = 0;
let salahUraian = 0;
let score = 0;
let timer = null;
let waktu = 15;
let uraianIndex = 0;

// ================= SOAL PILIHAN GANDA =================
const soalPG = [
  {
    soal:"Menghormati teman yang berbeda agama merupakan penerapan Pancasila sila ke…",
    pilihan:["Sila ke-1","Sila ke-2","Sila ke-3","Sila ke-4"],
    jawaban:0
  },
  {
    soal:"Menolong korban bencana tanpa membeda-bedakan termasuk penerapan sila ke…",
    pilihan:["Sila ke-1","Sila ke-2","Sila ke-3","Sila ke-5"],
    jawaban:1
  },
  {
    soal:"Ikut menjaga keutuhan NKRI merupakan contoh penerapan sila ke…",
    pilihan:["Sila ke-2","Sila ke-3","Sila ke-4","Sila ke-5"],
    jawaban:1
  },
  {
    soal:"Musyawarah untuk mengambil keputusan termasuk penerapan sila ke…",
    pilihan:["Sila ke-2","Sila ke-3","Sila ke-4","Sila ke-5"],
    jawaban:2
  },
  {
    soal:"Pemerataan pembangunan di seluruh daerah merupakan penerapan sila ke…",
    pilihan:["Sila ke-3","Sila ke-4","Sila ke-5","Sila ke-1"],
    jawaban:2
  },
  {
    soal:"Menghargai hak asasi manusia merupakan penerapan sila ke…",
    pilihan:["Sila ke-1","Sila ke-2","Sila ke-3","Sila ke-4"],
    jawaban:1
  }
];
// ================= SOAL URAIAN =================
const soalUraian = [
  { soal:"Menghormati dan memberi kesempatan kepada orang lain untuk menjalankan ibadah sesuai agamanya merupakan penerapan sila keberapa dalam Pancasila?", jawaban:"sila ke-1" },
  { soal:"Pemerintah melakukan pembangunan secara merata di berbagai daerah agar semua masyarakat mendapatkan kesejahteraan. Hal tersebut merupakan penerapan sila keberapa dalam Pancasila?", jawaban:"sila ke-5" },
  { soal:"Dalam rapat organisasi, keputusan diambil melalui musyawarah untuk mencapai kesepakatan bersama. Hal ini merupakan penerapan sila keberapa dalam Pancasila?", jawaban:"sila ke-4" }
];

// ================= POPUP MATERI =================
function bukaTujuan(){ document.getElementById("popupTujuan").classList.remove("hidden"); }
function tutupTujuan(){ document.getElementById("popupTujuan").classList.add("hidden"); }

// ================= MULAI QUIZ =================
function mulaiQuiz(){
    let nama = document.getElementById("nama").value;
    if(nama.trim() === ""){ alert("Masukkan nama dulu!"); return; }

    document.getElementById("namaPage").classList.add("hidden");
    document.getElementById("popupTujuan").classList.add("hidden");
    document.getElementById("quizPage").classList.remove("hidden");

    resetGame();
    tampilSoal();
}

// ================= RESET =================
function resetGame(){
    soalIndex = 0; salahPG = 0; salahUraian = 0; score = 0; uraianIndex = 0;
    document.getElementById("score").innerText = "⭐ Score : 0";
}

// ================= TIMER =================
function mulaiTimer(){
    clearInterval(timer);
    waktu = 15;
    updateTimer();
    timer = setInterval(()=>{
        waktu--; updateTimer();
        if(waktu <= 0){
            clearInterval(timer);
            salahPG++; soalIndex++;
            if(salahPG >= 3){ GameOver(); }
            else{ if(soalIndex < soalPG.length){ tampilSoal(); } else { mulaiUraian(); } }
        }
    },1000);
}
function updateTimer(){ document.getElementById("timer").innerText = "⏳ " + waktu + " detik"; }

// ================= TAMPIL SOAL =================
function tampilSoal(){
    if(soalIndex >= soalPG.length){ mulaiUraian(); return; }
    let soal = soalPG[soalIndex];
    document.getElementById("soal").innerText = soal.soal;
    mulaiTimer();

    let pilihanHTML = "";
    soal.pilihan.forEach((p,i)=>{ pilihanHTML += `<button onclick="cekJawaban(${i})">${p}</button>`; });
    document.getElementById("pilihan").innerHTML = pilihanHTML;
}

// ================= CEK JAWABAN =================
function cekJawaban(index){
    clearInterval(timer);
    let buttons = document.querySelectorAll("#pilihan button");
    buttons.forEach((btn,i)=>{
        if(i === soalPG[soalIndex].jawaban){ btn.style.background="green"; btn.style.color="white"; }
        else{ btn.style.background="red"; btn.style.color="white"; }
    });

    setTimeout(()=>{
        if(index === soalPG[soalIndex].jawaban){ score+=10; }
        else{ salahPG++; if(salahPG>=3){ GameOver(); return; } }

        document.getElementById("score").innerText="⭐ Score : "+score;
        soalIndex++;
        if(soalIndex<soalPG.length){ tampilSoal(); } else{ mulaiUraian(); }
    },800);
}

// ================= URAIAN =================
function mulaiUraian(){ document.getElementById("quizPage").classList.add("hidden"); document.getElementById("uraianPage").classList.remove("hidden"); tampilUraian(); }
function tampilUraian(){
    if(uraianIndex>=soalUraian.length){ GameWin(); return; }
    document.getElementById("soalUraian").innerText=soalUraian[uraianIndex].soal;
    document.getElementById("jawaban").value="";
}
function cekUraian(){
    let jawab=document.getElementById("jawaban").value.toLowerCase();
    if(!jawab.includes(soalUraian[uraianIndex].jawaban)){ salahUraian++; if(salahUraian>=1){ GameOver(); return; } }
    else{ score+=10; document.getElementById("score").innerText="⭐ Score : "+score; }
    uraianIndex++;
    if(uraianIndex<soalUraian.length){ tampilUraian(); }else{ GameWin(); }
}

// ================= GAME OVER =================
function GameOver(){
    clearInterval(timer);
    document.getElementById("quizPage").classList.add("hidden");
    document.getElementById("uraianPage").classList.add("hidden");
    document.getElementById("gameOver").classList.remove("hidden");
}

// ================= MENANG =================
function GameWin(){
    clearInterval(timer);
    document.getElementById("uraianPage").classList.add("hidden");
    let win=document.getElementById("gameWin");
    win.classList.remove("hidden");
    win.innerHTML=`
    <h1>🇮🇩 Selamat!</h1>
    <p>Kamu telah memahami nilai-nilai Pancasila</p>
    <h2>🏆 Score : ${score}</h2>
    <button onclick="ulangGame()">🔄 Main Lagi</button>`;
}

// ================= ULANG =================
function ulangGame(){ location.reload(); }