# HackerEath-CLI
[![npm version](https://badge.fury.io/js/hackerearth-cli.svg)](https://www.npmjs.com/package/hackerearth-cli) [![npm](https://img.shields.io/npm/dt/hackerearth-cli.svg?maxAge=2592000)](https://www.npmjs.com/package/hackerearth-cli) ![awesome](https://img.shields.io/badge/awesome-yes-green.svg)
> CLI for compiling and running code using [HackerEarth API](https://www.hackerearth.com/docs/api/developers/code/legacy/).

## Install

Run the following command

```
$ npm install -g hackerearth-cli
```

## API Key

You can get your HackerEarth API Key by visiting [HackerEath API](https://www.hackerearth.com/api/register/) page.


## Usage

### Commands available

```
$ hackerearth <command>

Commands:
  run      Run code on HackerEarth server
  compile  Compile code on HackerEarth server
  config   Change config file

Options:
  -h, --help  Show help                                      [boolean]

```


#### Command `run`

```
$ hackerearth run <options>

Options:
  -h, --help      Show help                                  [boolean]
  -s, --source    Source Code file path                     [required]
  -i, --input     Input file path                           [required]
  -l, --language  Language. Change `config` for default.
  -o, --output    Output file path                          [required]

Examples:
  hackerearth run -s A.cpp -i Input00.in -o Output.txt -l CPP11

```

#### Command `compile`

```
$ hackerearth compile <options>

Options:
  -h, --help      Show help                                  [boolean]
  -s, --source    Source Code file path                     [required]
  -l, --language  Language. Change `config` for default.

Examples:
  hackerearth compile -s A.cpp -l CPP11

```

#### Command `config`
Run `$ sudo hackerearth config` to change configuration of your installation. This includes default language and API Key.

```
$ sudo hackerearth config [options]

Options:
  -h, --help  Show help                                      [boolean]
  -l, --list  List language and their code                   [boolean]

Examples:
  sudo hackerearth config -l
```

## License

[MIT](https://github.com/ManrajGrover/HackerEarth-CLI/blob/master/LICENSE) © [Manraj Singh](https://github.com/ManrajGrover)
