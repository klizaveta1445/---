export class FilterButtonsComponent {
    constructor(parent) {
        this.parent = parent;
}

    addListeners(listener) {
        document
            .querySelectorAll('input[name="photo-filter"]')
            .forEach((input) => {
                input.addEventListener("change", (e) => listener(e.target.value))
            })
    }

    getHTML(categories, active) {
        const buttons = categories.map((category) => (
            `
                <input type="radio" class="btn-check" name="photo-filter"
                    id="filter-${category.value}" value="${category.value}"
                    autocomplete="off" ${category.value === active ? 'checked' : ''}>
                <label class="btn btn-outline-primary" for="filter-${category.value}">${category.label}</label>
            `
        )).join('')

        return (
            `
                <div class="btn-group" role="group" aria-label="Фильтр фотографий">
                    ${buttons}
                </div>
            `
        )
    }

    render(categories, active, listener) {
        const html = this.getHTML(categories, active)
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(listener)
    }
}
