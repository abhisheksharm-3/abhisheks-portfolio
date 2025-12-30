import { Particle } from "./particle";

/**
 * Spatial hash grid for efficient particle proximity detection.
 * Divides space into cells for O(1) neighbor lookups.
 */
export class SpatialHashGrid {
    cellSize: number;
    grid: Map<string, Particle[]>;

    constructor(cellSize: number) {
        this.cellSize = cellSize;
        this.grid = new Map();
    }

    getKey(x: number, y: number): string {
        return `${Math.floor(x / this.cellSize)},${Math.floor(y / this.cellSize)}`;
    }

    insert(particle: Particle): void {
        const key = this.getKey(particle.x, particle.y);
        if (!this.grid.has(key)) {
            this.grid.set(key, []);
        }
        this.grid.get(key)!.push(particle);
    }

    getNearbyParticles(particle: Particle, radius: number): Particle[] {
        const nearby: Particle[] = [];
        const { x, y } = particle;
        const minGridX = Math.floor((x - radius) / this.cellSize);
        const maxGridX = Math.floor((x + radius) / this.cellSize);
        const minGridY = Math.floor((y - radius) / this.cellSize);
        const maxGridY = Math.floor((y + radius) / this.cellSize);

        for (let gridX = minGridX; gridX <= maxGridX; gridX++) {
            for (let gridY = minGridY; gridY <= maxGridY; gridY++) {
                const cell = this.grid.get(`${gridX},${gridY}`);
                if (cell) nearby.push(...cell);
            }
        }

        return nearby;
    }

    clear(): void {
        this.grid.clear();
    }
}
