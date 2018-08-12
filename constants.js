const RUN_URL = 'https://api.hackerearth.com/code/run/';
const COMPILE_URL = 'https://api.hackerearth.com/code/compile/';
const ISSUES_URL = 'https://github.com/manrajgrover/HackerEarth-CLI/issues';
const API_DEV_URL = 'https://www.hackerearth.com/docs/api/developers/code/legacy/';
const GITHUB_URL = 'https://github.com/manrajgrover/HackerEarth-CLI';

const LANGUAGES = {
  'C': 'C (gcc 4.8.1)',
  'CPP': 'C++ (g++ 4.8.1)',
  'CPP11': 'C++ 11',
  'CSHARP': 'C#',
  'CLOJURE': 'Clojure (clojure 1.1.0)',
  'HASKELL': 'Haskell (ghc 7.4.1)',
  'JAVA': 'Java (openjdk 1.7.0_09)',
  'JAVASCRIPT': 'JavaScript',
  'PERL': 'Perl (perl 5.14.2)',
  'RUBY': 'Ruby (ruby 2.1.1)',
  'SCALA': 'Scala (scalac 2.9.1)',
  'PHP': 'PHP (php 5.3.10)'
};

module.exports = {
  RUN_URL,
  COMPILE_URL,
  ISSUES_URL,
  API_DEV_URL,
  GITHUB_URL,
  LANGUAGES
}
