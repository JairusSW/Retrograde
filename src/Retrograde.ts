import { Screen, Renderer } from "./Renderer";
import { Entity } from "./ECS/Entity";

export class Retrograde {
    // Singleton
    static SN: Retrograde;

    public screen: Screen;
    public renderer: Renderer;
    public entities: Entity[] = [];
    constructor(screen: Screen) {
        // Create singleton
        if (Retrograde.SN == null) {
            Retrograde.SN = this;
        }
        this.screen = screen;
        this.renderer = new Renderer(this.screen);
    }
    addEntity(entity: Entity) {
        entity.id = this.entities.length + 1;
        this.entities.push(entity);
    }
    removeEntity(entity: Entity) {
        this.entities.splice(this.entities.findIndex(v => v.id === entity.id), 1);
    }
    renderAll() {
        for (const entity of this.entities) {
            if (entity.visible) {
                entity.render();
            }
        }
    }
}