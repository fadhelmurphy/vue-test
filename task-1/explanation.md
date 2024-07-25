## How to run
```
node task-1.js
```

## Explanation
Fungsi ini pertama-tama memeriksa apakah income, age, dan dependents valid. Jika ada yang tidak valid (nilai negatif atau bukan angka), maka fungsi akan mengembalikan pesan kesalahan yang sesuai.
Aturan Berdasarkan Usia:

Jika individu tersebut berusia di bawah 18 tahun, mereka tidak dikenakan pajak, dan fungsi ini akan mengembalikan "Tidak dikenakan pajak".
Perhitungan Pajak Rekursif (Fungsi calculate):

Fungsi calculate didefinisikan di dalam calculateTax dan digunakan untuk menghitung pajak secara rekursif.
Penentuan Tarif Pajak: Fungsi ini pertama-tama menentukan tarif pajak berdasarkan kisaran pendapatan:
10% untuk pendapatan ≤ $10.000
20% untuk pendapatan antara $10.001 dan $50.000
30% untuk pendapatan > $50.000
Diskon untuk Manula: Jika individu berusia 65 tahun atau lebih, mereka mendapatkan diskon 20% dari pajak yang dihitung.
Pengurangan untuk Tanggungan: Pajak dikurangi $500 untuk setiap tanggungan. Pajak tidak bisa negatif, jadi digunakan Math.max untuk memastikan pajak minimal adalah $0.