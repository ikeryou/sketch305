import vt from '../glsl/base.vert';
import fg from '../glsl/item.frag';
import { MyObject3D } from "../webgl/myObject3D";
import { Mesh } from 'three/src/objects/Mesh';
import { Util } from "../libs/util";
import { DoubleSide } from 'three/src/constants';
import { ShaderMaterial } from 'three/src/materials/ShaderMaterial';
import { Color } from 'three/src/math/Color';
import { Vector2 } from 'three/src/math/Vector2';
import { Conf } from '../core/conf';


export class Item extends MyObject3D {

  private _mesh:Mesh;
  private _r:number = 0;
  private _r2:number = 0;
  private _col:Color;
  private _speed:number = Util.instance.random2(1, 2);

  constructor(opt:any = {}) {
    super()

    this._col = Util.instance.randomArr(Conf.instance.COLOR).clone();

    if(opt.isCircle) {
      // if(opt.id == opt.num - 1) this._col = new Color(0x000000);
    } else {
      this._col = new Color(0x000000);
    }


    this._mesh = new Mesh(
      opt.geo,
      new ShaderMaterial({
        vertexShader:vt,
        fragmentShader:fg,
        transparent:true,
        side:DoubleSide,
        uniforms:{
          color:{value:this._col},
          color2:{value:Util.instance.randomArr(Conf.instance.COLOR).clone()},
          rate:{value:0.2},
          rate2:{value:0.2},
          time:{value:opt.id * 15},
          circle:{value:opt.isCircle ? 1 : 0},
          center:{value:new Vector2(0.5, 0.5)},
        }
      })
    );
    this.add(this._mesh);
  }


  public getColor():Color {
    return this._col;
  }


  public setSize(w:number, h:number):void {
    this.scale.set(w, h, 1);
  }


  public setRadius(r:number):void {
    this._r += (r - this._r) * 0.1;
    this._r2 += (r - this._r2) * 0.15;
    this._getUni(this._mesh).rate.value = this._r;
    this._getUni(this._mesh).rate2.value = this._r2;
  }


  public setCenter(c:Vector2):void {
    const uni = this._getUni(this._mesh);
    uni.center.value = c;
  }


  protected _update():void {
    super._update();

    const uni = this._getUni(this._mesh);
    uni.time.value += this._speed * 0.5;
  }


  protected _resize(): void {
    super._resize();
  }
}