# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a vanilla JavaScript self-driving car simulation that runs in the browser without any external libraries or frameworks. The project implements a 2D car physics engine with basic sensors for autonomous driving simulation.

## Running the Project

Since this is a client-side JavaScript project, simply open `index.html` in a web browser to run the simulation. No build process, package manager, or server is required.

## Architecture

The project follows a modular class-based architecture with the following core components:

### Core Classes

- **Car (`car.js`)**: Main vehicle class handling physics, movement, and rendering
  - Physics: acceleration, friction, speed limits, steering
  - Integrates with Sensor and Controls
  - Uses private `#move()` method for movement logic

- **Sensor (`sensor.js`)**: Collision detection system for the car
  - Creates multiple rays (default: 3) extending from the car
  - Ray casting with configurable spread and length
  - Currently visual-only (yellow rays), collision detection not yet implemented

- **Road (`road.js`)**: Defines the driving environment
  - Multi-lane road system (default: 3 lanes)
  - Border boundaries and lane markings
  - `getLaneCenter()` method for positioning cars in lanes

- **Controls (`controls.js`)**: Keyboard input handling
  - Arrow key bindings for car movement
  - Event-driven input system with key press/release detection

### Utilities (`utils.js`)

- `lerp()`: Linear interpolation function used throughout for smooth transitions
- `getIntersection()`: Line intersection algorithm for collision detection (prepared for future sensor collision implementation)

### Main Loop (`main.js`)

- Canvas setup and animation loop
- Camera system that follows the car with `ctx.translate()`
- Orchestrates updates and rendering for all components

## Development Notes

- All JavaScript files are ES6 classes using modern syntax
- The sensor system is partially implemented - rays are drawn but collision detection with road borders is not yet connected
- The project uses HTML5 Canvas for all rendering
- Coordinate system: Y increases downward, car moves "up" the screen (negative Y direction)
- Animation uses `requestAnimationFrame()` for smooth 60fps rendering

## Current State

The simulation currently supports:
- Basic car physics and controls
- Multi-lane road rendering 
- Visual sensor rays
- Smooth camera following

Missing implementations:
- Sensor collision detection with road borders
- AI/neural network integration for autonomous driving
- Traffic or obstacles
- Multiple cars/traffic simulation