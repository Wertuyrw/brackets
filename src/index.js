module.exports = function check(str, bracketsConfig) {
  const stack = [];
  const openBrackets = new Set();
  const bracketPairs = new Map();

  // Populate openBrackets and bracketPairs from bracketsConfig
  for (const [open, close] of bracketsConfig) {
    openBrackets.add(open);
    bracketPairs.set(close, open);
  }

  for (const char of str) {
    if (openBrackets.has(char)) {
      // Check if the bracket is the same as its closing counterpart
      if (bracketPairs.has(char) && stack.length > 0 && stack[stack.length - 1] === char) {
        stack.pop(); // Remove the last bracket if it's the same
      } else {
        stack.push(char); // Add the opening bracket to the stack
      }
    } else if (bracketPairs.has(char)) {
      // If it's a closing bracket, check if it matches the last opening bracket
      if (stack.length === 0 || stack[stack.length - 1] !== bracketPairs.get(char)) {
        return false; // Not a match
      }
      stack.pop(); // Remove the matched opening bracket
    }
  }

  return stack.length === 0; // If stack is empty, all brackets matched correctly
}
