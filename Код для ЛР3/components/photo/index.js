export class PhotoComponent {
    constructor(parent) {
        this.parent = parent
    }

    addListeners(backListener, deleteListener) {
        document.getElementById("back-button").addEventListener("click", backListener)
        document.getElementById("delete-photo-button").addEventListener("click", deleteListener)
    }

    getHTML(data) {
        const categoryName = data.category === 'nature' ? 'Природа' : 'Животные'
        return (
            `
                <div class="card photo-card mb-3" style="max-width: 800px;">
                    <div class="row g-0">
                        <div class="col-md-7">
                            <img src="${data.src}" class="img-fluid h-100" style="object-fit: cover;" alt="${data.title}">
                        </div>
                        <div class="col-md-5">
                            <div class="card-body">
                                <h4 class="card-title">${data.title}</h4>
                                <p class="card-text">${data.text}</p>
                                <p class="card-text"><b>Категория:</b> ${categoryName}</p>
                                <p class="card-text"><b>Автор:</b> ${data.author}</p>
                                <p class="card-text"><b>Дата:</b> ${data.date}</p>
                                <div class="btn-group" role="group" aria-label="Действия">
                                    <button id="back-button" class="btn btn-primary" type="button">← К списку</button>
                                    <button id="delete-photo-button" class="btn btn-outline-danger" type="button">Удалить</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `
        )
    }

render(data, backListener, deleteListener) {
    const html = this.getHTML(data)
    this.parent.insertAdjacentHTML('beforeend', html)
    this.addListeners(backListener, deleteListener)
}
}
