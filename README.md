<div align="center">
  
## Color Cruncher

[Installation](#installation) • [Demo](https://github.com/agrawal-rohit/pearl-ui/assets/29514438/0dc04e6a-2d84-4090-85f6-a551eb3632dd) • [Algorithms](#algorithms) • [Contributing](#contributing) • [License](#license)

</div>

<br />

Color Cruncher is a small experiment that asks:  
what if we let nature-inspired algorithms pick our UI color palettes?

You give it a base color → it crunches numbers, mutates a few generations, and spits out a palette that’s actually usable and passes accessibility checks.  
No more “does this shade of blue look good with off-white #fefefe?” debates.

## Introduction

Choosing colors for an interface is weirdly hard. Designers think in vibes, developers think in hex codes, and accessibility standards hover over everyone’s shoulders.

This project tries to bridge that gap. Instead of eyeballing palettes, **algorithms explore the search space for you**. The result is a palette that’s not only aesthetic but also WCAG-compliant.

- Start with a single **primary color**
- Generate five supporting colors (accent, background, surface, button text, main text)
- All palettes checked against [WCAG 2.0](https://www.w3.org/WAI/standards-guidelines/wcag/) for contrast ratios
- Uses **Hill Climbing**, **Simulated Annealing**, and **Genetic Algorithms** under the hood

## Algorithms

The fun part. Instead of a fixed formula, palettes are discovered through optimization techniques that mimic natural processes:

- **Hill Climbing** – keep tweaking until it stops getting better
- **Simulated Annealing** – sometimes accept worse choices to avoid local minima
- **Genetic Algorithm** – evolve a population of palettes with crossover + mutation

At the center is an **objective function** that scores palettes based on:

- Contrast between text and background
- Harmony between primary and accent colors
- WCAG AA+ compliance

Basically: if a palette looks nice but fails accessibility, it gets thrown out.

## Installation

Clone the repo and install dependencies:

```bash
git clone https://github.com/agrawal-rohit/color-cruncher
cd color-cruncher
npm install
npm run start
```

## Contributing

Contributions are welcome. Please read the [contributing guide](CONTRIBUTING.md) for more information.

## License

[MIT License](LICENSE).
