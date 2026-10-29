import {HeaderComponent} from "../../components/header/index.js";
import {FilterButtonsComponent} from "../../components/filter-buttons/index.js";
import {AddButtonComponent} from "../../components/add-button/index.js";
import {PhotoCardComponent} from "../../components/photo-card/index.js";
import {ProductPage} from "../product/index.js";
import {categories, getPhotos, addPhoto, deletePhoto} from "../../data/photos.js";

let currentFilter = 'all'

export class MainPage {
    constructor(parent) {
        this.parent = parent
}

    get pageRoot() {
        return document.getElementById('main-page')
    }

    get toolbar() {
        return document.getElementById('toolbar')
    }

    getHTML() {
        return (
            `
                <div class="page-content">
                    <div id="toolbar" class="d-flex flex-wrap gap-3 align-items-center mb-4"></div>
                    <div id="main-page" class="d-flex flex-wrap gap-3"></div>
                </div>
            `
        )
    }


    clickCard(e) {
        const photoId = Number(e.currentTarget.dataset.id)
        const productPage = new ProductPage(this.parent, photoId)
        productPage.render()
    }

    clickDelete(e) {
        const photoId = Number(e.currentTarget.dataset.id)
        deletePhoto(photoId)
        this.render()
    }

    clickAdd() {
        addPhoto()
        this.render()
    }      

    changeFilter(value) {
        currentFilter = value
        this.render()
    }

    clickHome() {
        this.render()
    }

    render() {
        this.parent.innerHTML = ''

        const header = new HeaderComponent(this.parent)
        header.render(this.clickHome.bind(this))

        this.parent.insertAdjacentHTML('beforeend', this.getHTML())

        const filter = new FilterButtonsComponent(this.toolbar)
        filter.render(categories, currentFilter, this.changeFilter.bind(this))

        const addButton = new AddButtonComponent(this.toolbar)
        addButton.render(this.clickAdd.bind(this))

        const data = getPhotos(currentFilter)
        if (data.length === 0) {
            this.pageRoot.insertAdjacentHTML('beforeend', '<p class="fw-bold fs-5">В этой категории пока нет фотографий</p>')
        }
        data.forEach((item) => {
        const photoCard = new PhotoCardComponent(this.pageRoot)
        photoCard.render(item, this.clickCard.bind(this), this.clickDelete.bind(this))
        })
    }
}
