import { MyObject3D } from "../webgl/myObject3D";
import { Mesh } from 'three/src/objects/Mesh';
import { Util } from "../libs/util";
import { DoubleSide } from 'three/src/constants';
import { MeshBasicMaterial } from 'three/src/materials/MeshBasicMaterial';
import { BoxGeometry } from 'three/src/geometries/BoxGeometry';
import { Conf } from "../core/conf";
import { Func } from "../core/func";
import { Val } from "../libs/val";
import { Tween } from "../core/tween";
import { HSL } from "../libs/hsl";
import { Vector2 } from 'three/src/math/Vector2';
import { Rect } from "../libs/rect";

export class ItemScroll extends MyObject3D {

  private _mesh:Mesh;
  private _rate:Val = new Val();

  public size:Rect = new Rect();
  public center:Vector2 = new Vector2();

  constructor() {
    super()

    const col = Util.instance.randomArr(Conf.instance.COLOR).clone();
    const hsl = new HSL();
    col.getHSL(hsl);
    hsl.l *= 0.5;
    col.setHSL(hsl.h, hsl.s, hsl.l);

    this._mesh = new Mesh(
      new BoxGeometry(1,1,1),
      new MeshBasicMaterial({
        color: col,
        transparent:true,
        side:DoubleSide,
        depthTest:true,
      })
    );
    this.add(this._mesh);
    this._mesh.position.y = 0.5;

    this._motion({
      delay:Util.instance.random(0, 3)
    });
    this._update();
  }


  private _motion(opt:any = {}):void {
    this.center.x = Util.instance.random(0, 1);
    this.center.y = Util.instance.random(0, 1);

    Tween.instance.a(this._rate, {
      val:[0, 1]
    }, Util.instance.random(1.5, 3), (opt.delay || 0) + Util.instance.random(0, 0.5), Tween.ExpoEaseInOut, null, null, () => {
      this._motion();
    })
  }


  protected _update():void {
    super._update();

    const sh = Func.instance.sh();

    const height = sh * 0.25;
    const rate = this._rate.val;

    this.position.y = Util.instance.mix(sh * 1.5, sh * -0.5, rate);

    this.scale.x = this.scale.z = 1;
    this.scale.y = Util.instance.map(Math.sin(Util.instance.radian(rate * 180)), 0, 1, 0.00001, 1) * height;

    this.visible = (this.position.y > sh * -0);

    this.size.width = this.scale.x;
    this.size.height = height;
  }


  protected _resize(): void {
    super._resize();
  }
}