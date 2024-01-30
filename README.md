# Generating UI Color Palettes with Nature-Inspired Algorithms

https://github.com/agrawal-rohit/pearl-ui/assets/29514438/0dc04e6a-2d84-4090-85f6-a551eb3632dd

## Introduction

Choosing the right colors for a user interface (UI) can significantly impact the app's look and feel. This project explores a novel approach to generating color palettes using algorithms inspired by nature, such as **Hill Climbing**, **Simulated Annealing**, and **Genetic Algorithms**. These algorithms employ principles from nature to discover optimal color combinations that enhance UI design.

## Objective

The goal is to simplify and automate the process of creating color palettes for UI design through the use of nature-inspired algorithms. By providing a base color, these algorithms can generate a palette that complements it. Importantly, the generated colors adhere to the [Web Content Accessibility Guidelines (WCAG) 2.0](https://www.w3.org/WAI/standards-guidelines/wcag/) color contrast standards, ensuring that the palettes are not only visually appealing but also practical for real-world applications.

The system creates color palettes that start as basic design ideas. These ideas can then be adjusted to meet the specific needs and tastes of a particular project and its audience. The goal is for this system to encourage designers and developers to make digital experiences that look good and are easy to use for everyone.

## Demo

A live demo of the project can be found [here](https://color-palette-generation-using-natural-algorithms-px19u0mpg.vercel.app/).

## Methodology

### Color Palette Definition and Optimization

![Palette Locations](https://github.com/agrawal-rohit/pearl-ui/assets/29514438/68ec05fa-6576-4d61-9320-ebd06baaa1c9)

A color palette in this context is defined as a collection of six distinct types of colors, each with a specific role in the design:

1. **Primary Color (PC)**: Pre-defined by a user, around which the rest of the 5 colors are picked. This can be thought of as the brand color and is applied to buttons (which acts as CTAs).
2. **Accent Color (AC)**: Additional color used to add some variety to the primary color. It can be a different shade of the primary color, or a different color altogether. This color is applied to buttons and other decorative elements.
3. **Background Color (BC)**: Color the background of the design.
4. **Surface Color (SC)**: Color of the background of any subsection in the design.
5. **Button Text Color (BTC)**: Color of the text within a button.
6. **Main Text Color (MTC)**: Color of the main text content that is present in the design.

The user provides the primary color, and the remaining five colors are optimized using nature-inspired algorithms. The optimization process ensures that the generated colors not only harmonize with the primary color but also adhere to the [Web Content Accessibility Guidelines (WCAG) 2.0](https://www.w3.org/WAI/standards-guidelines/wcag/).

### Nature-Inspired Algorithms Used

1. **Hill Climbing and Simulated Annealing**: These are local search meta-heuristic approaches that commence with a randomly initialized solution state. They iteratively explore the solution space by making minor adjustments to the current solution. Hill Climbing consistently moves towards superior solutions, while Simulated Annealing occasionally allows for moves towards inferior solutions. This flexibility helps avoid local optima and potentially uncovers a more optimal solution.

2. **Genetic Algorithms**: This global search meta-heuristic approach emulates the process of natural selection. It initiates with a population of random solutions and iteratively applies operations of selection, crossover, and mutation to evolve the population towards superior solutions. This algorithm is particularly effective at exploring a diverse solution space and generating unique color palettes.

### Evaluation of Color Palette Quality

The cornerstone of our project is the meticulous evaluation of color palette quality, which is grounded in the principles outlined in the [Web Content Accessibility Guidelines (WCAG) 2.0](https://www.w3.org/WAI/standards-guidelines/wcag/). Our approach is to employ a novel objective function that meticulously assesses the contrast ratios between various color pairs within a palette, ensuring not only aesthetic appeal but also adherence to accessibility standards.

#### Design of the Objective Function

At the heart of the color palette generation system is a meticulously crafted objective function. This function is designed to optimize color contrast ratios while adhering to the Web Content Accessibility Guidelines (WCAG) 2.0 standards. It plays a crucial role in ensuring that the color palettes generated are not only visually appealing but also practical for real-world applications, with a particular focus on accessibility and usability.

##### Optimization of Contrast for Key Color Pairs

The objective function is designed to optimize the contrast ratios between several key color pairs within the palette, including:

- **Primary Color (PC)** and **Surface Color (SC)**
- **Accent Color (AC)** and **Surface Color (SC)**
- **Primary Color (PC)** and **Accent Color (AC)**
- **Primary Color (PC)** and **Button Text Color (BTC)**
- **Accent Color (AC)** and **Button Text Color (BTC)**
- **Surface Color (SC)** and **Main Text Color (MTC)**

This optimization process ensures a harmonious and accessible color scheme that enhances the overall user interface design.

##### Compliance with WCAG 2.0

The objective function incorporates the WCAG 2.0 guidelines, which stipulate minimum and enhanced contrast standards for text and background colors. This incorporation ensures that the generated palettes are accessible to a broad spectrum of users, including those with visual impairments. The guidelines are as follows:

- **Minimum Contrast Standards**: A contrast ratio greater than 4.5 for normal-sized text and greater than 3 for large text is required.
- **Enhanced Contrast Standards**: A contrast ratio greater than 7 for normal-sized text and greater than 4.5 for large text is required.

The fitness of a color palette is assessed based on the contrast ratios between the key color pairs. The function employs a discretized approach to contrast evaluation, which allows for a diversity of colors within the palette while ensuring compliance with WCAG standards. For example, the contrast between the Surface Color (SC) and both Primary Color (PC) and Accent Color (AC) is evaluated to ensure sufficient contrast for readability and aesthetic appeal.

The function evaluates the overall fitness of a color palette by considering factors such as background luminance, color variety, and contrast between text and background colors, ensuring a comprehensive assessment of palette quality.

The evaluation process involves several steps:

1. Ensuring the background color is neither too dark nor too bright and maintains color variety.
2. Maximizing contrast between text and their respective backgrounds.
3. Ensuring at least AA level contrast between primary color and surface background, as well as between accent color and surface background.
4. Rewarding color palettes where primary and accent colors are complementary, and penalizing palettes where the background color is unrelated to primary/accent colors.
