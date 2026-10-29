import {HeaderComponent} from "../../components/header/index.js";
import {PhotoComponent} from "../../components/photo/index.js";
import {MainPage} from "../main/index.js";
import {getPhotoById, deletePhoto} from "../../data/photos.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent
        this.id = id
    }

    get pageRoot() {
        return document.getElementById('product-page')
    }

    getHTML() {
        return (
            `
                <div id="product-page" class="page-content"></div>
            `
        )
    }

    clickBack() {
        const mainPage = new MainPage(this.parent)
        mainPage.render()
    }

    clickDelete() {
        deletePhoto(this.id)
        this.clickBack()
    }

    render() {
        this.parent.innerHTML = ''


        const header = new HeaderComponent(this.parent)
        header.render(this.clickBack.bind(this))

        this.parent.insertAdjacentHTML('beforeend', this.getHTML())

        const data = getPhotoById(this.id)
        if (!data) {
            this.pageRoot.insertAdjacentHTML('beforeend', '<p class="fw-bold fs-5">Фото не найдено</p>')
            return
        }

        const photo = new PhotoComponent(this.pageRoot)
        photo.render(data, this.clickBack.bind(this), this.clickDelete.bind(this))
    }
}
