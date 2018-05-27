/** Q1 (*)
  Create a function that determines whether or not a given year is a leap year.
  Leap years are determined by the following rules:

  leapYears(2000) // is a leap year: returns true
  leapYears(1985) // is not a leap year: returns false
 */
function leapYears() {}

/** Q2
  Create a function that matches using wildcards.

  matcher(['foo', 'bar', 'moo'], ['*oo', '!foo']);
  //=> ['moo']

  matcher(['foo', 'bar', 'moo'], ['!*oo']);
  //=> ['bar']

  matcher.isMatch('unicorn', 'uni*');
  //=> true

  matcher.isMatch('unicorn', '*corn');
  //=> true

  matcher.isMatch('unicorn', 'un*rn');
  //=> true

  matcher.isMatch('rainbow', '!unicorn');
  //=> true

  matcher.isMatch('foo bar baz', 'foo b* b*');
  //=> true

  matcher.isMatch('unicorn', 'uni\\*');
  //=> false

  matcher.isMatch('UNICORN', 'UNI*', {caseSensitive: true});
  //=> true

  matcher.isMatch('UNICORN', 'unicorn', {caseSensitive: true});
  //=> false
 */
function matcher() {}

/** Q3
 * Create a function to split lines into array of lines.
 * See test suite for more details.
 */
function splitLines() {}

/** Q4
 * Create a function repeat a string without using String repeat method.
 * See test suite for more details.
 */
function repeatString() {}

module.exports = {
  leapYears,
  matcher,
  splitLines,
  repeatString,
};
