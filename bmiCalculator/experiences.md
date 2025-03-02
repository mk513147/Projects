# What I Learned?

## How to Set Up Disappearing Messages
```javascript
  // Add a red text class to indicate an error message
  results.classList.add('text-red-500');
  results.innerHTML = 'Please enter valid numeric values!!';

  // Use setTimeout to remove the message after 3 seconds
  setTimeout(() => {
    results.classList.remove("text-red-500"); // Remove the red text class
    results.innerHTML = ''; // Clear the message content
  }, 3000);
```

## The Find Method and How to Destructure an Object and Use It
```javascript
const categories = [
  {
    limit: 18.6, // If BMI is below 18.6, categorize as underweight
    message: `BMI: ${bmi} <br>Skinny! - EAT MORE 🕴!!`,
    class: 'text-yellow-500' // Yellow text for warning
  },
  {
    limit: 24.9, // If BMI is below 24.9, categorize as normal
    message: `BMI: ${bmi} <br>CONGRATS!! Normie💪!!`,
    class: 'text-lime-500' // Green text for success
  },
  {
    limit: Infinity, // If BMI is higher than previous limits, categorize as overweight
    message: `BMI: ${bmi} <br>Fatty! Go for a Swim 🏊‍♀️`,
    class: 'text-red-500' // Red text for warning
  }
];

// Use .find() to get the first category where BMI is less than the limit
const { message, class: colorClass } = categories.find(c => bmi < c.limit); 

// Apply the selected class to the results element
results.classList.add(colorClass);

// Display the corresponding message
results.innerHTML = message;
```

## Methods Learned
### `.find()` Method in JavaScript

The `.find()` method is used to search for an element in an array that meets a specified condition. It returns **the first element** that satisfies the provided callback function. If no element matches, it returns `undefined`.

#### **Syntax**:
```javascript
array.find(callback(element, index, array), thisArg);
```
- `callback` - A function that runs for each element in the array.
- `element` - The current element being processed.
- `index` *(optional)* - The index of the current element.
- `array` *(optional)* - The array `.find()` was called upon.
- `thisArg` *(optional)* - A value to use as `this` inside the callback.

#### **Example Usage:**
```javascript
const numbers = [10, 20, 30, 40, 50];
const result = numbers.find(num => num > 25);

console.log(result); // Output: 30 (First element greater than 25)
```

#### **If No Match is Found:**
```javascript
const result2 = numbers.find(num => num > 100);
console.log(result2); // Output: undefined
```

#### **Example with Objects:**
```javascript
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
];

const user = users.find(u => u.id === 2);
console.log(user); // Output: { id: 2, name: 'Bob' }
```

#### **Key Points to Remember:**
- `.find()` only returns **the first** matching element.
- If no element matches, it returns `undefined`.
- Use `.find()` when you need a **single** result. If you need multiple matches, consider `.filter()` instead.
- Works well with objects when searching by properties.

This method is particularly useful for searching in arrays of objects, as seen in the BMI categorization example above.

