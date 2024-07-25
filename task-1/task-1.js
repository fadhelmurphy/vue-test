const calculateTax = (income, age, dependents) => {
    if (typeof income !== "number" || income < 0) return "Invalid Income";
    if (typeof age !== "number" || age < 0) return "Invalid age";
    if (typeof dependents !== "number" || dependents < 0) return "Invalid dependents";
  
    // Rules: Tidak dikenakan pajak jika di bawah 18 tahun
    if (age < 18) return "Not eligible for tax";
  
    // Fungsi rekursif untuk menghitung pajak
    function calculate(income, age, dependents) {
      let taxRate;
      if (income <= 10000) {
        taxRate = 0.1;
      } else if (income <= 50000) {
        taxRate = 0.2;
      } else {
        taxRate = 0.3;
      }
  
      let tax = income * taxRate;
  
      // Terapkan diskon untuk manula
      if (age >= 65) {
        tax *= 0.8;
      }
  
      // Terapkan pengurangan untuk tanggungan
      let deduction = dependents * 500;
      tax = Math.max(tax - deduction, 0); // Pastikan pajak tidak negatif
  
      return tax;
    }
  
    // Panggil fungsi rekursif
    return calculate(income, age, dependents);
  }

  // Pendapatan tidak valid
console.log(calculateTax(-5000, 30, 1)); // Output: "Invalid income"

// Usia tidak valid
console.log(calculateTax(20000, -5, 1)); // Output: "Invalid age"

// Tanggungan tidak valid
console.log(calculateTax(20000, 30, -2)); // Output: "Invalid dependents"

  // Usia kurang dari 18 tahun
console.log(calculateTax(15000, 17, 1)); // Output: "Not eligible for tax"

// Usia 65 tahun atau lebih, pendapatan lebih dari $50.000
console.log(calculateTax(60000, 70, 3)); // Output: 12900

// Pendapatan kurang dari atau sama dengan $10.000
console.log(calculateTax(9000, 30, 1)); // Output: 400

// Pendapatan antara $10.001 dan $50.000
console.log(calculateTax(25000, 30, 2)); // Output: 4000

// Pendapatan lebih dari $50.000, tanpa tanggungan
console.log(calculateTax(55000, 30, 0)); // Output: 16500

// Pendapatan lebih dari $50.000, dengan tanggungan
console.log(calculateTax(55000, 30, 3)); // Output: 15000