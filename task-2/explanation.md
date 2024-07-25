## How to run
```
node task-2.js
```

Penjelasan
Parameter Input:

- destination: Tujuan pengiriman (bisa "domestic" atau "international").
- weight: Berat paket dalam kilogram.
- priority: Prioritas pengiriman (bisa "standard", "express", atau "priority").

Logika Fungsi:

Validasi:
- Fungsi pertama-tama memeriksa apakah destination adalah "domestic" atau "international". Jika tidak, fungsi mengembalikan "Invalid destination".
- Kemudian memeriksa apakah weight lebih dari 0. Jika tidak, fungsi mengembalikan "Invalid weight".
Perhitungan Biaya Dasar:
- Tergantung pada destination dan priority, fungsi menentukan biaya dasar per kilogram (baseCostPerKg).
- Jika priority tidak dikenali, fungsi mengembalikan "Invalid priority".
Biaya Tambahan:
- Untuk tujuan "domestic", biaya tambahan sebesar $10 ditambahkan jika beratnya melebihi 10 kg.
- Untuk tujuan "international", biaya tambahan sebesar $50 ditambahkan jika beratnya melebihi 5 kg.
- Output: Fungsi mengembalikan total biaya pengiriman.