class Chicken extends MovableObject {

    constructor() {
        super().loadImages('img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/3.Ga_paso izquierdo.png');

        this.x = 200 + Math.random() * 500;
        this.y = 360
        this.height = 80
        this.width = 80
    }


}