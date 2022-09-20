import { MyObject3D } from "../webgl/myObject3D";
import { Util } from "../libs/util";
// import { Conf } from '../core/conf';
import { Item } from "./item";
import { ItemScroll } from './itemScroll';
import { PlaneGeometry } from 'three/src/geometries/PlaneGeometry';
// import { EdgesGeometry } from 'three/src/geometries/EdgesGeometry';
import { LineSegments } from 'three/src/objects/LineSegments';
// import { DoubleSide } from 'three/src/constants';
// import { LineBasicMaterial } from 'three/src/materials/LineBasicMaterial';
// import { MeshBasicMaterial } from 'three/src/materials/MeshBasicMaterial';
import { Func } from '../core/func';
import { Rect } from "../libs/rect";
import { Point } from "../libs/point";
import { Mesh } from 'three/src/objects/Mesh';
// import { Conf } from "../core/conf";


export class ItemWrapper extends MyObject3D {

  private _item:Array<Item> = [];
  private _scrollItem:ItemScroll;
  private _isCircle:boolean;
  private _frame:LineSegments | any;
  private _bg:Mesh | any;
  private _noise:Point = new Point(Util.instance.random(0, 1), Util.instance.random(0, 1));

  public itemSize:Rect = new Rect()

  constructor() {
    super()

    // this._isCircle = (opt.id % 2 == 0);
    this._isCircle = !Util.instance.hit(5);
    this._isCircle = true;

    const geo = new PlaneGeometry(1,1);
    const num = 2
    for(let i = 0; i < num; i++) {
      const item = new Item({
        geo:geo,
        id:i,
        num:num,
        isCircle:this._isCircle,
      });
      this.add(item);
      this._item.push(item);
    }

    // 枠つける
    if(this._isCircle) {
      // this._frame = new LineSegments(
      //   new EdgesGeometry(geo),
      //   new LineBasicMaterial({
      //     // color:Util.instance.randomArr(Conf.instance.COLOR).clone(),
      //     color:0x000000,
      //     transparent:true,
      //   })
      // );
      // this.add(this._frame);

      // const col = Util.instance.randomArr(Conf.instance.COLOR).clone();
      // const hsl = new HSL();
      // col.getHSL(hsl);
      // hsl.l *= 0.15;
      // hsl.s *= 0.15;
      // col.setHSL(hsl.h, hsl.s, hsl.l);

      // this._bg = new Mesh(
      //   geo,
      //   new MeshBasicMaterial({
      //     color:col,
      //     // color:0x000000,
      //     opacity:0.5,
      //     transparent:true,
      //     side:DoubleSide,
      //   })
      // );
      // this.add(this._bg);
    }

    this._scrollItem = new ItemScroll()
    this.add(this._scrollItem);

    this._update();
  }


  protected _update():void {
    super._update();

    const sw = Func.instance.sw()
    const sh = Func.instance.sh()

    let scale = Util.instance.map(this._noise.x, 0, 1, 0.8, 2)
    const itemSize = Math.min(sw, sh) * 0.1;
    const scrollItemSize = this._scrollItem.size.height;

    this._item.forEach((val,i) => {
      const test = this._scrollItem.position.y - Util.instance.map(i, 0, this._item.length - 1, scrollItemSize * 0.25, 0);
      const v = Math.abs(val.position.y - test) * 1;

      let radius;
      if(this._isCircle) {
        // radius = Util.instance.map(i, 0, this._item.length - 1, 0, 1);
        const radian = Math.sin(Util.instance.radian(Util.instance.map(i, 0, this._item.length - 1, 0, 180)));
        radius = Util.instance.map(radian, 0, 1, 1, 1.5) * 3;
        val.setRadius(Util.instance.map(v, 0, scrollItemSize * 0.75, radius, 0));
      } else {
        radius = i == 0 ? 0 : 0.8;
        val.setRadius(Util.instance.map(v, 0, scrollItemSize * 0.75, radius, 0));
      }

      // サイズと位置
      val.setSize(itemSize * scale, itemSize * scale);
      if(this._isCircle) {
        // val.position.y = i * Util.instance.mix(2, itemSize * 0.5, this._noise.x);
        val.position.y = i * 0;
      } else {
        val.position.y = 0;
      }

      // val.position.x = i * 2;
      val.rotation.x = Util.instance.radian(90);

      this.itemSize.width = itemSize;
      this.itemSize.height = itemSize;
    })

    if(this._frame != undefined) {
      this._frame.scale.set(itemSize * scale, itemSize * scale, 1);
      this._frame.rotation.x = Util.instance.radian(90);
      // this._frame.position.y = Util.instance.mix(0, sh * -0.5, this._noise.y);
    }

    scale = 1
    if(this._bg != undefined) {
      this._bg.scale.set(itemSize * scale, itemSize * scale, 1);
      this._bg.rotation.x = Util.instance.radian(90);
      // this._frame.position.y = Util.instance.mix(0, sh * -0.5, this._noise.y);
    }

    // this.rotation.y = Util.instance.radian(20);
  }


  protected _resize(): void {
    super._resize();
  }
}