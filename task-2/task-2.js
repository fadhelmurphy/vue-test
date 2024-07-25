const calculateShippingCost = (destination, weight, priority) => {
    if (destination !== "domestic" && destination !== "international") {
      return "Invalid destination";
    }
  
    if (weight <= 0) {
      return "Invalid weight";
    }
  
    let baseCostPerKg;
    if (destination === "domestic") {
      switch (priority) {
        case "standard":
          baseCostPerKg = 5;
          break;
        case "express":
          baseCostPerKg = 10;
          break;
        case "priority":
          baseCostPerKg = 20;
          break;
        default:
          return "Invalid priority";
      }
    } else if (destination === "international") {
      switch (priority) {
        case "standard":
          baseCostPerKg = 15;
          break;
        case "express":
          baseCostPerKg = 25;
          break;
        case "priority":
          baseCostPerKg = 50;
          break;
        default:
          return "Invalid priority";
      }
    }
  
    let cost = baseCostPerKg * weight;
  
    if (destination === "domestic" && weight > 10) {
      cost += 10;
    } else if (destination === "international" && weight > 5) {
      cost += 50;
    }
  
    return cost;
  }
  
  // Test cases
  const testCases = [
    { destination: "local", weight: 5, priority: "standard" },  // Invalid destination
    { destination: "domestic", weight: -2, priority: "standard" },  // Invalid weight
    { destination: "domestic", weight: 5, priority: "standard" },  // Valid case: domestic, standard, 5kg
    { destination: "domestic", weight: 12, priority: "priority" },  // Valid case: domestic, priority, 12kg
    { destination: "international", weight: 4, priority: "express" },  // Valid case: international, express, 4kg
    { destination: "international", weight: 6, priority: "priority" },  // Valid case: international, priority, 6kg
    { destination: "domestic", weight: 5, priority: "fast" }  // Invalid priority
  ];
  
  // Run test cases
  testCases.forEach(testCase => {
    const { destination, weight, priority } = testCase;
    const result = calculateShippingCost(destination, weight, priority);
    console.log(`Destination: ${destination}, Weight: ${weight}, Priority: ${priority} => Result: ${result}`);
  });
  