import { Util } from '../libs/util';
import { Color } from 'three/src/math/Color';

export class Conf {
  private static _instance: Conf;

  // パラメータ
  public FLG_PARAM: boolean = location.href.includes('p=yes');
  public FLG_SHOW_MATTERJS: boolean = false;

  // Stats
  public FLG_STATS: boolean = false;

  // パス
  public PATH_IMG: string = './assets/img/';

  // タッチデバイス
  public USE_TOUCH: boolean = Util.instance.isTouchDevice();

  // ブレイクポイント
  public BREAKPOINT: number = 768;

  // PSDサイズ
  public LG_PSD_WIDTH: number = 1600;
  public XS_PSD_WIDTH: number = 750;

  // 簡易版
  public IS_SIMPLE: boolean = Util.instance.isPc() && Util.instance.isSafari();

  // スマホ
  public IS_PC: boolean = Util.instance.isPc();
  public IS_SP: boolean = Util.instance.isSp();
  public IS_AND: boolean = Util.instance.isAod();
  public IS_TAB: boolean = Util.instance.isIPad();
  public USE_ROLLOVER:boolean = Util.instance.isPc() && !Util.instance.isIPad()

  public ITEM_NUM:number = 10;

  // 青系
  // public COLOR:Array<Color> = [
  //   new Color(0x419acf),
  //   new Color(0xa0d7e9),
  //   new Color(0x006991),
  //   new Color(0xcde8e9),
  //   new Color(0xc0d1da),
  //   new Color(0xe5f0fa),
  //   new Color(0x2c4098),
  //   new Color(0xa5a7c6),
  // ]
  // public COLOR:Array<Color> = [
  //   new Color(0xaeafaf),
  //   new Color(0x2995a1),
  //   new Color(0xfbfaf7),
  //   new Color(0x000012),
  //   new Color(0x584d4d),
  //   new Color(0x7a7b7c),
  //   new Color(0x515f7d),
  //   new Color(0xc9c59d),
  // ]
  public COLOR:Array<Color> = [
    new Color(0xe6e9ef),
    new Color(0xe0e1e4),
    new Color(0xeeeae5),
    new Color(0x938b95),
    new Color(0x584f45),
    new Color(0x404046),
    new Color(0x3d4d4c),
    new Color(0x060000),
  ]

  constructor() {}
  public static get instance(): Conf {
    if (!this._instance) {
      this._instance = new Conf();
    }
    return this._instance;
  }
}
