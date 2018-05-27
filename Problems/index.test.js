const {
  leapYears,
  matcher,
  splitLines,
  repeatString,
} = require('.');

describe('leapYears', () => {
  test('works with non century years', () => {
    expect(leapYears(1996)).toEqual(true);
  });
  test('works with non century years', () => {
    expect(leapYears(1997)).toEqual(false);
  });
  test('works with ridiculously futuristic non century years', () => {
    expect(leapYears(34992)).toEqual(true);
  });
  test('works with century years', () => {
    expect(leapYears(1900)).toEqual(false);
  });
  test('works with century years', () => {
    expect(leapYears(1600)).toEqual(true);
  });
  test('works with century years', () => {
    expect(leapYears(700)).toEqual(false);
  });
});

describe('matcher', () => {
  test('matcher()', () => {
    expect(matcher(['foo', 'bar'], ['foo'])).toEqual(['foo']);
    expect(matcher(['foo', 'bar'], ['bar'])).toEqual(['bar']);
    expect(matcher(['foo', 'bar'], ['fo*', 'ba*', '!bar'])).toEqual(['foo']);
    expect(matcher(['foo', 'bar', 'moo'], ['!*o'])).toEqual(['bar']);
    expect(matcher(['moo', 'MOO'], ['*oo'], { caseSensitive: true })).toEqual(['moo']);
    expect(matcher(['moo', 'MOO'], ['*oo'], { caseSensitive: false })).toEqual(['moo', 'MOO']);
    expect(() => matcher([], [])).not.toThrow();
  });

  test('matcher.isMatch()', () => {
    expect(matcher.isMatch('unicorn', 'unicorn')).toBe(true);
    expect(matcher.isMatch('MOO', 'MOO')).toBe(true);
    expect(matcher.isMatch('unicorn', 'uni*')).toBe(true);
    expect(matcher.isMatch('UNICORN', 'unicorn', { caseSensitive: false })).toBe(true);
    expect(matcher.isMatch('unicorn', '*corn')).toBe(true);
    expect(matcher.isMatch('unicorn', 'un*rn')).toBe(true);
    expect(matcher.isMatch('foo unicorn bar', '*unicorn*')).toBe(true);
    expect(matcher.isMatch('unicorn', '*')).toBe(true);
    expect(matcher.isMatch('UNICORN', 'UNI*', { caseSensitive: true })).toBe(true);
    expect(matcher.isMatch('UNICORN', 'unicorn', { caseSensitive: true })).toBe(false);
    expect(matcher.isMatch('unicorn', '')).toBe(false);
    expect(matcher.isMatch('unicorn', '!unicorn')).toBe(false);
    expect(matcher.isMatch('unicorn', '!uni*')).toBe(false);
    expect(matcher.isMatch('unicorn', 'uni\\*')).toBe(false);
    expect(matcher.isMatch('unicorn', '!tricorn')).toBe(true);
    expect(matcher.isMatch('unicorn', '!tri*')).toBe(true);
  });
});

describe('splitLines', () => {
  test('split lines', () => {
    expect(splitLines('foo\r\nbar\r\nbaz\nrainbow'))
      .toEqual(['foo', 'bar', 'baz', 'rainbow']);
  });

  test('preserveNewlines option', () => {
    expect(splitLines('foo\r\nbar\r\nbaz\nrainbow', { preserveNewlines: true }))
      .toEqual(['foo\r\n', 'bar\r\n', 'baz\n', 'rainbow']);

    expect(splitLines('\nfoo\r\nbar\r\nbaz\nrainbow', { preserveNewlines: true }))
      .toEqual(['\n', 'foo\r\n', 'bar\r\n', 'baz\n', 'rainbow']);

    expect(splitLines('\nfoo\r\nbar\r\nbaz\nrainbow\n', { preserveNewlines: true }))
      .toEqual(['\n', 'foo\r\n', 'bar\r\n', 'baz\n', 'rainbow\n', '']);
  });
});

describe('repeatString', () => {
  test('error', () => {
    expect(() => repeatString(5, 5))
      .toThrow('Expected `input` to be a `string`, got `number`');
    expect(() => repeatString(-5, 'foo'))
      .toThrow('Expected `count` to be a positive finite number, got `-5`');
  });

  test('repeating', () => {
    expect(repeatString(5)).toBe('     ');
    expect(repeatString(5, '')).toBe('');
    expect(repeatString(5, 'a')).toBe('aaaaa');
    expect(repeatString(3, 'unicorn')).toBe('unicornunicornunicorn');
  });
});

