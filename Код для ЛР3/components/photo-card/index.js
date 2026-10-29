export class PhotoCardComponent {
    constructor(parent) {
        this.parent = parent;
    }


    addListeners(data, openListener, deleteListener) {
        document
            .getElementById(`open-card-${data.id}`)
            .addEventListener("click", openListener)
        document
            .getElementById(`delete-card-${data.id}`)
            .addEventListener("click", deleteListener)
        }

        getHTML(data) {
            return (
                `
                    <div class="card photo-card" style="width: 300px;">
                        <img class="card-img-top" src="${data.src}" alt="${data.title}">
                        <div class="card-body">
                            <h5 class="card-title">${data.title}</h5>
                            <p class="card-text">${data.text}</p>
                            <div class="btn-group w-100" role="group" aria-label="Действия с фото">
                                <button class="btn btn-primary" id="open-card-${data.id}" data-id="${data.id}">Подробнее</button>
                                <button class="btn btn-outline-danger" id="delete-card-${data.id}" data-id="${data.id}">Удалить</button>
                            </div>
                        </div>
                    </div>
                `
            )
        }

        render(data, openListener, deleteListener) {
            const html = this.getHTML(data)
            this.parent.insertAdjacentHTML('beforeend', html)
            this.addListeners(data, openListener, deleteListener)
        }
}
