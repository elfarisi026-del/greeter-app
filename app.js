<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VolleyBall Great Elite Kotwis</title>
    <!-- Tailwind CSS Play CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: { primary: '#2563eb' }
                }
            }
        }
    </script>
    <!-- Leaflet CSS & JS for Interactive Map -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <!-- SheetJS for Excel Export -->
    <script src="https://cdn.sheetjs.com/xlsx-0.19.3/package/dist/xlsx.full.min.js"></script>
</head>
<body class="bg-slate-50 text-slate-800 font-sans antialiased">

    <div id="app-container"></div>

    <!-- Firebase SDK Compat -->
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-database-compat.js"></script>

    <script>
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzx7E1umKZ5pi_Z40LyAGOx0p1EfYu22_Z_AYk86nCW7NITj6D7we_k6K81pfXLsPk_/exec";

    const firebaseConfig = {
        apiKey: "AIzaSyDJQOCIKvHgDCqbGDx9h49hJWWTTVzHH5s",
        authDomain: "greeter-3a9c5.firebaseapp.com",
        databaseURL: "https://greeter-3a9c5-default-rtdb.firebaseio.com",
        projectId: "greeter-3a9c5",
        storageBucket: "greeter-3a9c5.firebasestorage.app",
        messagingSenderId: "772861829922",
        appId: "1:772861829922:web:bb1f65d2cb0145c974bb7b"
    };

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    const db = firebase.database();

    const employees = [
        { nik: "158769", name: "RUDI KRISTIAN" }, { nik: "129368", name: "KHAIRUL RAHMAN" },
        { nik: "108238", name: "SUTARMIN" }, { nik: "182837", name: "RAMA PRATAMA SANTOSO" },
        { nik: "184969", name: "SITI AWALIYAH" }, { nik: "182521", name: "HENING SWARA BAHTERA" },
        { nik: "180950", name: "AMALIA JUWITA" }, { nik: "105079", name: "DIAN HARDIANSYAH" },
        { nik: "182188", name: "YENI APRINGGA" }, { nik: "176045", name: "DICKY CAHYA PERMATA" },
        { nik: "162080", name: "HABIB NUGRAHA PUTRA" }, { nik: "187043", name: "ERNIH" },
        { nik: "183220", name: "IBNU MAULANA" }, { nik: "150618", name: "NOVIA SURYANI" },
        { nik: "176807", name: "SUPRIYATNA" }, { nik: "166507", name: "FEBRI SAPUTRA" },
        { nik: "119323", name: "ADE SUBANDI." }, { nik: "181777", name: "REVINA NUR PRITA ALICIA" },
        { nik: "172934", name: "HARI AMIRIANSYAH" }, { nik: "189934", name: "SINTA HARYANTI" },
        { nik: "182838", name: "CANDRA PUTRA" }, { nik: "187161", name: "ANGGA IRHAM SYACHBANI" },
        { nik: "119327", name: "TRI UTAMI KHOYRIYAH" }, { nik: "181776", name: "INDRIYANI" },
        { nik: "182969", name: "NOVITA SARI" }, { nik: "172815", name: "STEFANUS KELVIN SUPRIYADI" },
        { nik: "125909", name: "VIQ ANDESTA" }, { nik: "162464", name: "RENDY SATRIA OKTARIO" },
        { nik: "166544", name: "ANA NADIRAH" }, { nik: "105095", name: "KIBAR MUHAMMAD" },
        { nik: "182429", name: "ADELIA FITRIANI" }, { nik: "167188", name: "NUR ROSWIDIANA" },
        { nik: "172234", name: "MUHAMMAD ALIF ALFAREZA" }, { nik: "194833", name: "MOHAMMAD ICHWAN" },
        { nik: "181150", name: "DION KURNIAWAN" }, { nik: "182972", name: "RISKY ADITIYA PRATAMA" },
        { nik: "139418", name: "DIKI WAHYUDI" }, { nik: "182586", name: "RANI WIDYA HIDAYAT" },
        { nik: "172906", name: "IQBAL MUZAKAROH" }, { nik: "163710", name: "ARZALIA RAHMADANI" },
        { nik: "166522", name: "MUHAMMAD VIKRI FAUZAN" }, { nik: "178670", name: "MISBAHHUDIN" },
        { nik: "178211", name: "YUSRIL NURHAMDHI" }, { nik: "164854", name: "ZAKY MALIK AL SALAM" },
        { nik: "166545", name: "SRI RAHAYU" }, { nik: "176952", name: "MOHAMMAD PUTRA ABIDIN" },
        { nik: "169045", name: "CALM KARINA SIALLAGAN" }, { nik: "175137", name: "RISKA ZULYANDIPA" },
        { nik: "181775", name: "NABILLA PUTRI HAMIDAH" }, { nik: "168233", name: "INDRA KURNIAWAN" },
        { nik: "167201", name: "DELVIA ERSA PUTRI" }, { nik: "178549", name: "DEVA FERIKA" },
        { nik: "181774", name: "OKTAFIANI SILAWATI RAJABAN" }, { nik: "168208", name: "REGGYTA DWI KINANTY" }
    ];

    let activeQueue = []; 
    let currentSpots = [[null, null, null], [null, null], [null, null]]; 
    let spotStandbyEndTimes = [[null, null, null], [null, null], [null, null]]; 
    let spotShiftOrigin = [[null, null, null], [null, null], [null, null]]; 
    let shiftMorningQueue = [];
    let shiftAfternoonQueue = [];
    let selectedStaffQueue = [];

    let activeSpotIndex = null;
    let activeStaffIndexInSpot = null;
    let activeSessionStaff = null;
    let previousStaffPositionBackup = null; 

    let localActiveSession = JSON.parse(localStorage.getItem('greeter_active_session')) || null;

    let skipSpotIndex = null;
    let skipStaffIndexInSpot = null;
    let timerInterval = null;
    let secondsElapsed = 0;
    let activityLogs = [];

    let currentMap = null;
    let currentMarker = null;
    let staffLatitude = null;
    let staffLongitude = null;

    let liveStoreMap = null;
    let liveMarkers = [];

    function isAfternoonCutOffTime() {
        const now = new Date();
        return now.getHours() >= 22;
    }

    function isWeekendToday() {
        const day = new Date().getDay();
        return day === 0 || day === 6;
    }

    function getMaxTitik1Slots() {
        return isWeekendToday() ? 3 : 2;
    }

    function formatRupiahInput(inputElement) {
        let val = inputElement.value.replace(/[^,\d]/g, '').toString();
        let split = val.split(',');
        let sisa = split[0].length % 3;
        let rupiah = split[0].substr(0, sisa);
        let ribuan = split[0].substr(sisa).match(/\d{3}/gi);

        if (ribuan) {
            let separator = sisa ? '.' : '';
            rupiah += separator + ribuan.join('.');
        }

        rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
        inputElement.value = rupiah;
    }

    function renderAppTemplate() {
        const container = document.getElementById('app-container');
        if (!container) return;

        container.innerHTML = `
        <div id="custom-alert-modal" class="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 hidden z-50">
            <div class="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 text-center">
                <h3 id="custom-alert-title" class="text-lg font-bold text-slate-900 mb-2">Informasi</h3>
                <p id="custom-alert-message" class="text-sm text-slate-600 mb-5">Pesan...</p>
                <button onclick="closeCustomAlert()" class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-bold text-sm transition shadow-sm">OK</button>
            </div>
        </div>

        <div id="notification-modal" class="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 hidden z-50" onclick="handleModalBackdropClick(event)">
            <div id="notification-box" class="bg-amber-50 rounded-2xl max-w-md w-full p-6 shadow-2xl border-2 border-amber-400 text-center animate-bounce transition-transform duration-200">
                <div class="text-4xl mb-2">🔔</div>
                <h3 class="text-xl font-black text-amber-900 mb-2">PANGGILAN GREETERS!</h3>
                <p id="notification-message" class="text-sm text-amber-800 font-bold mb-5">Petugas dipersilakan naik ke titik greeter.</p>
                <div class="space-y-2">
                    <button onclick="closeNotificationModal()" class="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-xl font-bold text-sm transition shadow-sm">SIAP & MENGERTI ✓</button>
                    <p class="text-[11px] text-amber-700 font-medium italic">*(Atau geser / ketuk luar kotak untuk menghilangkan)*</p>
                </div>
            </div>
        </div>

        <div id="live-map-pin-modal" class="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 hidden z-50">
            <div class="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-100">
                <h3 class="text-lg font-bold text-slate-900 mb-1">🔐 Cek Posisi SMT Buddy</h3>
                <p class="text-xs text-slate-500 mb-4">Masukkan PIN sekuriti untuk membuka pemantauan denah toko.</p>
                <input type="password" id="live-map-pin-input" placeholder="Masukkan PIN..." class="border border-slate-300 rounded-xl px-4 py-2.5 w-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium mb-2">
                <p id="live-map-pin-error" class="text-rose-500 text-xs font-medium hidden mb-3">PIN salah!</p>
                <div class="flex justify-end gap-2 pt-2">
                    <button onclick="closeLiveMapPinModal()" class="border border-slate-300 text-slate-700 px-4 py-2 rounded-xl text-xs font-semibold">Batal</button>
                    <button onclick="verifyLiveMapPin()" class="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl text-xs font-semibold shadow-sm">Buka Denah</button>
                </div>
            </div>
        </div>

        <div id="live-map-modal" class="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 hidden z-50">
            <div class="bg-white rounded-2xl max-w-4xl w-full p-6 md:p-8 shadow-2xl max-h-[90vh] overflow-y-auto border border-slate-100">
                <div class="flex justify-between items-center mb-4 border-b border-slate-100 pb-3">
                    <h3 class="text-xl font-bold text-slate-900">🗺️ Cek Posisi SMT Buddy (Real-Time)</h3>
                    <button onclick="closeLiveMapModal()" class="text-slate-400 hover:text-slate-600 text-2xl font-bold">&times;</button>
                </div>
                <p class="text-xs text-slate-500 mb-4 font-medium">Pemantauan posisi SMT secara real-time berdasarkan titik aktif di toko.</p>
                <div id="live-store-map" class="w-full h-96 rounded-xl border border-slate-200 z-10 mb-4"></div>
                <div class="flex justify-end">
                    <button onclick="closeLiveMapModal()" class="bg-slate-800 hover:bg-slate-900 text-white px-5 py-2.5 rounded-xl text-xs font-semibold shadow-sm">Tutup</button>
                </div>
            </div>
        </div>

        <div id="rotasi-pin-modal" class="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 hidden z-50">
            <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
                <h3 class="text-lg font-bold text-slate-900 mb-1">🔄 Rotasi Manual Titik</h3>
                <p class="text-xs text-slate-500 mb-4">Masukkan PIN sekuriti dan pilih SMT yang akan dinaikkan ke urutan teratas.</p>
                
                <div id="rotasi-step-pin" class="space-y-3">
                    <input type="password" id="rotasi-pin-input" placeholder="Masukkan PIN..." class="border border-slate-300 rounded-xl px-4 py-2.5 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium">
                    <p id="rotasi-pin-error" class="text-rose-500 text-xs font-medium hidden">PIN salah!</p>
                    <div class="flex justify-end gap-2 pt-2">
                        <button onclick="closeRotasiPinModal()" class="border border-slate-300 text-slate-700 px-4 py-2 rounded-xl text-xs font-semibold">Batal</button>
                        <button onclick="verifyRotasiPin()" class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-xs font-semibold shadow-sm">Lanjut</button>
                    </div>
                </div>

                <div id="rotasi-step-select" class="space-y-3 hidden">
                    <label class="block text-xs font-semibold text-slate-700">Pilih Petugas yang Naik ke Urutan Teratas:</label>
                    <select id="rotasi-target-select" class="border border-slate-300 rounded-xl px-3.5 py-2.5 w-full text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"></select>
                    <div class="flex justify-end gap-2 pt-2">
                        <button onclick="closeRotasiPinModal()" class="border border-slate-300 text-slate-700 px-4 py-2 rounded-xl text-xs font-semibold">Batal</button>
                        <button onclick="executeManualRotation()" class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-xs font-semibold shadow-sm">Eksekusi Rotasi</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="max-w-5xl mx-auto p-4 md:p-8">
            <header class="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-200 pb-5 mb-6 gap-4">
                <div>
                    <h1 class="text-2xl md:text-3xl font-black text-slate-950 tracking-tight">VolleyBall Great Elite Kotwis</h1>
                    <p class="text-sm text-slate-500 mt-0.5 font-medium" id="current-date"></p>
                </div>
                <div class="flex flex-wrap gap-2.5">
                    <button onclick="openLiveMapPinModal()" class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl font-semibold shadow-sm transition text-sm flex items-center gap-2">
                        <span>🗺️ Cek Posisi SMT Buddy</span>
                    </button>
                    <button onclick="openSmtModal()" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-semibold shadow-sm transition text-sm flex items-center gap-2">
                        <span>⚙️ Menu Input SMT & Shift</span>
                    </button>
                    <button onclick="openReportModal()" class="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl font-semibold shadow-sm transition text-sm flex items-center gap-2">
                        <span>📊 Rekap & WhatsApp (.xlsx)</span>
                    </button>
                </div>
            </header>

            <section class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
                    <div>
                        <p class="text-xs text-slate-500 font-bold uppercase tracking-wider">SMT Hadir (Total)</p>
                        <h3 class="text-3xl font-black text-blue-600 mt-1" id="stat-present">0</h3>
                    </div>
                    <div class="bg-blue-50 p-3.5 rounded-xl text-blue-600 text-xl font-bold">👥</div>
                </div>
                <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
                    <div>
                        <p class="text-xs text-slate-500 font-bold uppercase tracking-wider">SMT Off / Tidak Hadir</p>
                        <h3 class="text-3xl font-black text-rose-600 mt-1" id="stat-off">54</h3>
                    </div>
                    <div class="bg-rose-50 p-3.5 rounded-xl text-rose-600 text-xl font-bold">🏠</div>
                </div>
            </section>

            <section class="mb-8 bg-white border border-slate-200/80 rounded-2xl p-5 md:p-6 shadow-xs">
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-5 gap-3 border-b border-slate-100 pb-4">
                    <div>
                        <h2 class="text-lg font-bold text-slate-900">📍 Titik Greeter & Sistem Rotasi</h2>
                    </div>
                    <div id="active-shift-badge" class="bg-slate-100 text-slate-700 text-xs px-3.5 py-1.5 rounded-xl font-bold tracking-wide border border-slate-200">
                        Shift: Berjalan
                    </div>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                    <!-- TITIK 1 -->
                    <div class="bg-slate-50/70 p-4 rounded-xl border border-slate-200/70 flex flex-col justify-between hover:border-slate-300 transition">
                        <div>
                            <div class="flex justify-between items-center mb-2">
                                <span class="text-[11px] font-extrabold uppercase tracking-wider text-blue-700 bg-blue-100/80 px-2.5 py-1 rounded-md" id="titik1-label">Titik 1</span>
                                <span class="text-xs text-slate-400 font-medium">Main Entrance</span>
                            </div>
                            <h3 class="font-bold text-slate-900 text-base mb-1">Main Entrance</h3>
                            <div class="space-y-2 mt-2" id="spot-0">
                                <p class="text-sm text-slate-400 italic">Belum ada petugas</p>
                            </div>
                        </div>
                        <div class="space-y-2 mt-4 pt-3 border-t border-slate-200/60">
                            <div class="grid grid-cols-3 gap-1" id="spot-0-buttons"></div>
                            <div class="grid grid-cols-3 gap-1" id="spot-0-standby-buttons"></div>
                            <div class="grid grid-cols-3 gap-1" id="spot-0-skip-buttons"></div>
                        </div>
                    </div>

                    <!-- TITIK 2 -->
                    <div class="bg-slate-50/70 p-4 rounded-xl border border-slate-200/70 flex flex-col justify-between hover:border-slate-300 transition">
                        <div>
                            <div class="flex justify-between items-center mb-2">
                                <span class="text-[11px] font-extrabold uppercase tracking-wider text-blue-700 bg-blue-100/80 px-2.5 py-1 rounded-md">Titik 2</span>
                                <span class="text-xs text-slate-400 font-medium">CarPark / CP</span>
                            </div>
                            <h3 class="font-bold text-slate-900 text-base mb-1">CarPark / CP</h3>
                            <div class="space-y-2 mt-2" id="spot-1">
                                <p class="text-sm text-slate-400 italic">Belum ada petugas</p>
                            </div>
                        </div>
                        <div class="space-y-2 mt-4 pt-3 border-t border-slate-200/60">
                            <div class="grid grid-cols-2 gap-2" id="spot-1-buttons-mulai"></div>
                            <div class="grid grid-cols-2 gap-2" id="spot-1-buttons-standby"></div>
                            <div class="grid grid-cols-2 gap-2" id="spot-1-buttons-skip"></div>
                        </div>
                    </div>

                    <!-- TITIK 3 -->
                    <div class="bg-slate-50/70 p-4 rounded-xl border border-slate-200/70 flex flex-col justify-between hover:border-slate-300 transition">
                        <div>
                            <div class="flex justify-between items-center mb-2">
                                <span class="text-[11px] font-extrabold uppercase tracking-wider text-blue-700 bg-blue-100/80 px-2.5 py-1 rounded-md">Titik 3</span>
                                <span class="text-xs text-slate-400 font-medium">HomeGallery / HG</span>
                            </div>
                            <h3 class="font-bold text-slate-900 text-base mb-1">HomeGallery / HG</h3>
                            <div class="space-y-2 mt-2" id="spot-2">
                                <p class="text-sm text-slate-400 italic">Belum ada petugas</p>
                            </div>
                        </div>
                        <div class="space-y-2 mt-4 pt-3 border-t border-slate-200/60">
                            <div class="grid grid-cols-2 gap-2" id="spot-2-buttons-mulai"></div>
                            <div class="grid grid-cols-2 gap-2" id="spot-2-buttons-standby"></div>
                            <div class="grid grid-cols-2 gap-2" id="spot-2-buttons-skip"></div>
                        </div>
                    </div>
                </div>

                <div class="bg-slate-50/70 p-4 rounded-xl border border-slate-200/70">
                    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2">
                        <span class="font-bold text-slate-700 text-sm">Antrean SMT Cadangan / Berikutnya:</span>
                        <button onclick="requestRotateVolleyball()" class="bg-amber-600 hover:bg-amber-700 text-white text-xs px-3.5 py-2 rounded-xl font-bold transition shadow-xs flex items-center gap-1.5">
                            <span>🔄 Rotasi Manual Titik</span>
                        </button>
                    </div>
                    <div id="queue-display" class="space-y-1.5 text-sm text-slate-600">
                        <span class="text-slate-400 italic">Tidak ada antrean</span>
                    </div>
                </div>
            </section>

            <section class="bg-white border border-slate-200/80 rounded-2xl p-5 md:p-6 shadow-xs">
                <h2 class="text-lg font-bold text-slate-900 mb-4">📋 Riwayat Sesi Buddy Hari Ini</h2>
                <div class="overflow-x-auto">
                    <table class="w-full text-left text-sm text-slate-600">
                        <thead class="bg-slate-100 text-slate-700 uppercase text-[11px] font-bold tracking-wider">
                            <tr>
                                <th class="p-3.5 rounded-l-xl">Waktu</th>
                                <th class="p-3.5">Petugas (SMT)</th>
                                <th class="p-3.5">Titik</th>
                                <th class="p-3.5">Shift</th>
                                <th class="p-3.5">Durasi</th>
                                <th class="p-3.5">Reason / Alasan</th>
                                <th class="p-3.5 rounded-r-xl">Foto & GPS</th>
                            </tr>
                        </thead>
                        <tbody id="log-table-body" class="divide-y divide-slate-100">
                            <tr><td colspan="7" class="p-6 text-center text-slate-400 italic">Belum ada aktivitas tercatat hari ini.</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>

        <div id="smt-modal" class="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 hidden z-50">
            <div class="bg-white rounded-2xl max-w-2xl w-full p-6 md:p-8 shadow-2xl max-h-[90vh] overflow-y-auto border border-slate-100">
                <div class="flex justify-between items-center mb-5 border-b border-slate-100 pb-4">
                    <h3 class="text-xl font-bold text-slate-900">Menu Input SMT & Shift</h3>
                    <button onclick="closeSmtModal()" class="text-slate-400 hover:text-slate-600 text-2xl font-bold">&times;</button>
                </div>

                <div id="pin-section" class="mb-6">
                    <label class="block text-sm font-semibold text-slate-700 mb-2">Masukkan PIN</label>
                    <div class="flex gap-2">
                        <input type="password" id="pin-input" placeholder="Masukkan PIN..." class="border border-slate-300 rounded-xl px-4 py-2.5 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium">
                        <button onclick="verifyPin()" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-semibold text-sm shadow-sm transition">Buka</button>
                    </div>
                    <p id="pin-error" class="text-rose-500 text-xs mt-1.5 font-medium hidden">PIN salah!</p>
                </div>

                <div id="smt-selection-section" class="hidden space-y-5">
                    <div class="bg-blue-50/80 border border-blue-200/80 rounded-2xl p-4">
                        <label class="block text-sm font-bold text-blue-950 mb-2.5">Pilih Shift yang Ingin Diinput</label>
                        <div class="grid grid-cols-2 gap-3">
                            <label class="flex items-center justify-center gap-2 bg-white p-3 rounded-xl border border-blue-200 cursor-pointer text-xs md:text-sm font-semibold text-slate-800 shadow-2xs hover:bg-blue-50 transition">
                                <input type="radio" name="shift-mode" value="pagi" checked onchange="toggleShiftMode()"> Shift Pagi
                            </label>
                            <label class="flex items-center justify-center gap-2 bg-white p-3 rounded-xl border border-blue-200 cursor-pointer text-xs md:text-sm font-semibold text-slate-800 shadow-2xs hover:bg-blue-50 transition">
                                <input type="radio" name="shift-mode" value="siang" onchange="toggleShiftMode()"> Shift Siang
                            </label>
                        </div>
                        <p class="text-xs text-blue-800 mt-2.5 font-medium" id="shift-mode-desc">Input Shift Pagi: Petugas baru ditambahkan berurutan.</p>
                    </div>

                    <div>
                        <div class="flex justify-between items-center mb-2">
                            <p class="text-sm font-semibold text-slate-700" id="selection-instruction">Pilih SMT yang bertugas:</p>
                            <span id="shift-active-label" class="text-xs font-bold text-blue-700 bg-blue-100 px-2.5 py-1 rounded-lg">Shift Pagi</span>
                        </div>
                        <div class="mb-3">
                            <input type="text" id="search-employee" onkeyup="filterEmployee()" placeholder="Cari nama atau NIK..." class="border border-slate-300 rounded-xl px-4 py-2.5 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium">
                        </div>
                        <div class="max-h-52 overflow-y-auto border border-slate-200 rounded-xl p-2.5 space-y-1 mb-4 bg-slate-50/50" id="employee-list-container"></div>
                        
                        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-4">
                            <div class="text-xs font-bold text-slate-700 mb-2">Urutan Terpilih Shift Ini (<span id="selected-count">0</span> orang):</div>
                            <div id="selected-preview" class="flex flex-wrap gap-1.5"></div>
                        </div>
                    </div>

                    <div class="flex justify-end gap-3 pt-2">
                        <button onclick="closeSmtModal()" class="border border-slate-300 text-slate-700 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-50 transition">Batal</button>
                        <button onclick="saveSmtList()" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition">Simpan & Akumulasikan Urutan</button>
                    </div>
                </div>
            </div>
        </div>

        <div id="report-modal" class="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 hidden z-50">
            <div class="bg-white rounded-2xl max-w-md w-full p-6 md:p-8 shadow-2xl border border-slate-100">
                <div class="flex justify-between items-center mb-5 border-b border-slate-100 pb-4">
                    <h3 class="text-xl font-bold text-slate-900">Rekap & WhatsApp (.xlsx)</h3>
                    <button onclick="closeReportModal()" class="text-slate-400 hover:text-slate-600 text-2xl font-bold">&times;</button>
                </div>

                <div id="report-pin-section" class="mb-4">
                    <label class="block text-sm font-semibold text-slate-700 mb-2">Masukkan PIN</label>
                    <div class="flex gap-2">
                        <input type="password" id="report-pin-input" placeholder="Masukkan PIN..." class="border border-slate-300 rounded-xl px-4 py-2.5 w-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium">
                        <button onclick="verifyReportPin()" class="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-xl font-semibold text-sm shadow-sm transition">Buka</button>
                    </div>
                    <p id="report-pin-error" class="text-rose-500 text-xs mt-1.5 font-medium hidden">PIN salah!</p>
                </div>

                <div id="report-content-section" class="hidden space-y-4">
                    <div>
                        <label class="block text-sm font-semibold text-slate-700 mb-2">Pilih Periode Rekap</label>
                        <select id="report-period" class="border border-slate-300 rounded-xl px-3.5 py-2.5 w-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium bg-white">
                            <option value="daily">Harian (Hari Ini)</option>
                            <option value="weekly">Mingguan (7 Hari Terakhir)</option>
                            <option value="monthly">Bulanan (Bulan Ini)</option>
                        </select>
                    </div>

                    <div class="grid grid-cols-2 gap-3 pt-3">
                        <button onclick="exportExcel()" class="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-bold text-xs md:text-sm transition shadow-sm flex items-center justify-center gap-2">
                            <span>📥 Download .xlsx</span>
                        </button>
                        <button onclick="sendWhatsApp()" class="bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-xl font-bold text-xs md:text-sm transition shadow-sm flex items-center justify-center gap-2">
                            <span>💬 Kirim WhatsApp</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div id="buddy-modal" class="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 hidden z-50">
            <div class="bg-white rounded-2xl max-w-lg w-full p-6 md:p-8 shadow-2xl max-h-[90vh] overflow-y-auto border border-slate-100">
                <h3 class="text-xl font-bold text-slate-900 mb-1">Sesi Buddy & Customer</h3>
                <p class="text-xs text-slate-500 mb-4 font-medium" id="buddy-info-text">Titik: - | Petugas: -</p>

                <div class="bg-blue-50/80 border border-blue-200/80 rounded-2xl p-4 text-center mb-4">
                    <span class="text-xs text-blue-700 font-bold uppercase tracking-wider">Durasi Sesi Buddy Berjalan</span>
                    <div id="timer-display" class="text-4xl font-mono font-black text-blue-950 mt-1">00:00</div>
                    <p class="text-[11px] text-blue-600 mt-1 font-medium">✨ Timer ini murni mencatat durasi (bebas selama apa pun).</p>
                </div>

                <div class="space-y-4 mb-5">
                    <div class="bg-slate-50 p-3 rounded-xl border border-slate-200">
                        <label class="block text-xs font-bold text-slate-700 mb-1.5">📍 Lokasi Denah Toko & SMT</label>
                        <div id="buddy-map" class="w-full h-48 rounded-lg border border-slate-200 z-10"></div>
                        <p id="coord-text" class="text-[11px] text-slate-500 mt-1 font-mono">Memuat denah layout toko...</p>
                    </div>

                    <div>
                        <label class="block text-sm font-semibold text-slate-700 mb-1.5">Upload Foto Buddy</label>
                        <input type="file" id="buddy-photo" accept="image/*" capture="environment" class="w-full text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition cursor-pointer border border-slate-200 rounded-xl">
                    </div>

                    <div>
                        <label class="block text-sm font-semibold text-slate-700 mb-1.5">Pilih Status Transaksi / Pending</label>
                        <select id="reason-category" onchange="toggleReasonInput()" class="border border-slate-300 rounded-xl px-3.5 py-2.5 w-full text-sm mb-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium">
                            <option value="Transaksi">1. Transaksi (Wajib Input Value)</option>
                            <option value="Pending">2. Pending (Wajib Input Value & Alasan)</option>
                            <option value="Lain">3. Lain-lain</option>
                        </select>
                        <div id="reason-value-container" class="space-y-2">
                            <input type="text" id="reason-value-input" onkeyup="formatRupiahInput(this)" placeholder="Masukkan nilai (Value)..." class="border border-slate-300 rounded-xl px-3.5 py-2.5 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium">
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-3">
                    <button onclick="openCancelReasonModal()" class="bg-rose-100 hover:bg-rose-200 text-rose-700 py-3 rounded-xl font-bold text-sm transition shadow-2xs">
                        ❌ Batal / Cancel
                    </button>
                    <button onclick="finishBuddySession()" class="bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold text-sm transition shadow-sm">
                        Simpan & Selesai ✓
                    </button>
                </div>
            </div>
        </div>

        <div id="cancel-reason-modal" class="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 hidden z-[60]">
            <div class="bg-white rounded-2xl max-w-md w-full p-6 md:p-8 shadow-2xl border border-slate-100">
                <h3 class="text-xl font-bold text-slate-900 mb-1">❌ Alasan Cancel</h3>
                <p class="text-xs text-slate-500 mb-4 font-medium">Pilih salah satu alasan pembatalan sesi:</p>

                <div class="space-y-3 mb-6">
                    <label class="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 transition">
                        <input type="radio" name="cancel-option" value="Customer sudah janjian" class="mt-0.5 text-blue-600 focus:ring-blue-500" checked>
                        <span class="text-sm font-semibold text-slate-800">Customer sudah janjian</span>
                    </label>
                    <label class="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 transition">
                        <input type="radio" name="cancel-option" value="Customer hanya lewat ke azko/mall/toilet" class="mt-0.5 text-blue-600 focus:ring-blue-500">
                        <span class="text-sm font-semibold text-slate-800">Customer hanya lewat ke azko/mall/toilet</span>
                    </label>
                </div>

                <div class="flex justify-end gap-3">
                    <button onclick="closeCancelReasonModal()" class="border border-slate-300 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-50 transition">Kembali</button>
                    <button onclick="confirmCancelBuddySession()" class="bg-rose-600 hover:bg-rose-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition">Konfirmasi Cancel</button>
                </div>
            </div>
        </div>

        <div id="skip-modal" class="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 hidden z-50">
            <div class="bg-white rounded-2xl max-w-md w-full p-6 md:p-8 shadow-2xl border border-slate-100">
                <h3 class="text-xl font-bold text-slate-900 mb-1">⏭️ Skip Giliran Greeter</h3>
                <p class="text-xs text-slate-500 mb-4 font-medium" id="skip-info-text">Titik: - | Petugas: -</p>

                <div class="space-y-4 mb-6">
                    <div>
                        <label class="block text-sm font-semibold text-slate-700 mb-1.5">Pilih Alasan (Reason) Skip</label>
                        <select id="skip-reason-category" onchange="toggleSkipReasonInput()" class="border border-slate-300 rounded-xl px-3.5 py-2.5 w-full text-sm mb-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium">
                            <option value="Istirahat/Toilet">1. Istirahat / Toilet</option>
                            <option value="Progress">2. Progress</option>
                            <option value="Lainnya">3. Lainnya</option>
                        </select>
                        <div id="skip-reason-detail-container">
                            <input type="text" id="skip-reason-detail" placeholder="Keterangan tambahan..." class="border border-slate-300 rounded-xl px-3.5 py-2.5 w-full text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium">
                        </div>
                    </div>
                </div>

                <div class="flex justify-end gap-3">
                    <button onclick="closeSkipModal()" class="border border-slate-300 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-50 transition">Batal</button>
                    <button onclick="confirmSkipAction()" class="bg-amber-600 hover:bg-amber-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition">Konfirmasi Skip</button>
                </div>
            </div>
        </div>
    `;

        document.getElementById('current-date').innerText = new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }

    document.addEventListener("DOMContentLoaded", () => {
        renderAppTemplate();
        updateAttendanceStats();

        if (localActiveSession) {
            activeSpotIndex = localActiveSession.spotIndex;
            activeStaffIndexInSpot = localActiveSession.staffPositionIndex;
            activeSessionStaff = localActiveSession.staff;
            
            const spotNames = ["Main Entrance", "CarPark / CP", "HomeGallery / HG"];
            document.getElementById('buddy-info-text').innerText = `Titik: ${spotNames[activeSpotIndex]} (Petugas #${activeStaffIndexInSpot + 1}) | Petugas: ${activeSessionStaff.name}`;
            document.getElementById('buddy-modal').classList.remove('hidden');
            
            secondsElapsed = Math.floor((Date.now() - localActiveSession.startTime) / 1000);
            if (secondsElapsed < 0) secondsElapsed = 0;
            
            if (timerInterval) clearInterval(timerInterval);
            timerInterval = setInterval(() => {
                secondsElapsed++;
                const mins = String(Math.floor(secondsElapsed / 60)).padStart(2, '0');
                const secs = String(secondsElapsed % 60).padStart(2, '0');
                document.getElementById('timer-display').innerText = `${mins}:${secs}`;
            }, 1000);

            initBuddyMapWithLayout();
        }

        db.ref('appState').on('value', (snapshot) => {
            const val = snapshot.val();
            if (val) {
                if (val.currentSpots) currentSpots = val.currentSpots;
                if (val.activeQueue) activeQueue = val.activeQueue;
                if (val.shiftMorningQueue) shiftMorningQueue = val.shiftMorningQueue;
                if (val.shiftAfternoonQueue) shiftAfternoonQueue = val.shiftAfternoonQueue;
                if (val.spotShiftOrigin) spotShiftOrigin = val.spotShiftOrigin;
                if (val.spotStandbyEndTimes) spotStandbyEndTimes = val.spotStandbyEndTimes;
                if (val.activityLogs) activityLogs = val.activityLogs;
                
                updateDisplay();
                updateAttendanceStats();
                renderLogs();
            }
        });
    });

    function pushStateToFirebase() {
        db.ref('appState').set({
            currentSpots: currentSpots,
            activeQueue: activeQueue,
            shiftMorningQueue: shiftMorningQueue,
            shiftAfternoonQueue: shiftAfternoonQueue,
            spotShiftOrigin: spotShiftOrigin,
            spotStandbyEndTimes: spotStandbyEndTimes,
            activityLogs: activityLogs
        });
    }

    setInterval(() => {
        if (isAfternoonCutOffTime()) {
            shiftAfternoonQueue = [];
            shiftMorningQueue = [];
            activeQueue = [];
            let stateChanged = false;
            for(let s=0; s<3; s++) {
                for(let p=0; p<currentSpots[s].length; p++) {
                    if(currentSpots[s][p] !== null) stateChanged = true;
                    currentSpots[s][p] = null;
                    spotStandbyEndTimes[s][p] = null;
                }
            }
            if(stateChanged) {
                pushStateToFirebase();
                updateDisplay();
                updateAttendanceStats();
            }
            return;
        }

        const currentTime = Date.now();
        const limitSpot1 = getMaxTitik1Slots();

        let stateUpdated = false;
        for (let s = 0; s < 3; s++) {
            const maxP = s === 0 ? limitSpot1 : 2;
            for (let p = 0; p < maxP; p++) {
                const staff = currentSpots[s][p];
                const endTime = spotStandbyEndTimes[s][p];

                if (staff && endTime && currentTime >= endTime) {
                    autoRotateStandbyGreeter(s, p);
                    stateUpdated = true;
                }
            }
        }

        if (!stateUpdated) {
            updateGreeterStandbyTimersUI();
        }
    }, 1000);

    function startStandbyTimer(spotIndex, staffPositionIndex) {
        if (isAfternoonCutOffTime()) return;
        const staff = currentSpots[spotIndex][staffPositionIndex];
        if (!staff) return;

        const THIRTY_MINUTES_MS = 30 * 60 * 1000;
        spotStandbyEndTimes[spotIndex][staffPositionIndex] = Date.now() + THIRTY_MINUTES_MS;

        pushStateToFirebase();
        updateDisplay();
    }

    function autoRotateStandbyGreeter(spotIndex, staffPositionIndex) {
        if (isAfternoonCutOffTime()) return;

        const staff = currentSpots[spotIndex][staffPositionIndex];
        if (!staff) return;

        const spotNames = ["Main Entrance", "CarPark / CP", "HomeGallery / HG"];
        const timeNow = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

        const logData = {
            date: new Date().toISOString().split('T')[0],
            time: timeNow,
            staffName: staff.name,
            spot: spotNames[spotIndex],
            shift: "TIMEOUT",
            duration: "30m (STANDBY TIMEOUT)",
            reason: "AUTO-TIMEOUT: Durasi Standby 30 menit habis",
            photo: "Tanpa Foto",
            gps: "-"
        };

        activityLogs.unshift(logData);
        syncLogToSpreadsheet(logData);

        if (activeQueue.length > 0) {
            const nextInQueue = activeQueue.shift();
            currentSpots[spotIndex][staffPositionIndex] = nextInQueue;
            const isMorningStaff = shiftMorningQueue.some(emp => emp.nik === nextInQueue.nik);
            spotShiftOrigin[spotIndex][staffPositionIndex] = isMorningStaff ? 'pagi' : 'siang';
            triggerNextGreeterNotification(nextInQueue.name, spotNames[spotIndex]);
            spotStandbyEndTimes[spotIndex][staffPositionIndex] = null;
        } else {
            currentSpots[spotIndex][staffPositionIndex] = null;
            spotStandbyEndTimes[spotIndex][staffPositionIndex] = null;
        }
        activeQueue.push(staff);

        pushStateToFirebase();
        updateDisplay();
        renderLogs();
    }

    function updateGreeterStandbyTimersUI() {
        const limitSpot1 = getMaxTitik1Slots();
        const currentTime = Date.now();

        for (let s = 0; s < 3; s++) {
            const maxP = s === 0 ? limitSpot1 : 2;
            for (let p = 0; p < maxP; p++) {
                const endTime = spotStandbyEndTimes[s][p];
                const timerSpan = document.getElementById(`greeter-timer-${s}-${p}`);
                if (timerSpan) {
                    if (endTime) {
                        let diffMs = endTime - currentTime;
                        if (diffMs < 0) diffMs = 0;
                        const totalSec = Math.floor(diffMs / 1000);
                        const mins = String(Math.floor(totalSec / 60)).padStart(2, '0');
                        const secs = String(totalSec % 60).padStart(2, '0');
                        timerSpan.innerText = `⏳ ${mins}:${secs}`;
                        timerSpan.className = "text-[11px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-1 rounded-md";
                    } else {
                        timerSpan.innerText = `⏳ Standby Nonaktif`;
                        timerSpan.className = "text-[11px] font-mono text-slate-400 bg-slate-100 px-2 py-1 rounded-md";
                    }
                }
            }
        }
    }

    function triggerNextGreeterNotification(staffName, spotName) {
        if (isAfternoonCutOffTime()) return;
        const modal = document.getElementById('notification-modal');
        const msg = document.getElementById('notification-message');
        if (modal && msg) {
            msg.innerText = `Petugas ${staffName} dipersilakan naik ke ${spotName}!`;
            modal.classList.remove('hidden');

            if ("vibrate" in navigator) {
                try { navigator.vibrate([300, 150, 300]); } catch (e) {}
            }

            try {
                const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(800, audioCtx.currentTime);
                gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start();
                osc.stop(audioCtx.currentTime + 0.3);
            } catch (e) {}
        }
    }

    function closeNotificationModal() {
        const modal = document.getElementById('notification-modal');
        if (modal) modal.classList.add('hidden');
    }

    function handleModalBackdropClick(event) {
        if (event.target.id === 'notification-modal') {
            closeNotificationModal();
        }
    }

    function showCustomAlert(title, message) {
        const modal = document.getElementById('custom-alert-modal');
        const tEl = document.getElementById('custom-alert-title');
        const mEl = document.getElementById('custom-alert-message');
        if (modal && tEl && mEl) {
            tEl.innerText = title;
            mEl.innerText = message;
            modal.classList.remove('hidden');
        }
    }

    function closeCustomAlert() {
        const modal = document.getElementById('custom-alert-modal');
        if (modal) modal.classList.add('hidden');
    }

    function openLiveMapPinModal() {
        document.getElementById('live-map-pin-input').value = '';
        document.getElementById('live-map-pin-error').classList.add('hidden');
        document.getElementById('live-map-pin-modal').classList.remove('hidden');
    }

    function closeLiveMapPinModal() {
        document.getElementById('live-map-pin-modal').classList.add('hidden');
    }

    function verifyLiveMapPin() {
        const pinVal = document.getElementById('live-map-pin-input').value;
        if (pinVal === '15032024') {
            closeLiveMapPinModal();
            document.getElementById('live-map-modal').classList.remove('hidden');
            initLiveStoreMap();
        } else {
            document.getElementById('live-map-pin-error').classList.remove('hidden');
        }
    }

    function closeLiveMapModal() {
        document.getElementById('live-map-modal').classList.add('hidden');
    }

    function initLiveStoreMap() {
        setTimeout(() => {
            const bounds = [[0, 0], [1000, 1414]];
            if (!liveStoreMap) {
                liveStoreMap = L.map('live-store-map', {
                    crs: L.CRS.Simple,
                    minZoom: -2,
                    maxZoom: 3
                });
                L.imageOverlay('layout-informa.jpg', bounds).addTo(liveStoreMap);
                liveStoreMap.fitBounds(bounds);
            } else {
                liveStoreMap.invalidateSize();
            }

            liveMarkers.forEach(m => liveStoreMap.removeLayer(m));
            liveMarkers = [];

            const spotCoordinates = [
                { name: "Main Entrance", coords: [200, 500] },
                { name: "CarPark / CP", coords: [500, 200] },
                { name: "HomeGallery / HG", coords: [700, 800] }
            ];

            currentSpots.forEach((spotGroup, sIndex) => {
                spotGroup.forEach((staff, pIndex) => {
                    if (staff) {
                        const baseCoord = spotCoordinates[sIndex] ? spotCoordinates[sIndex].coords : [500, 500];
                        const offsetCoord = [baseCoord[0] + (pIndex * 40), baseCoord[1]];
                        
                        const marker = L.marker(offsetCoord).addTo(liveStoreMap)
                            .bindPopup(`<b>Titik ${sIndex + 1} (${["Main Entrance", "CarPark / CP", "HomeGallery / HG"][sIndex]})</b><br>Petugas: ${staff.name} (NIK: ${staff.nik})`);
                        liveMarkers.push(marker);
                    }
                });
            });
        }, 300);
    }

    function openSmtModal() {
        const modal = document.getElementById('smt-modal');
        if (modal) {
            modal.classList.remove('hidden');
            document.getElementById('pin-input').value = '';
            document.getElementById('pin-error').classList.add('hidden');
            document.getElementById('pin-section').classList.remove('hidden');
            document.getElementById('smt-selection-section').classList.add('hidden');
            
            const mode = document.querySelector('input[name="shift-mode"]:checked').value;
            if(mode === 'pagi') selectedStaffQueue = [...shiftMorningQueue];
            else selectedStaffQueue = [...shiftAfternoonQueue];
            
            updateSelectedPreview();
        }
    }

    function closeSmtModal() { 
        const modal = document.getElementById('smt-modal');
        if (modal) modal.classList.add('hidden'); 
    }

    function verifyPin() {
        const pinVal = document.getElementById('pin-input').value;
        if (pinVal === '15032024') {
            document.getElementById('pin-section').classList.add('hidden');
            document.getElementById('smt-selection-section').classList.remove('hidden');
            renderEmployeeList(employees);
        } else {
            document.getElementById('pin-error').classList.remove('hidden');
        }
    }

    function toggleShiftMode() {
        const mode = document.querySelector('input[name="shift-mode"]:checked').value;
        const label = document.getElementById('shift-active-label');
        const desc = document.getElementById('shift-mode-desc');
        
        if(mode === 'pagi') {
            label.innerText = 'Shift Pagi';
            desc.innerText = 'Input Shift Pagi: Petugas baru ditambahkan berurutan.';
            selectedStaffQueue = [...shiftMorningQueue];
        } else {
            label.innerText = 'Shift Siang';
            desc.innerText = 'Input Shift Siang: Ditambahkan menyambung di antrean berikutnya.';
            selectedStaffQueue = [...shiftAfternoonQueue];
        }
        renderEmployeeList(employees.filter(e => e.name.toLowerCase().includes(document.getElementById('search-employee').value.toLowerCase()) || e.nik.includes(document.getElementById('search-employee').value)));
        updateSelectedPreview();
    }

    function openReportModal() {
        const modal = document.getElementById('report-modal');
        if (modal) {
            modal.classList.remove('hidden');
            document.getElementById('report-pin-input').value = '';
            document.getElementById('report-pin-error').classList.add('hidden');
            document.getElementById('report-pin-section').classList.remove('hidden');
            document.getElementById('report-content-section').classList.add('hidden');
        }
    }

    function closeReportModal() { 
        const modal = document.getElementById('report-modal');
        if (modal) modal.classList.add('hidden'); 
    }

    function verifyReportPin() {
        if (document.getElementById('report-pin-input').value === '15032024') {
            document.getElementById('report-pin-section').classList.add('hidden');
            document.getElementById('report-content-section').classList.remove('hidden');
        } else {
            document.getElementById('report-pin-error').classList.remove('hidden');
        }
    }

    function renderEmployeeList(list) {
        const container = document.getElementById('employee-list-container');
        if (!container) return;
        container.innerHTML = '';

        const mode = document.querySelector('input[name="shift-mode"]:checked').value;

        list.forEach(emp => {
            const isAlreadyInOtherShift = (mode === 'pagi' ? shiftAfternoonQueue : shiftMorningQueue).some(s => s.nik === emp.nik);
            if (isAlreadyInOtherShift) return;

            const idx = selectedStaffQueue.findIndex(s => s.nik === emp.nik);
            const isSelected = idx > -1;
            
            const div = document.createElement('div');
            div.className = `flex justify-between items-center p-2.5 rounded-xl cursor-pointer text-xs md:text-sm transition ${isSelected ? 'bg-blue-100 font-bold text-blue-950 border border-blue-200' : 'hover:bg-white bg-white/60 border border-slate-200/60'}`;
            div.innerHTML = `<span><strong class="font-mono">${emp.nik}</strong> - ${emp.name}</span> <span class="text-xs font-semibold">${isSelected ? 'Urutan ke-' + (idx+1) : '+ Pilih'}</span>`;
            div.onclick = () => toggleSelectEmployee(emp);
            container.appendChild(div);
        });
    }

    function filterEmployee() {
        const kw = document.getElementById('search-employee').value.toLowerCase();
        renderEmployeeList(employees.filter(e => e.name.toLowerCase().includes(kw) || e.nik.includes(kw)));
    }

    function toggleSelectEmployee(emp) {
        const idx = selectedStaffQueue.findIndex(s => s.nik === emp.nik);
        if (idx > -1) {
            selectedStaffQueue.splice(idx, 1);
        } else {
            selectedStaffQueue.push(emp);
        }
        renderEmployeeList(employees.filter(e => e.name.toLowerCase().includes(document.getElementById('search-employee').value.toLowerCase()) || e.nik.includes(document.getElementById('search-employee').value)));
        updateSelectedPreview();
    }

    function updateSelectedPreview() {
        const preview = document.getElementById('selected-preview');
        const countEl = document.getElementById('selected-count');
        if (!preview || !countEl) return;
        countEl.innerText = selectedStaffQueue.length;
        preview.innerHTML = '';
        selectedStaffQueue.forEach((s, idx) => {
            const tag = document.createElement('div');
            tag.className = 'bg-blue-50 border border-blue-200 text-blue-900 text-xs px-3 py-1.5 rounded-xl font-semibold flex items-center gap-1.5 shadow-2xs';
            tag.innerHTML = `<span>${idx+1}. ${s.name}</span>`;
            preview.appendChild(tag);
        });
    }

    function saveSmtList() {
        if (isAfternoonCutOffTime()) {
            closeSmtModal();
            showCustomAlert("Waktu Cut-Off Tercapai", "Pukul 22.00 WIB telah tercapai. Penambahan SMT dan rotasi dihentikan.");
            return;
        }

        const mode = document.querySelector('input[name="shift-mode"]:checked').value;
        if(mode === 'pagi') {
            shiftMorningQueue = [...selectedStaffQueue];
        } else {
            shiftAfternoonQueue = [...selectedStaffQueue];
        }
        
        activeQueue = [...shiftMorningQueue, ...shiftAfternoonQueue];

        const limitSpot1 = getMaxTitik1Slots();
        let needsPopulation = false;
        for(let s=0; s<3; s++) {
            const maxP = s === 0 ? limitSpot1 : 2;
            for(let p=0; p<maxP; p++) {
                if(!currentSpots[s][p]) needsPopulation = true;
            }
        }

        if (needsPopulation) {
            let qIndex = 0;
            for(let s=0; s<3; s++) {
                const maxP = s === 0 ? limitSpot1 : 2;
                for(let p=0; p<maxP; p++) {
                    if(!currentSpots[s][p] && activeQueue[qIndex]) {
                        currentSpots[s][p] = activeQueue[qIndex];
                        const isMorningStaff = shiftMorningQueue.some(emp => emp.nik === activeQueue[qIndex].nik);
                        spotShiftOrigin[s][p] = isMorningStaff ? 'pagi' : 'siang';
                        spotStandbyEndTimes[s][p] = null;
                        qIndex++;
                    }
                }
            }
            activeQueue.splice(0, qIndex);
        }
        
        pushStateToFirebase();
        updateDisplay();
        updateAttendanceStats();
        closeSmtModal();
        showCustomAlert("Berhasil", `Data SMT Shift ${mode.toUpperCase()} berhasil disimpan dan langsung digabungkan ke dalam antrean.`);
    }

    function updateAttendanceStats() {
        const uniqueNik = new Set([...shiftMorningQueue.map(s => s.nik), ...shiftAfternoonQueue.map(s => s.nik), ...activeQueue.map(s => s.nik)]);
        for(let s=0; s<3; s++) {
            currentSpots[s].forEach(staff => { if(staff) uniqueNik.add(staff.nik); });
        }
        const present = uniqueNik.size;
        const off = employees.length - present;
        const pEl = document.getElementById('stat-present');
        const oEl = document.getElementById('stat-off');
        if (pEl) pEl.innerText = present;
        if (oEl) oEl.innerText = off >= 0 ? off : employees.length;
    }

    function updateDisplay() {
        if (isAfternoonCutOffTime()) {
            for(let s=0; s<3; s++) {
                for(let p=0; p<currentSpots[s].length; p++) {
                    currentSpots[s][p] = null;
                    spotStandbyEndTimes[s][p] = null;
                }
            }
        }

        const limitSpot1 = getMaxTitik1Slots();
        const el0 = document.getElementById('spot-0');
        const btnContainer0 = document.getElementById('spot-0-buttons');
        const standbyContainer0 = document.getElementById('spot-0-standby-buttons');
        const skipContainer0 = document.getElementById('spot-0-skip-buttons');
        if (!el0) return;
        
        let html0 = '';
        let btnHtml0 = '';
        let standbyHtml0 = '';
        let skipHtml0 = '';
        
        for(let i=0; i<limitSpot1; i++) {
            let staff = currentSpots[0][i];
            if(staff) {
                html0 += `<div class="bg-white p-2 rounded-xl border border-slate-200 shadow-2xs flex justify-between items-center"><div><strong class="text-slate-900 text-xs block">${i+1}. ${staff.name}</strong><span class="text-[10px] font-mono text-slate-400">NIK: ${staff.nik}</span></div><span id="greeter-timer-0-${i}" class="text-[11px] font-mono text-slate-400 bg-slate-100 px-2 py-1 rounded-md">⏳ Standby Nonaktif</span></div>`;
                btnHtml0 += `<button onclick="startBuddySession(0, ${i})" class="bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] py-1.5 px-0.5 rounded-lg font-semibold transition shadow-xs">Mulai (${i+1})</button>`;
                standbyHtml0 += `<button onclick="startStandbyTimer(0, ${i})" class="bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] py-1 px-0.5 rounded-lg font-semibold transition shadow-xs">⏱️ Standby (${i+1})</button>`;
                skipHtml0 += `<button onclick="openSkipModal(0, ${i})" class="bg-amber-600 hover:bg-amber-700 text-white text-[10px] py-1 px-0.5 rounded-lg font-semibold transition shadow-xs">⏭️ Skip (${i+1})</button>`;
            } else {
                btnHtml0 += `<span></span>`;
                standbyHtml0 += `<span></span>`;
                skipHtml0 += `<span></span>`;
            }
        }
        if(!currentSpots[0].some(s => s !== null)) {
            html0 = `<p class="text-sm text-slate-400 italic">${isAfternoonCutOffTime() ? 'Selesai (Cut-off Jam 22:00 WIB)' : 'Belum ada petugas'}</p>`;
        }
        el0.innerHTML = html0;
        btnContainer0.innerHTML = btnHtml0;
        btnContainer0.className = `grid grid-cols-${limitSpot1} gap-1`;
        standbyContainer0.innerHTML = standbyHtml0;
        standbyContainer0.className = `grid grid-cols-${limitSpot1} gap-1`;
        skipContainer0.innerHTML = skipHtml0;
        skipContainer0.className = `grid grid-cols-${limitSpot1} gap-1`;

        for (let i = 1; i < 3; i++) {
            const el = document.getElementById(`spot-${i}`);
            const btnContainer = document.getElementById(`spot-${i}-buttons-mulai`);
            const standbyContainer = document.getElementById(`spot-${i}-buttons-standby`);
            const skipContainer = document.getElementById(`spot-${i}-buttons-skip`);
            
            let staff1 = currentSpots[i][0];
            let staff2 = currentSpots[i][1];
            
            let htmlStr = '';
            let btnHtml = '';
            let standbyHtml = '';
            let skipHtml = '';

            if (staff1) {
                htmlStr += `<div class="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs flex justify-between items-center"><div><strong class="text-slate-900 text-xs block">1. ${staff1.name}</strong><span class="text-[11px] font-mono text-slate-400">NIK: ${staff1.nik}</span></div><span id="greeter-timer-${i}-0" class="text-[11px] font-mono text-slate-400 bg-slate-100 px-2 py-1 rounded-md">⏳ Standby Nonaktif</span></div>`;
                btnHtml += `<button onclick="startBuddySession(${i}, 0)" class="bg-emerald-600 hover:bg-emerald-700 text-white text-xs py-2 px-1 rounded-lg font-semibold transition shadow-xs">Mulai (1)</button>`;
                standbyHtml += `<button onclick="startStandbyTimer(${i}, 0)" class="bg-indigo-600 hover:bg-indigo-700 text-white text-xs py-1.5 px-1 rounded-lg font-semibold transition shadow-xs">⏱️ Standby (1)</button>`;
                skipHtml += `<button onclick="openSkipModal(${i}, 0)" class="bg-amber-600 hover:bg-amber-700 text-white text-xs py-1.5 px-1 rounded-lg font-semibold transition shadow-xs">⏭️ Skip (1)</button>`;
            } else {
                btnHtml += `<span></span>`;
                standbyHtml += `<span></span>`;
                skipHtml += `<span></span>`;
            }
            
            if (staff2) {
                htmlStr += `<div class="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs mt-1.5 flex justify-between items-center"><div><strong class="text-slate-900 text-xs block">2. ${staff2.name}</strong><span class="text-[11px] font-mono text-slate-400">NIK: ${staff2.nik}</span></div><span id="greeter-timer-${i}-1" class="text-[11px] font-mono text-slate-400 bg-slate-100 px-2 py-1 rounded-md">⏳ Standby Nonaktif</span></div>`;
                btnHtml += `<button onclick="startBuddySession(${i}, 1)" class="bg-emerald-600 hover:bg-emerald-700 text-white text-xs py-2 px-1 rounded-lg font-semibold transition shadow-xs">Mulai (2)</button>`;
                standbyHtml += `<button onclick="startStandbyTimer(${i}, 1)" class="bg-indigo-600 hover:bg-indigo-700 text-white text-xs py-1.5 px-1 rounded-lg font-semibold transition shadow-xs">⏱️ Standby (2)</button>`;
                skipHtml += `<button onclick="openSkipModal(${i}, 1)" class="bg-amber-600 hover:bg-amber-700 text-white text-xs py-1.5 px-1 rounded-lg font-semibold transition shadow-xs">⏭️ Skip (2)</button>`;
            } else {
                btnHtml += `<span></span>`;
                standbyHtml += `<span></span>`;
                skipHtml += `<span></span>`;
            }
            
            if(!staff1 && !staff2) {
                htmlStr = `<p class="text-sm text-slate-400 italic">${isAfternoonCutOffTime() ? 'Selesai (Cut-off Jam 22:00 WIB)' : 'Belum ada petugas'}</p>`;
            }
            if (el) el.innerHTML = htmlStr;
            if (btnContainer) btnContainer.innerHTML = btnHtml;
            if (standbyContainer) standbyContainer.innerHTML = standbyHtml;
            if (skipContainer) skipContainer.innerHTML = skipHtml;
        }
        
        const qContainer = document.getElementById('queue-display');
        if (qContainer) {
            qContainer.innerHTML = '';
            if (activeQueue.length > 0) {
                activeQueue.forEach((r, idx) => {
                    const row = document.createElement('div');
                    row.className = 'flex items-center justify-between bg-white px-3.5 py-2.5 rounded-xl border border-slate-200/80 shadow-2xs';
                    row.innerHTML = `<span class="font-semibold text-slate-800 text-xs md:text-sm"><span class="text-blue-600 font-bold mr-2">${idx + 1}.</span>${r.name}</span><span class="text-xs text-slate-400 font-mono">NIK: ${r.nik}</span>`;
                    qContainer.appendChild(row);
                });
            } else {
                qContainer.innerHTML = `<div class="bg-white p-3 rounded-xl border border-slate-200 text-center"><span class="text-slate-400 italic text-xs">${isAfternoonCutOffTime() ? 'Selesai (Cut-off Jam 22:00 WIB)' : 'Tidak ada antrean cadangan'}</span></div>`;
            }
        }
        updateGreeterStandbyTimersUI();
    }

    function requestRotateVolleyball() {
        if (isAfternoonCutOffTime()) {
            showCustomAlert('Waktu Cut-Off', 'Pukul 22.00 WIB telah tercapai. Rotasi dihentikan.');
            return;
        }

        if (!currentSpots[0][0]) {
            showCustomAlert('Perhatian', 'Silakan input SMT terlebih dahulu.');
            return;
        }
        document.getElementById('rotasi-pin-input').value = '';
        document.getElementById('rotasi-pin-error').classList.add('hidden');
        document.getElementById('rotasi-step-pin').classList.remove('hidden');
        document.getElementById('rotasi-step-select').classList.add('hidden');
        document.getElementById('rotasi-pin-modal').classList.remove('hidden');
    }

    function closeRotasiPinModal() {
        document.getElementById('rotasi-pin-modal').classList.add('hidden');
    }

    function verifyRotasiPin() {
        if (document.getElementById('rotasi-pin-input').value === '15032024') {
            document.getElementById('rotasi-step-pin').classList.add('hidden');
            document.getElementById('rotasi-step-select').classList.remove('hidden');
            
            const selectEl = document.getElementById('rotasi-target-select');
            selectEl.innerHTML = '';
            
            if (activeQueue.length === 0) {
                selectEl.innerHTML = '<option value="">Tidak ada antrean cadangan</option>';
            } else {
                activeQueue.forEach((staff, idx) => {
                    const opt = document.createElement('option');
                    opt.value = idx;
                    opt.textContent = `${staff.name} (NIK: ${staff.nik})`;
                    selectEl.appendChild(opt);
                });
            }
        } else {
            document.getElementById('rotasi-pin-error').classList.remove('hidden');
        }
    }

    function executeManualRotation() {
        if (isAfternoonCutOffTime()) return;

        const selectEl = document.getElementById('rotasi-target-select');
        const chosenQueueIndex = parseInt(selectEl.value);

        if (isNaN(chosenQueueIndex) || activeQueue.length === 0) {
            closeRotasiPinModal();
            return;
        }

        const limitSpot1 = getMaxTitik1Slots();
        let allCurrentActive = [];
        for(let s=0; s<3; s++) {
            const maxP = s === 0 ? limitSpot1 : 2;
            for(let p=0; p<maxP; p++) {
                allCurrentActive.push({ spot: s, pos: p, staff: currentSpots[s][p], origin: spotShiftOrigin[s][p], standbyEnd: spotStandbyEndTimes[s][p] });
            }
        }
        
        let firstStaff = allCurrentActive[0].staff;

        for(let i=0; i<allCurrentActive.length - 1; i++) {
            currentSpots[allCurrentActive[i].spot][allCurrentActive[i].pos] = allCurrentActive[i+1].staff;
            spotShiftOrigin[allCurrentActive[i].spot][allCurrentActive[i].pos] = allCurrentActive[i+1].origin;
            spotStandbyEndTimes[allCurrentActive[i].spot][allCurrentActive[i].pos] = allCurrentActive[i+1].standbyEnd;
        }
        
        let lastItem = allCurrentActive[allCurrentActive.length - 1];
        const chosenStaff = activeQueue.splice(chosenQueueIndex, 1)[0];
        
        currentSpots[lastItem.spot][lastItem.pos] = chosenStaff;
        const isMorningStaff = shiftMorningQueue.some(emp => emp.nik === chosenStaff.nik);
        spotShiftOrigin[lastItem.spot][lastItem.pos] = isMorningStaff ? 'pagi' : 'siang';
        spotStandbyEndTimes[lastItem.spot][lastItem.pos] = null;
        
        if (chosenStaff) {
            triggerNextGreeterNotification(chosenStaff.name, ["Main Entrance", "CarPark / CP", "HomeGallery / HG"][lastItem.spot]);
        }
        
        activeQueue.push(firstStaff);

        pushStateToFirebase();
        updateDisplay();
        closeRotasiPinModal();
        showCustomAlert('Berhasil', 'Rotasi manual berhasil dieksekusi.');
    }

    function startBuddySession(spotIndex, staffPositionIndex) {
        if (isAfternoonCutOffTime()) {
            showCustomAlert('Waktu Cut-Off', 'Pukul 22.00 WIB telah tercapai. Sesi baru tidak dapat dimulai.');
            return;
        }

        activeSpotIndex = spotIndex;
        activeStaffIndexInSpot = staffPositionIndex;
        const staff = currentSpots[spotIndex][staffPositionIndex];
        activeSessionStaff = staff;

        spotStandbyEndTimes[spotIndex][staffPositionIndex] = null;

        localActiveSession = { spotIndex, staffPositionIndex, staff, startTime: Date.now() };
        localStorage.setItem('greeter_active_session', JSON.stringify(localActiveSession));

        previousStaffPositionBackup = { 
            spotIndex, 
            staffPositionIndex, 
            staff,
            activeQueueSnapshot: [...activeQueue],
            currentSpotsSnapshot: JSON.parse(JSON.stringify(currentSpots)),
            spotStandbyEndTimesSnapshot: JSON.parse(JSON.stringify(spotStandbyEndTimes))
        };

        const spotNames = ["Main Entrance", "CarPark / CP", "HomeGallery / HG"];
        document.getElementById('buddy-info-text').innerText = `Titik: ${spotNames[spotIndex]} (Petugas #${staffPositionIndex + 1}) | Petugas: ${staff.name}`;
        document.getElementById('buddy-modal').classList.remove('hidden');
        
        secondsElapsed = 0;
        document.getElementById('timer-display').innerText = "00:00";
        if (timerInterval) clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            secondsElapsed++;
            const mins = String(Math.floor(secondsElapsed / 60)).padStart(2, '0');
            const secs = String(secondsElapsed % 60).padStart(2, '0');
            document.getElementById('timer-display').innerText = `${mins}:${secs}`;
        }, 1000);

        initBuddyMapWithLayout();

        if (activeQueue.length > 0) {
            const nextInQueue = activeQueue.shift();
            currentSpots[spotIndex][staffPositionIndex] = nextInQueue;
            const isMorningStaff = shiftMorningQueue.some(emp => emp.nik === nextInQueue.nik);
            spotShiftOrigin[spotIndex][staffPositionIndex] = isMorningStaff ? 'pagi' : 'siang';
            spotStandbyEndTimes[spotIndex][staffPositionIndex] = null;
            triggerNextGreeterNotification(nextInQueue.name, spotNames[spotIndex]);
        } else {
            currentSpots[spotIndex][staffPositionIndex] = null;
            spotStandbyEndTimes[spotIndex][staffPositionIndex] = null;
        }
        
        activeQueue.push(staff);

        pushStateToFirebase();
        updateDisplay();
    }

    function initBuddyMapWithLayout() {
        setTimeout(() => {
            if (!currentMap) {
                const bounds = [[0, 0], [1000, 1414]];
                currentMap = L.map('buddy-map', {
                    crs: L.CRS.Simple,
                    minZoom: -2,
                    maxZoom: 3
                });
                L.imageOverlay('layout-informa.jpg', bounds).addTo(currentMap);
                currentMap.fitBounds(bounds);
                
                currentMarker = L.marker([500, 707]).addTo(currentMap).bindPopup("Lokasi Standby SMT").openPopup();
            } else {
                currentMap.invalidateSize();
            }
            
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        staffLatitude = position.coords.latitude;
                        staffLongitude = position.coords.longitude;
                        document.getElementById('coord-text').innerText = `Denah Aktif: Informa LW Kotwis | GPS: ${staffLatitude.toFixed(5)}, ${staffLongitude.toFixed(5)}`;
                    },
                    (error) => {
                        document.getElementById('coord-text').innerText = "Denah Aktif: Informa LW Kotwis (Area Toko Utama)";
                    },
                    { enableHighAccuracy: true }
                );
            }
        }, 300);
    }

    function openCancelReasonModal() {
        document.getElementById('cancel-reason-modal').classList.remove('hidden');
    }

    function closeCancelReasonModal() {
        document.getElementById('cancel-reason-modal').classList.add('hidden');
    }

    function confirmCancelBuddySession() {
        clearInterval(timerInterval);

        localStorage.removeItem('greeter_active_session');
        localActiveSession = null;

        closeCancelReasonModal();

        const selectedCancelOption = document.querySelector('input[name="cancel-option"]:checked').value;

        if (previousStaffPositionBackup) {
            const currentSpotStaff = currentSpots[previousStaffPositionBackup.spotIndex][previousStaffPositionBackup.staffPositionIndex];
            
            currentSpots = previousStaffPositionBackup.currentSpotsSnapshot;
            activeQueue = previousStaffPositionBackup.activeQueueSnapshot;
            spotStandbyEndTimes = previousStaffPositionBackup.spotStandbyEndTimesSnapshot;

            if (currentSpotStaff && currentSpotStaff.nik !== previousStaffPositionBackup.staff.nik) {
                activeQueue = activeQueue.filter(s => s.nik !== currentSpotStaff.nik);
                activeQueue.unshift(currentSpotStaff);
            }

            const spotNames = ["Main Entrance", "CarPark / CP", "HomeGallery / HG"];
            const staff = previousStaffPositionBackup.staff;
            const timeNow = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

            const logData = {
                date: new Date().toISOString().split('T')[0],
                time: timeNow,
                staffName: staff.name,
                spot: spotNames[previousStaffPositionBackup.spotIndex],
                shift: "CANCEL",
                duration: "00:00 (CANCEL)",
                reason: `CANCEL SESI: ${selectedCancelOption}`,
                photo: "Tanpa Foto",
                gps: "-"
            };

            activityLogs.unshift(logData);
            syncLogToSpreadsheet(logData);
        }

        pushStateToFirebase();
        updateDisplay();
        renderLogs();
        document.getElementById('buddy-modal').classList.add('hidden');
        showCustomAlert('Sesi Dibatalkan', `Sesi dibatalkan (${selectedCancelOption}). Petugas asal kembali ke titik.`);
    }

    function toggleReasonInput() {
        const cat = document.getElementById('reason-category').value;
        const cont = document.getElementById('reason-value-container');
        if (cat === 'Transaksi' || cat === 'Pending') {
            cont.innerHTML = `<input type="text" id="reason-value-input" onkeyup="formatRupiahInput(this)" placeholder="Masukkan nilai (Value)..." class="border border-slate-300 rounded-xl px-3.5 py-2.5 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium">`;
            if (cat === 'Pending') {
                cont.innerHTML += `<input type="text" id="reason-detail-input" placeholder="Masukkan alasan pending..." class="border border-slate-300 rounded-xl px-3.5 py-2.5 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium mt-2">`;
            }
        } else {
            cont.innerHTML = `<input type="text" id="reason-detail-input" placeholder="Masukkan keterangan..." class="border border-slate-300 rounded-xl px-3.5 py-2.5 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium">`;
        }
    }

    function finishBuddySession() {
        clearInterval(timerInterval);

        localStorage.removeItem('greeter_active_session');
        localActiveSession = null;

        const staff = activeSessionStaff;
        const spotNames = ["Main Entrance", "CarPark / CP", "HomeGallery / HG"];
        const duration = document.getElementById('timer-display').innerText;
        const category = document.getElementById('reason-category').value;
        
        let detailVal = document.getElementById('reason-value-input') ? document.getElementById('reason-value-input').value : '0';
        let detailText = document.getElementById('reason-detail-input') ? document.getElementById('reason-detail-input').value : '';
        
        let fullReason = `${category}: Value=${detailVal}`;
        if (category === 'Pending' && detailText) {
            fullReason += ` | Alasan=${detailText}`;
        } else if (category === 'Lain' && detailText) {
            fullReason = `Lain-lain: ${detailText}`;
        }

        const hasPhoto = document.getElementById('buddy-photo').files.length > 0 ? "Ada Foto" : "Tanpa Foto";
        const gpsStr = staffLatitude ? `${staffLatitude.toFixed(5)}, ${staffLongitude.toFixed(5)}` : "Layout Kotwis";
        const timeNow = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

        const logData = {
            date: new Date().toISOString().split('T')[0],
            time: timeNow,
            staffName: staff.name,
            spot: spotNames[activeSpotIndex],
            shift: "AKTIF",
            duration: duration,
            reason: fullReason,
            photo: hasPhoto,
            gps: gpsStr
        };

        activityLogs.unshift(logData);
        syncLogToSpreadsheet(logData);
        pushStateToFirebase();

        renderLogs();
        document.getElementById('buddy-modal').classList.add('hidden');
        showCustomAlert('Laporan Tersimpan', `Laporan sesi buddy ${staff.name} berhasil disimpan.`);
    }

    function openSkipModal(spotIndex, staffPositionIndex) {
        if (isAfternoonCutOffTime()) {
            showCustomAlert('Waktu Cut-Off', 'Pukul 22.00 WIB telah tercapai. Fitur skip dinonaktifkan.');
            return;
        }

        skipSpotIndex = spotIndex;
        skipStaffIndexInSpot = staffPositionIndex;
        const staff = currentSpots[spotIndex][staffPositionIndex];
        const spotNames = ["Main Entrance", "CarPark / CP", "HomeGallery / HG"];
        document.getElementById('skip-info-text').innerText = `Titik: ${spotNames[spotIndex]} (Petugas #${staffPositionIndex + 1}) | Petugas: ${staff.name}`;
        document.getElementById('skip-modal').classList.remove('hidden');
        document.getElementById('skip-reason-detail').value = '';
    }

    function closeSkipModal() {
        document.getElementById('skip-modal').classList.add('hidden');
    }

    function toggleSkipReasonInput() {
        const cont = document.getElementById('skip-reason-detail-container');
        cont.innerHTML = `<input type="text" id="skip-reason-detail" placeholder="Keterangan tambahan..." class="border border-slate-300 rounded-xl px-3.5 py-2.5 w-full text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium">`;
    }

    function confirmSkipAction() {
        if (isAfternoonCutOffTime()) return;

        const staff = currentSpots[skipSpotIndex][skipStaffIndexInSpot];
        const spotNames = ["Main Entrance", "CarPark / CP", "HomeGallery / HG"];
        const category = document.getElementById('skip-reason-category').value;
        const detail = document.getElementById('skip-reason-detail').value || '-';
        const timeNow = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

        const logData = {
            date: new Date().toISOString().split('T')[0],
            time: timeNow,
            staffName: staff.name,
            spot: spotNames[skipSpotIndex],
            shift: "SKIP",
            duration: "00:00 (SKIP)",
            reason: `SKIP [${category}]: ${detail}`,
            photo: "Tanpa Foto",
            gps: "-"
        };

        activityLogs.unshift(logData);
        syncLogToSpreadsheet(logData);

        renderLogs();
        closeSkipModal();

        spotStandbyEndTimes[skipSpotIndex][skipStaffIndexInSpot] = null;

        if (activeQueue.length > 0) {
            const nextInQueue = activeQueue.shift();
            currentSpots[skipSpotIndex][skipStaffIndexInSpot] = nextInQueue;
            const isMorningStaff = shiftMorningQueue.some(emp => emp.nik === nextInQueue.nik);
            spotShiftOrigin[skipSpotIndex][skipStaffIndexInSpot] = isMorningStaff ? 'pagi' : 'siang';
            spotStandbyEndTimes[skipSpotIndex][skipStaffIndexInSpot] = null;
            triggerNextGreeterNotification(nextInQueue.name, spotNames[skipSpotIndex]);
        } else {
            currentSpots[skipSpotIndex][skipStaffIndexInSpot] = null;
            spotStandbyEndTimes[skipSpotIndex][skipStaffIndexInSpot] = null;
        }
        activeQueue.push(staff);

        pushStateToFirebase();
        updateDisplay();
        showCustomAlert('Berhasil Skip', `Petugas ${staff.name} berhasil skip dan ditaruh ke antrean paling bawah.`);
    }

    function syncLogToSpreadsheet(log) {
        if (!SCRIPT_URL) return;
        const payload = {
            timestamp: `${log.date} ${log.time}`,
            nama: log.staffName,
            point: log.spot,
            status: `Durasi: ${log.duration} | ${log.reason} | GPS: ${log.gps} | Foto: ${log.photo}`
        };
        fetch(SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        }).catch(err => console.error("Gagal sync sheet:", err));
    }

    function renderLogs() {
        const tbody = document.getElementById('log-table-body');
        if (!tbody) return;
        if (activityLogs.length === 0) {
            tbody.innerHTML = `<tr><td colspan="7" class="p-6 text-center text-slate-400 italic">Belum ada aktivitas tercatat hari ini.</td></tr>`;
            return;
        }
        tbody.innerHTML = '';
        activityLogs.forEach(log => {
            const tr = document.createElement('tr');
            tr.className = 'hover:bg-slate-50/80 transition';
            tr.innerHTML = `
                <td class="p-3.5 font-mono text-xs">${log.time}</td>
                <td class="p-3.5 font-bold text-slate-900">${log.staffName}</td>
                <td class="p-3.5 font-medium">${log.spot}</td>
                <td class="p-3.5"><span class="bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-lg font-bold">${log.shift}</span></td>
                <td class="p-3.5 font-mono font-medium">${log.duration}</td>
                <td class="p-3.5">${log.reason}</td>
                <td class="p-3.5"><span class="bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-lg font-medium">${log.photo} | 📍 ${log.gps}</span></td>
            `;
            tbody.appendChild(tr);
        });
    }

    function getFilteredLogs() {
        const period = document.getElementById('report-period').value;
        const todayStr = new Date().toISOString().split('T')[0];
        if (period === 'daily') return activityLogs.filter(l => l.date === todayStr);
        else if (period === 'weekly') {
            const d = new Date();
            d.setDate(d.getDate() - 7);
            return activityLogs.filter(l => new Date(l.date) >= d);
        } else {
            return activityLogs.filter(l => l.date.startsWith(todayStr.substring(0, 7)));
        }
    }

    function exportExcel() {
        const filtered = getFilteredLogs();
        if (filtered.length === 0) {
            showCustomAlert('Perhatian', 'Tidak ada data rekap pada periode ini.');
            return;
        }
        const dataToExport = filtered.map((l, idx) => ({
            No: idx + 1, Tanggal: l.date, Waktu: l.time, Petugas: l.staffName, Titik: l.spot, Shift: l.shift, Durasi: l.duration, "Reason / Alasan": l.reason, GPS: l.gps, Foto: l.photo
        }));
        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Rekap Buddy");
        XLSX.writeFile(workbook, `Rekap_Buddy_${document.getElementById('report-period').value}.xlsx`);
        closeReportModal();
    }

    function sendWhatsApp() {
        const filtered = getFilteredLogs();
        const period = document.getElementById('report-period').value;
        if (filtered.length === 0) {
            showCustomAlert('Perhatian', 'Tidak ada data rekap untuk dikirim.');
            return;
        }
        let text = `📋 *REKAP SESI BUDDY & SMT* (${period.toUpperCase()})\n\n`;
        filtered.forEach((l, i) => {
            text += `${i+1}. [${l.date} ${l.time}] *${l.staffName}* di *${l.spot}*\n⏱️ Durasi: ${l.duration} | 📝 ${l.reason} | 📍 GPS: ${l.gps}\n\n`;
        });
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
        closeReportModal();
    }
    </script>
</body>
</html>
