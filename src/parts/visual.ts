import { Func } from '../core/func';
import { Canvas } from '../webgl/canvas';
import { Object3D } from 'three/src/core/Object3D';
import { Update } from '../libs/update';
import { Util } from "../libs/util";
import { Color } from 'three/src/math/Color';
import { Conf } from '../core/conf';
import { HSL } from '../libs/hsl';
import { MousePointer } from '../core/mousePointer';
import { ItemWrapper } from './itemWrapper';

export class Visual extends Canvas {

  private _con:Object3D;
  private _item:Array<ItemWrapper> = [];
  private _bgColor:Color = new Color();

  constructor(opt: any) {
    super(opt);

    this._con = new Object3D();
    this.mainScene.add(this._con);

    const col = Util.instance.randomArr(Conf.instance.COLOR).clone();
    const hsl = new HSL();
    col.getHSL(hsl);
    hsl.s *= 0.5;
    hsl.l *= 1.2;
    col.setHSL(hsl.h, hsl.s, hsl.l);
    this._bgColor = col;

    for(let i = 0; i < 100; i++) {
      const item = new ItemWrapper();
      this._con.add(item);
      this._item.push(item);
    }

    this._con.rotation.x = Util.instance.radian(45);
    this._con.rotation.y = Util.instance.radian(-45);

    this._resize()
  }


  protected _update(): void {
    super._update()

    this._con.position.y = Func.instance.screenOffsetY() * -1

    const s = Util.instance.map(MousePointer.instance.easeNormal.y, -1, 1, 1.5, 0.5);
    this._con.scale.set(s, s, s);

    // this._con.rotation.z = Util.instance.radian(Util.instance.map(MousePointer.instance.easeNormal.y, -1, 1, -40, 40));
    this._con.rotation.y = Util.instance.radian(Util.instance.map(MousePointer.instance.easeNormal.x, -1, 1, -45, 45));

    if (this.isNowRenderFrame()) {
      this._render()
    }
  }


  private _render(): void {
    this.renderer.setClearColor(this._bgColor, 1)
    this.renderer.render(this.mainScene, this.cameraOrth)
  }


  public isNowRenderFrame(): boolean {
    return this.isRender && Update.instance.cnt % 1 == 0
  }


  _resize(isRender: boolean = true): void {
    super._resize();

    const w = Func.instance.sw();
    const h = Func.instance.sh();

    const line = 10;
    const size = this._item[0].itemSize.width;
    const totalSize = size * line;
    this._item.forEach((val,i) => {
      const ix = i % line;
      const iy = ~~(i / line);

      val.position.x = ix * size + size * 0.5 - totalSize * 0.5;
      val.position.z = iy * -size - size * 0.5 + totalSize * 0.5;
    })

    this.renderSize.width = w;
    this.renderSize.height = h;

    this._updateOrthCamera(this.cameraOrth, w, h);
    this._updatePersCamera(this.cameraPers, w, h);

    let pixelRatio: number = window.devicePixelRatio || 1;

    this.renderer.setPixelRatio(pixelRatio);
    this.renderer.setSize(w, h);
    this.renderer.clear();

    if (isRender) {
      this._render();
    }
  }
}
