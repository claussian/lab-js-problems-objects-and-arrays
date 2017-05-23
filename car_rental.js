// Customer Object
var Customer = function (customerInfo) {
  // ** your code here**
  this.id = customerInfo.id;
  this.name = customerInfo.name;
  this.carRented = null;
};

// Car Object
var Car = function (carInfo) {
  // ** your code here**
  this.id = carInfo.id;
  this.producer = carInfo.producer;
  this.model = carInfo.model;
  this.rentalPrice = carInfo.rentalPrice;
  this.available = true;
  this.customer = null;
  this.rentalDuration = 0;
  this.quotePrice = function () {
    return this.rentalDuration * this.rentalPrice;
  };
  this.reserve = function (customer, rentalDuration) {
    if (this.available === true) { // refers to Car constructor
      this.available = false;
      this.customer = customer; // customer is an object
      this.rentalDuration = rentalDuration;
      this.carRevenue.push(this.quotePrice());
      return true;
    }
    else {
      return false;
    }
  };
  this.returnCar = function () {
    if (this.available === true) {
      return "Sorry, this car have already been returned.";
    }
    else {
      this.available = true;
      this.customer = null;
      this.rentalDuration = null;
    }
  };
  this.carRevenue = [];
};

// Vendor Object
var Vendor = function(name) {
  this.name = name;
  this.cars = []; // this array contains ** objects **!
  this.customers = [];

  this.findCarIndex = function (carID) { // call the function Vendor.findCarIndex(carID);
    return this.cars.findIndex(function(car){ // Vendor's 'cars' array; 'car' refers to element
      return car.id === carID ? true : false ; // check which element.id === carID and return element index
    });
  };

  this.findCustomerIndex = function (customerID) { // call the function Vendor.findCustomerIndex(customerID);
    return this.customers.findIndex(function(customer){ // Vendor's 'customers' array; 'customer' refers to an element
      return customer.id === customerID ? true : false ; // check which element.id === customerID
    });
  };

  this.getCar = function (carID) {// call the function Vendor.getCar(carID);
    return this.cars.find(function(car){ // Vendor's 'cars' array; 'car' refers to element
      return car.id === carID ? true : false ; // check which element.id === carID and return element
    });
  };

  this.getCustomer = function (customerID) { // call the function Vendor.getCustomer(customerID);
    return this.customers.find(function(customer){ // Vendor's 'customers' array; 'customer' refers to an element
      return customer.id === customerID ? true : false ; // check which element.id === customerID and return element
    });
  };

  this.addCar = function (carObj) {
    if (this.getCar(carObj.id) !== undefined) { // return the actual car
      console.log("ID already exists");
    }
    else {
      this.cars.push(carObj);
      console.log("Car added to warehouse");
    }  
  }

  this.addCustomer = function (customerObj) {
    if (this.getCustomer(customerObj.id) !== undefined) {
      console.log("ID already exists");
    }
    else {
      this.customers.push(customerObj);
      console.log("Customer added to log");
    }
  }

  this.removeCar = function (carID) {
    var indexNew = this.findCarIndex(carID);
    if (indexNew >= 0) {
      this.cars.splice(indexNew);
      console.log("Car deleted");
    }
    else {
      console.log("Car not found");
    }
  }

  this.removeCustomer = function (customerID) {
    var indexNew = this.findCustomerIndex(customerID);
    if (indexNew >= 0) {
      this.customers.splice(indexNew);
      console.log("Customer deleted");
    }
    else {
      console.log("Customer not found");
    }
  }

  this.availableCars = function () {
    return this.cars.filter(function(car) {
      return car.available === true;
    });
  }

  this.rentCar = function (customerID, rentalDuration) {
    var carAvail = this.availableCars(); // new array of available cars
    if (carAvail.length == 0) {
      console.log("All our cars have been rented");
    }
    else {
      var currentCustomer = this.getCustomer(customerID); // find which customer in Vendor's customers log
      if (currentCustomer !== undefined) {
        currentCustomer.carRented = carAvail[0]; // get first available car object and assign it to carRented. Points back to this.cars
        carAvail[0].reserve(currentCustomer, rentalDuration);
        console.log("The car has been reserved");
      }
      else {
        console.log("Please provide a valid customerID")
      }
    }
  }

  this.returnCar = function (customerID) {
    var currentCustomer = this.getCustomer(customerID);
    if (currentCustomer !== undefined) {
      currentCustomer.carRented.returnCar();
      currentCustomer.carRented = null;
      console.log("Thank you for using our service");
    }
    else {
      console.log("Please provide a valid customerID");
    }
  }

  this.totalRevenue = function () {
    return this.cars.reduce(function(acc, currVal) {
      return acc + currVal.carRevenue.reduce(function(a,b) {
        return a + b;
      }, 0);
    }, 0);
  }
  // **your code here**
};


// Codes you can run to test your code
var customerInfoA = {
  id: "001",
  name: "Sherman"
};
var customerInfoB = {
  id: "002",
  name: "Sandy"
};
var customerInfoC = {
  id: "003",
  name: "Percy"
}
var customerA = new Customer(customerInfoA);
var customerB = new Customer(customerInfoB);
var customerC = new Customer(customerInfoC);

var carInfoA = {
  id: "001",
  producer: "Toyota",
  model: "Subra",
  rentalPrice: 200,
};

var carInfoB = {
  id: "002",
  producer: "Honda",
  model: "Accord",
  rentalPrice: 150,
};

var carInfoC = {
  id: "003",
  producer: "Lexus",
  model: "ES300",
  rentalPrice: 300
}



var carA = new Car(carInfoA);
var carB = new Car(carInfoB);
var carC = new Car(carInfoC);

var vendor = new Vendor('Jens Limited');
vendor.addCustomer(customerA);
vendor.addCustomer(customerB);
vendor.addCustomer(customerC);

console.log(vendor.availableCars());
vendor.addCar(carA);
vendor.addCar(carB);
vendor.addCar(carC);
console.log(vendor.availableCars());

vendor.rentCar(customerA.id, 5);

vendor.rentCar(customerB.id, 3);

vendor.rentCar(customerC.id, 2);