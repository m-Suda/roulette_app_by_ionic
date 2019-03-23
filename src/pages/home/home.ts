import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AbstractControl, FormControl, Validators } from "@angular/forms";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    public items: string[] = [];
    public ready: boolean;
    public isStop: boolean;
    public itemName: AbstractControl;
    public selectedItem: string;
    private intervalID: number;

    private readonly PLEASE_ADD_IT = 'Please add it';
    private readonly LETS_START = 'Let\'s Start!';

    constructor(
        public navCtrl: NavController
    ) {
        this.initialized();
    }

    /**
     * 初期化処理
     */
    private initialized() {
        // Itemは無いので追加してね文言
        this.selectedItem = this.PLEASE_ADD_IT;
        // Itemは無いのでルーレットは開始負荷
        this.ready = false;
        // ルーレットは停止状態
        this.isStop = true;
        // Form初期化
        this.itemName = new FormControl('', [ Validators.required ]);
    }

    /**
     * ルーレット開始
     */
    public start() {
        this.toggleStartButton();
        this.intervalID = setInterval(() => {
            this.selectedItem = this.items[ Math.floor(Math.random() * this.items.length) ];
        }, 100);
    }

    /**
     * ルーレット停止
     */
    public stop() {
        this.toggleStartButton();
        clearTimeout(this.intervalID);
    }

    /**
     * Itemを追加する。
     */
    public addItems() {
        this.items.push(this.itemName.value);
        this.setSelectedItemText();
        this.toggleReady();
        this.itemName.reset();
    }

    /**
     * 選択されたItemを削除する。
     * @param i
     */
    public removeItems(i: number) {
        this.items.splice(i, 1);
        this.setSelectedItemText();
        this.toggleReady();
    }

    /**
     * Itemを一括削除する。
     */
    public clearItems() {
        this.items = [];
        this.setSelectedItemText();
        this.toggleReady();
    }

    /**
     * Itemの中身によってルーレット内の文言を切り替える
     */
    private setSelectedItemText() {
        this.selectedItem =
            this.items.length > 0 ?
                this.LETS_START :
                this.PLEASE_ADD_IT
    }

    /**
     * ルーレットを開始できるかを切り替える
     */
    private toggleReady() {
        this.ready = this.items.length > 0;
    }

    /**
     * ルーレット開始ボタンを切り替える
     */
    private toggleStartButton() {
        this.isStop = !this.isStop;
    }
}
