class Chicken extends MovableObject {

    constructor() {
        super().loadImages('img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/3.Ga_paso izquierdo.png');

        this.x = 100 + Math.random() * 200;
        this.y = 100
        this.height = 40
        this.width = 40
    }


}