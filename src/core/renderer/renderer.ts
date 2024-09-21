import { Drawable } from '../drawable.js';

abstract class Renderer {
    abstract flush(): void;
}

export { Renderer };